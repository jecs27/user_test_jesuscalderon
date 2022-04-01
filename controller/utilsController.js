const { validationResult } = require('express-validator');
const { errResponse } = require('../middleware/HandleError/HandleError');
const moment = require('moment');
const { messageError } = require('../utils/strings');

const {
    generateToken
} = require('../middleware/auth/auth');

const {
    encryptObjKey,
    decryptString,
    crearHashMd5
} = require('../utils/CTools')

const getTokenApplication = async(req, res) => {
    let err = await errResponse(validationResult(req), res, 'error');
    if (err !== null) {
        return res.status(422).send({
            status: 422,
            message: messageError,
            data: {}
        });
    }
    try {
        let {
            sMW
        } = req.body;
        let idApp = req.header('sMW').split(' ')[1];
        if (sMW == undefined || idApp == undefined || sMW != 'trc-2712' || idApp != 'trc-2712') {
            return res.status(409).send({
                status: 409,
                message: 'Ocurrió un error en la aplicación, intente de nuevo mas tarde.',
                data: {}
            });
        }
        let sToken = generateToken({
            sMW: moment().format('DD.MM.YYYY') + await crearHashMd5("-JECS2712"),
        });
        return res.status(200).send({
            status: 200,
            message: '_OK_',
            data: {
                token: sToken
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'Ocurrió un error en la aplicación, intente de nuevo mas tarde.',
            data: { error: error.toString() }
        });
    }
}

module.exports = {
    getTokenApplication,
}