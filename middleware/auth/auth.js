const CryptoJS = require("crypto-js");
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const generateToken = (data) => {
    try {
        const token = jwt.sign(data, config.token_key, {
            algorithm: 'HS256',
            expiresIn: '8h'
        });
        return token;
    } catch (error) {
        return error;
    }
}

const verifyToken = (req, res, next) => {
    try {
        //if (req.header('Authorization')?.split(' ')[0] == 'Bearer') {
        if (req.header('Authorization').split(' ')[0] == 'Bearer') {
            const decoded = jwt.verify(req.header('Authorization').split(' ')[1], config.token_key);
            if (decoded.exp <= moment().unix()) {
                return res.status(401).send({
                    status: 401,
                    message: 'Token Expirado.'
                });
            } else {
                if (!validaIdentidad(decoded, req.header('sMW'))) {
                    return res.status(403).send({
                        status: 403,
                        message: "Token Inválido, no pudo ser autenticado."
                    });
                }
                next();
            }
        } else {
            return res.status(403).send({
                status: 403,
                message: 'Token Inválido.'
            });
        }
    } catch (error) {
        console.log(error);
        switch (error.name) {
            case 'JsonWebTokenError':
                return res.status(403).send({
                    status: 403,
                    message: 'Token Inválido.'
                });
            case 'TokenExpiredError':
                return res.status(401).send({
                    status: 401,
                    message: 'Token Expirado.'
                });
            default:
                return res.status(403).send({
                    status: 403,
                    message: "Token Inválido, no pudes ser autenticado."
                });
        }
    }
}

const validaIdentidad = (data, sMW) => {
    if (sMW != undefined && sMW != 'undefined') {
        console.log(data, sMW);
        if (decrytData(data.sUd) == decrytData(sMW)) {
            return true;
        }
    }
    return false;
}

const decrytData = (msg) => {
    let bytes = CryptoJS.AES.decrypt(msg, config.token_key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    generateToken,
    verifyToken
}