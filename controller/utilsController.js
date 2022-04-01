const { validationResult } = require('express-validator');
const { errResponse } = require('../middleware/HandleError/HandleError');

const { messageError } = require('../utils/strings');


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