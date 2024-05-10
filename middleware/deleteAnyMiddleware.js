const jwt = require('jsonwebtoken');

const deleteAnyMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(401).json({message: 'Not auth'})
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if (decodedToken.role === 'ADMIN') {
            req.role = 'ADMIN'
        }
        const userId = decodedToken.id;
        req.userId = userId;

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Ошибка аутентификации' });
    }
};

module.exports = deleteAnyMiddleWare;
