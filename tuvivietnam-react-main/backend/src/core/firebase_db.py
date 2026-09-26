import os
import json
import datetime
from typing import Optional, Dict, Any, List
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from core.config import FIREBASE_PROJECT_ID, FIREBASE_CREDENTIALS_PATH

# Global Firestore client
db = None

def init_firebase() -> bool:
    global db
    if db is not None:
        return True
    
    try:
        if os.path.exists(FIREBASE_CREDENTIALS_PATH):
            cred = credentials.Certificate(FIREBASE_CREDENTIALS_PATH)
            firebase_admin.initialize_app(cred, {
                'projectId': FIREBASE_PROJECT_ID
            })
            db = firestore.client()
            # Test connection
            try:
                db.collection('users').limit(1).get()
            except Exception as e:
                print(f"[Firebase] Connected but Firestore is disabled or errored: {e}. Falling back to SQLite.")
                db = None
                return False
            print(f"[Firebase] Successfully initialized with {FIREBASE_CREDENTIALS_PATH}")
            return True
        else:
            print(f"[Firebase] Credentials file not found at {FIREBASE_CREDENTIALS_PATH}. Falling back to SQLite.")
            return False
    except Exception as e:
        print(f"[Firebase] Initialization error: {e}. Falling back to SQLite.")
        return False

# ----------------- User Queries -----------------

def upsert_user(google_id: str, email: str, name: str, avatar: Optional[str], role: str = 'user') -> Dict[str, Any]:
    now_str = datetime.datetime.now(datetime.timezone.utc).isoformat()
    users_ref = db.collection('users')
    
    # Check if user exists by google_id
    query = users_ref.where(filter=firestore.FieldFilter('google_id', '==', google_id)).limit(1).get()
    
    if query:
        doc = query[0]
        user_data = doc.to_dict()
        user_id = doc.id
        final_role = user_data.get('role', 'user')
        if final_role == 'manager':
            pass # Keep manager role
        else:
            final_role = role
            
        update_data = {
            'email': email,
            'name': name,
            'avatar': avatar,
            'role': final_role,
            'last_login_at': now_str
        }
        users_ref.document(user_id).update(update_data)
        user_data.update(update_data)
        user_data['id'] = user_id
        return user_data
    else:
        # Create new user
        new_user = {
            'google_id': google_id,
            'email': email,
            'name': name,
            'avatar': avatar,
            'role': role,
            'created_at': now_str,
            'last_login_at': now_str
        }
        doc_ref = users_ref.document() # Auto ID
        doc_ref.set(new_user)
        new_user['id'] = doc_ref.id
        return new_user

def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    doc = db.collection('users').document(user_id).get()
    if doc.exists:
        data = doc.to_dict()
        data['id'] = doc.id
        return data
    return None

# ----------------- Session Queries -----------------

def create_session(user_id: str, token: str, days: int = 30) -> Dict[str, Any]:
    now = datetime.datetime.now(datetime.timezone.utc)
    now_str = now.isoformat()
    exp_str = (now + datetime.timedelta(days=days)).isoformat()

    session_data = {
        'user_id': user_id,
        'token': token,
        'expires_at': exp_str,
        'created_at': now_str
    }
    db.collection('sessions').document(token).set(session_data)
    return session_data

def get_user_by_token(token: str) -> Optional[Dict[str, Any]]:
    now_str = datetime.datetime.now(datetime.timezone.utc).isoformat()
    
    doc = db.collection('sessions').document(token).get()
    if doc.exists:
        session_data = doc.to_dict()
        if session_data.get('expires_at') > now_str:
            user_id = session_data.get('user_id')
            user_doc = db.collection('users').document(str(user_id)).get()
            if user_doc.exists:
                user_data = user_doc.to_dict()
                user_data['id'] = user_doc.id
                return user_data
    return None

def delete_session(token: str) -> bool:
    doc_ref = db.collection('sessions').document(token)
    if doc_ref.get().exists:
        doc_ref.delete()
        return True
    return False

# ----------------- Chart Queries -----------------

