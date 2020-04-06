require('dotenv').config();

const config = {
  port: process.env.SERVER_PORT || 3000,
  host: process.env.SERVER_HOST || 'localhost',
  firebaseType: process.env.FIREBASE_TYPE,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebasePrivateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  firebaseClientId: process.env.FIREBASE_CLIENT_ID,
  firebaseAuthUri: process.env.FIREBASE_AUTH_URI,
  firebaseTokenUri: process.env.FIREBASE_TOKEN_URI,
  firebaseAuthProvider: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  firebaseClient: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  firebaseDbUrl: process.env.FIREBASE_DB_URL,
  appEnv: process.env.APP_ENV || 'dev',
};

module.exports = { config };
