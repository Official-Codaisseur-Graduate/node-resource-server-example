// Export the configuration module

// NOTE: This application needs the following environment variables CLIENT_ID, AUTHORITY_URL and BASE_URL.
module.exports = {
    name: 'resource-provider-api',
    port: process.env.PORT || 4000,
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV,
    url: (process.env.NODE_ENV === 'production' ? process.env.HOST : `localhost:${process.env.PORT || 5000}`),
    clientId: process.env.CLIENT_ID || "resource-api1",
    authorityUrl: process.env.ISSUER_BASE_URL || "http://localhost:5000",
    baseUrl: process.env.BASE_URL || "http://localhost:4000",
}