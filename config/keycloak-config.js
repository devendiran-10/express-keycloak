var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    realm: 'Mistnet',
    'auth-server-url': 'http://localhost:8080/auth/',
    'ssl-required': 'external',
    resource: 'mistnet-ui',
    'public-client': true,
    'confidential-port': 0,
    realmPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0M9Bm2FOS2cclyX0UW0Wo1We8Qg80Il3TScEZRtX1PLy7OgrRpTFkhNXa/C0y/gVBUGzYjIX+fNOJVaZta5VmI6P+E3vILqfZbhKK1VTwgAUgTzef2qFPtUXJCM7xgQUxkny52Uf0kmU4GgDzyGWA/iNJEouaA4FHv7c69ogHvF8/e7/gM3wrpxhSjAfUeygd5rib1Rke3S9S2y8Thpx6H4DTdp3P4MCMrpNiUDANssmcIOSrUApgYwHA0VG2BXF9Wn2Xo2+DpRiLcXgx149FEpH3VeaRRVNeA1bQ7natI3mdIVKR09YZP96iQW/Q4LhxRjwZGWf68eepkR0tOSY1wIDAQAB',
    'bearer-only': true,
    'enable-cors': true,
};


function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};
