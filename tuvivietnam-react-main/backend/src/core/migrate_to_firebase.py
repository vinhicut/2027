import sqlite3
import json
import os
import sys

from core.config import DB_PATH
import core.firebase_db as firebase_db

def migrate():
    print("Starting migration from SQLite to Firebase...")
    
    if not firebase_db.init_firebase():
        print("Firebase is not initialized. Check your credentials.")
        sys.exit(1)

    if not os.path.exists(DB_PATH):
        print(f"SQLite DB not found at {DB_PATH}.")
        sys.exit(1)

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    # Migrate Users
    print("Migrating users...")
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    
    for u in users:
        print(f"  Upserting user: {u['email']}")
        firebase_db.upsert_user(
            google_id=u['google_id'],
            email=u['email'],
            name=u['name'],
            avatar=u['avatar'],
            role=u['role']
        )
        # Update user doc to retain old id mapping maybe? Or rely on Google ID.

    # Migrate Charts
    print("Migrating charts...")
    cur.execute("SELECT * FROM user_charts")
    charts = cur.fetchall()

    for c in charts:
        print(f"  Saving chart: {c['chart_code']} for user_id: {c['user_id']}")
        
        # We need the user document ID in Firebase. 
        # Since SQLite user_id is just integer, let's find the firebase user id by joining in python
        # We can find the google_id from sqlite users
        cur.execute("SELECT google_id FROM users WHERE id = ?", (c['user_id'],))
        u_row = cur.fetchone()
        if not u_row:
            continue
            
        g_id = u_row['google_id']
        
        # Find user doc id in firebase
        query = firebase_db.db.collection('users').where('google_id', '==', g_id).limit(1).get()
        if not query:
            continue
            
        firebase_user_id = query[0].id
        
        firebase_db.save_user_chart(
            user_id=firebase_user_id,
            chart_code=c['chart_code'],
            ho_ten=c['ho_ten'],
            gioi_tinh=c['gioi_tinh'],
            ngay_sinh=c['ngay_sinh'],
            thang_sinh=c['thang_sinh'],
            nam_sinh=c['nam_sinh'],
            gio_sinh=c['gio_sinh'],
            phut_sinh=c['phut_sinh'],
            loai_lich=c['loai_lich'],
            thang_nhuan=c['thang_nhuan'],
            nam_xem_han=c['nam_xem_han'],
            input_data=json.loads(c['input_data']),
            chart_data=json.loads(c['chart_data'])
        )

    print("Migration completed successfully.")
    conn.close()

if __name__ == "__main__":
    migrate()
