const jwt = require('jsonwebtoken');
const zod = require('zod');
const jwtPassword = "secret";

// zod schema
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
    const validateEmail = emailSchema.safeParse(username);
    const validatePassword = passwordSchema.safeParse(password);

    if (!validateEmail.success || !validatePassword.success) {
        return null;
    }

    const user = { username: username };
    const token = jwt.sign(user, jwtPassword);
    return token;
}

function verifyJwt(token) {
    if (!decodeJwt(token)) return false;
    try {
        jwt.verify(token, jwtPassword);
        return true;
    }
    catch (err) {
        return false;
    }
}

function decodeJwt(token) {
    const decodeToken = jwt.decode(token);
    return decodeToken !== null;
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword
}