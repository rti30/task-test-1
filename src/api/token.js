//const LOCAL_TOKEN = 'myTestToken';

function getUserId(token) {
    return getJWTPayload(token);
}

function setToken(token, localName) {
    //let accessData = getJWTPayload(token);
    localStorage.setItem(localName, token);
    //  accessData.userName
}

function cleanTokensData(localName) {
    localStorage.removeItem(localName);
}

function getToken(localName) {
    return localStorage.getItem(localName);
}

function getJWTPayload(token) {
    return parseJWT(token).payload;
}

function parseJWT(token) {
    let parts = token.split('.');

    return {
        header: parsePart(parts[0]),
        payload: parsePart(parts[1]),
        sign: parts[2]
    };
}

function parsePart(str) {
    return JSON.parse(atob(str));
}

export { setToken, cleanTokensData, getJWTPayload, getToken, getUserId }