/**
 * DPoP (Demonstrating Proof-of-Possession) Client Module
 * Handles generating, storing, and retrieving the asymmetric key pair using WebCrypto and IndexedDB.
 * Provides functionality to generate DPoP Proof JWTs for authenticated API requests.
 */

const DPOP_DB_NAME = 'dpop_db';
const DPOP_STORE_NAME = 'dpop_keys';
const KEY_ID = 'dpop_key_pair';

/**
 * Utility: Convert ArrayBuffer to Base64Url string
 * @param {ArrayBuffer} buffer 
 * @returns {string} Base64Url string
 */
function bufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

/**
 * Utility: Convert string to ArrayBuffer
 * @param {string} str 
 * @returns {Uint8Array}
 */
function stringToBuffer(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

let dbPromise = null;

/**
 * Opens and initializes the IndexedDB for storing DPoP keys
 * @returns {Promise<IDBDatabase>}
 */
function openDB() {
    if (!dbPromise) {
        dbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(DPOP_DB_NAME, 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(DPOP_STORE_NAME)) {
                    db.createObjectStore(DPOP_STORE_NAME);
                }
            };
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            request.onerror = (event) => {
                dbPromise = null;
                reject(event.target.error);
            };
        });
    }
    return dbPromise;
}

/**
 * Stores the generated key pair in IndexedDB
 * @param {CryptoKeyPair} keyPair 
 * @returns {Promise<void>}
 */
async function storeKeyPair(keyPair) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([DPOP_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(DPOP_STORE_NAME);
        const request = store.put(keyPair, KEY_ID);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e.target.error);
    });
}

/**
 * Retrieves the stored key pair from IndexedDB
 * @returns {Promise<CryptoKeyPair|null>}
 */
async function getKeyPair() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([DPOP_STORE_NAME], 'readonly');
        const store = transaction.objectStore(DPOP_STORE_NAME);
        const request = store.get(KEY_ID);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = (e) => reject(e.target.error);
    });
}

/**
 * Generates a new ECDSA P-256 key pair.
 * The private key is non-extractable to prevent theft.
 * @returns {Promise<CryptoKeyPair>}
 */
async function generateKeyPair() {
    return await window.crypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve: "P-256",
        },
        false, // Ensures private key extractable is false
        ["sign", "verify"]
    );
}

let initPromise = null;

/**
 * Initializes the DPoP module.
 * Fetches the existing key pair or generates a new one if it doesn't exist.
 * @returns {Promise<CryptoKeyPair>}
 */
export function initDPoP() {
    if (!initPromise) {
        initPromise = (async () => {
            try {
                let keyPair = await getKeyPair();
                if (!keyPair) {
                    keyPair = await generateKeyPair();
                    await storeKeyPair(keyPair);
                }
                return keyPair;
            } catch (e) {
                initPromise = null;
                throw e;
            }
        })();
    }
    return initPromise;
}

/**
 * Generates a DPoP Proof JWT for an API request.
 * @param {string} htm - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} htu - The HTTP URL (without query parameters).
 * @returns {Promise<string>} The signed DPoP JWT Proof.
 */
export async function generateDPoPProof(htm, htu) {
    const keyPair = await initDPoP();
    
    // Ensure htu has no query parameters or hash fragments
    let cleanHtu = htu;
    try {
        const url = new URL(htu);
        url.search = '';
        url.hash = '';
        cleanHtu = url.toString();
    } catch (_e) {
        // Not a valid absolute URL, assume it is already clean or a relative path
    }
    
    // Export the public key to JWK format for the DPoP header
    const jwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
    
    // Remove properties not strictly required for DPoP JWK
    delete jwk.ext;
    delete jwk.key_ops;
    delete jwk.alg;

    const header = {
        typ: "dpop+jwt",
        alg: "ES256",
        jwk: jwk
    };
    
    const payload = {
        jti: window.crypto.randomUUID ? window.crypto.randomUUID() : crypto.randomUUID(), // Unique token identifier, fallback for some environments
        htm: htm.toUpperCase(), // HTTP Method
        htu: cleanHtu, // HTTP URL
        iat: Math.floor(Date.now() / 1000) // Issued at timestamp
    };
    
    const headerStr = JSON.stringify(header);
    const payloadStr = JSON.stringify(payload);
    
    const headerB64 = bufferToBase64Url(stringToBuffer(headerStr));
    const payloadB64 = bufferToBase64Url(stringToBuffer(payloadStr));
    
    const dataToSign = `${headerB64}.${payloadB64}`;
    
    // Sign the header and payload with the private key
    const signatureBuffer = await window.crypto.subtle.sign(
        {
            name: "ECDSA",
            hash: { name: "SHA-256" },
        },
        keyPair.privateKey,
        stringToBuffer(dataToSign)
    );
    
    const signatureB64 = bufferToBase64Url(signatureBuffer);
    
    // Construct the final JWT
    return `${dataToSign}.${signatureB64}`;
}
