// Auth Middleware (auth.js)
const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    // const token =
    //     req.body.token || req.query.token || req.headers["authorization"];

    let token = ''

    // Mengecek token dalam header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
};

module.exports = verifyToken;
