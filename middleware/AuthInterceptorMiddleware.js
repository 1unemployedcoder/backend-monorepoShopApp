const jwt = require('jsonwebtoken');

const authInterceptorMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.id;

        req.userId = userId;

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Ошибка аутентификации' });
    }
};

module.exports = authInterceptorMiddleware;
