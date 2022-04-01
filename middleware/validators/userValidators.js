const { check } = require('express-validator');

module.exports = {
    createUserValidator: [
        check('sNombre').isString(),
        check('sNombre').notEmpty(),
        check('sSegundoNombre').isString(),
        check('sApellido_Paterno').isString(),
        check('sApellido_Paterno').notEmpty(),
        check('sApellido_Materno').isString(),
        check('dFechaNacimiento').isString(),
        check('sTelefono').isString(),
        check('sTelefono').notEmpty(),
        check('sTelefono').isLength({ min: 10, max: 10 }),
        check('sCorreo').isString(),
        check('sCorreo').notEmpty(),
        check('sCorreo').isEmail(),
    ],
};