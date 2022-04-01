const CryptoJS = require("crypto-js");
const moment = require("moment");
const { token_key } = require('../config/config');

const crearHashMd5 = async(str) => {
    return CryptoJS.MD5(str).toString();
}

//De momento se regresa mismo valor... solo dev
const encryptString = (msg) => {
    return msg;
    return CryptoJS.AES.encrypt(msg, token_key).toString();
}

const decryptString = async(msg) => {
    return msg;
    let bytes = CryptoJS.AES.decrypt(msg, token_key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

//TODO encriptar los datos del response
const encryptObjKey = (objData) => {
    let objKey = Object.keys(objData);
    for (let objDataInfo of objKey) {
        const lower = objDataInfo.toLowerCase();
        let objDataCCInfo = objDataInfo.charAt(0).toLowerCase() + objDataInfo.charAt(1).toUpperCase() + lower.slice(2);
        delete Object.assign(objData, {
            [objDataCCInfo]: objData[objDataInfo]
        })[objDataInfo];
    }
    return objData;
}

//TODO dencriptar los datos del request
const decryptObjKey = (objData) => {
    let objKey = Object.keys(objData);
    for (let objDataInfo of objKey) {
        const lower = objDataInfo.toLowerCase();
        let objDataCCInfo = objDataInfo.charAt(0).toLowerCase() + objDataInfo.charAt(1).toUpperCase() + lower.slice(2);
        delete Object.assign(objData, {
            [objDataCCInfo]: objData[objDataInfo]
        })[objDataInfo];
    }
    return objData;
}

module.exports = {
    crearHashMd5,
    encryptObjKey,
    decryptObjKey,
}