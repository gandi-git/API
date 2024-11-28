const jwt = require('jsonwebtoken');  
const dotenv = require('dotenv');
dotenv.config(); 

const SECRET_KEY = process.env.SECRET_KEY;  
exports.tokenAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  

    if (!token) {
        return res.status(401).send('Akses Ditolak! Token tidak ada');
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Token tidak valid');
        }
        
        req.user = user;
        next();
    });
};