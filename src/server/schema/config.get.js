const {array, object, string, integer, empty} = require('semantic-schema').schema;

const info = {
    title: "获取server端配置",
    description: ""
};

const request = empty();

const response = object().desc("配置key").properties({
    platform: object().desc("公众号配置信息").properties({
        appId: string(),
        secret: string(),
        token: string(),
        aesKey: string()
    }).required("appId", "secret"),
    wxApp: object().desc("微信小程序配置").properties({
        appId: string(),
        secret: string(),
        msgPush: object().desc("微信推送解密密匙").properties({
            token: string(),
            encodingAESKey: string()
        })
    }).requiredAll(),
    payment: object().desc("微信支付支付").properties({
        appId: string(),
        mchId: string(),
        key: string(),
        notifyUrl: string(),
        pfxFile: string().desc('微信商户平台证书')
    }).required('appId', 'mchId', 'key', 'notifyUrl'),
    logDir: string()
});

module.exports = {info, request, response};