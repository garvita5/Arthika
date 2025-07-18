const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length > 0) {
      return admin.apps[0];
    }

    // Check if required env vars are present
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
      throw new Error('Missing Firebase environment variables');
    }

    const serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
    };

    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    console.log('Firebase Admin SDK initialized successfully via ENV vars');
    return app;

  } catch (error) {
    console.error('Firebase initialization failed:', error.message);
    console.log('Using mock database for development...');
    return null;
  }
};

// Get Firestore instance
const getFirestore = () => {
  const app = initializeFirebase();
  return app ? app.firestore() : null;
};

// Mock database for development fallback
const mockDatabase = {
  users: new Map(),
  queries: new Map(),
  roadmaps: new Map(),
  feedback: new Map()
};

module.exports = {
  initializeFirebase,
  getFirestore,
  mockDatabase
};