def save_user_chart(
    user_id: str,
    chart_code: str,
    ho_ten: str,
    gioi_tinh: str,
    ngay_sinh: int,
    thang_sinh: int,
    nam_sinh: int,
    gio_sinh: int,
    phut_sinh: int,
    loai_lich: str,
    thang_nhuan: int,
    nam_xem_han: int,
    input_data: Any,
    chart_data: Any
) -> Dict[str, Any]:
    now_str = datetime.datetime.now(datetime.timezone.utc).isoformat()
    
    # We might need the user email to save directly for easier viewing
    user_doc = db.collection('users').document(str(user_id)).get()
    user_email = ""
    if user_doc.exists:
        user_email = user_doc.to_dict().get('email', '')

    chart_doc = {
        'user_id': str(user_id),
        'user_email': user_email,
        'chart_code': chart_code,
        'ho_ten': ho_ten,
        'gioi_tinh': gioi_tinh,
        'ngay_sinh': ngay_sinh,
        'thang_sinh': thang_sinh,
        'nam_sinh': nam_sinh,
        'gio_sinh': gio_sinh,
        'phut_sinh': phut_sinh,
        'loai_lich': loai_lich,
        'thang_nhuan': thang_nhuan,
        'nam_xem_han': nam_xem_han,
        'input_data': input_data if isinstance(input_data, dict) else json.loads(input_data),
        'chart_data': chart_data if isinstance(chart_data, dict) else json.loads(chart_data),
        'created_at': now_str,
        'updated_at': now_str
    }
    
    # Try to find existing chart by chart_code
    charts_ref = db.collection('user_charts')
    query = charts_ref.where(filter=firestore.FieldFilter('chart_code', '==', chart_code)).limit(1).get()
    
    if query:
        doc_id = query[0].id
        chart_doc.pop('created_at', None) # Don't update created_at
        charts_ref.document(doc_id).update(chart_doc)
        chart_id = doc_id
    else:
        # Try to find by user_id to just overwrite latest, or just create new
        doc_ref = charts_ref.document()
        doc_ref.set(chart_doc)
        chart_id = doc_ref.id

    return {
        "id": chart_id,
        "chart_code": chart_code,
        "ho_ten": ho_ten,
        "updated_at": now_str
    }

def get_latest_user_chart(user_id: str) -> Optional[Dict[str, Any]]:
    charts_ref = db.collection('user_charts')
    query = (charts_ref
             .where(filter=firestore.FieldFilter('user_id', '==', str(user_id)))
             .order_by('updated_at', direction=firestore.Query.DESCENDING)
             .limit(1)
             .get())
    
    if query:
        doc = query[0]
        data = doc.to_dict()
        data['id'] = doc.id
        return data
    return None

def get_user_charts_list(user_id: str, limit: int = 20, offset: int = 0) -> List[Dict[str, Any]]:
    charts_ref = db.collection('user_charts')
    query = (charts_ref
             .where(filter=firestore.FieldFilter('user_id', '==', str(user_id)))
             .order_by('updated_at', direction=firestore.Query.DESCENDING)
             .limit(limit)
             .offset(offset)
             .get())
             
    results = []
    for doc in query:
        data = doc.to_dict()
        data['id'] = doc.id
        # Remove massive payload for list view
        data.pop('input_data', None)
        data.pop('chart_data', None)
        results.append(data)
    return results

# ----------------- Admin Queries -----------------
# Implementations for admin queries if needed, kept simple for now

def admin_get_users(limit: int = 50, offset: int = 0) -> List[Dict[str, Any]]:
    query = db.collection('users').order_by('created_at', direction=firestore.Query.DESCENDING).limit(limit).offset(offset).get()
    results = []
    for doc in query:
        data = doc.to_dict()
        data['id'] = doc.id
        results.append(data)
    return results

def admin_get_charts(limit: int = 50, offset: int = 0, search: Optional[str] = None) -> List[Dict[str, Any]]:
    query = db.collection('user_charts').order_by('updated_at', direction=firestore.Query.DESCENDING).limit(limit).offset(offset).get()
    results = []
    for doc in query:
        data = doc.to_dict()
        data['id'] = doc.id
        data.pop('input_data', None)
        data.pop('chart_data', None)
        results.append(data)
    return results

def admin_get_stats() -> Dict[str, Any]:
    # Firestore doesn't have COUNT() easily without scanning or using aggregation queries.
    # Using simple approach (might be slow for large datasets, but okay for this scope)
    users_count = db.collection('users').count().get()[0][0].value
    managers_count = db.collection('users').where(filter=firestore.FieldFilter('role', '==', 'manager')).count().get()[0][0].value
    charts_count = db.collection('user_charts').count().get()[0][0].value
    sessions_count = db.collection('sessions').count().get()[0][0].value
    
    return {
        "total_users": users_count,
        "total_managers": managers_count,
        "total_charts": charts_count,
        "active_sessions": sessions_count
    }
