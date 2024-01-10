const bcrpytjs = require('bcryptjs');
const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
    const { username, password } = req.headers;
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
        return res.status(401).json({
            message: `Invalid Credential`
        });
    }

    // If user is valid then check for password
    const isValidPassword = await bcrpytjs.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({
            message: `Invalid Credential`
        })
    }
    next();
}

module.exports = userMiddleware;