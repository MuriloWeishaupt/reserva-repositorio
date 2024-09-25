import jwt from 'jsonwebtoken'

const autenticaJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.sendStatus(403)
    }

    jwt.verify(token, 'segredo', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user
        next(); //já pode seguir oara os próximos passos
    })
}

export default autenticaJWT