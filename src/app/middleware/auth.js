const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'You must send a token on header.' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decode = await promisify(jwt.verify)(token, process.env.APP_SECRET);

        req.userId = decode.id;

        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalid.' });
    }
}