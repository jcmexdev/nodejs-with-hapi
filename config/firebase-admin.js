const { config } = require('./index');

module.exports = {
  type: config.firebaseType,
  project_id: config.firebaseProjectId,
  private_key_id: config.firebasePrivateKeyId,
  private_key: config.firebasePrivateKey,
  client_email: config.firebaseClientEmail,
  client_id: config.firebaseClientId,
  auth_uri: config.firebaseAuthUri,
  token_uri: config.firebaseTokenUri,
  auth_provider_x509_cert_url: config.firebaseAuthProvider,
  client_x509_cert_url: config.firebaseClient,
};
