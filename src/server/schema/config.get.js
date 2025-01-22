const { array, object, string, integer, empty } = require('@qtk/schema').schema;

const info = {
    title: "获取server端配置",
    description: ""
};

const request = empty();

const response = array(
    object().desc("配置key").properties({
        platform: object().desc("公众号配置信息").properties({
            appId: string(),
            secret: string(),
            token: string(),
            aesKey: string()
        }).require("appId", "secret"),
        work: object().desc("企业微信配置信息").properties({
            corpId: string().desc("企业id"),
            appId: string().desc("自建应用id"),
            secret: string().desc("自建应用秘钥"),
            token: string(),
            aesKey: string()
        }).require("corpId", "appId", "secret"),
        wxApp: object().desc("微信小程序配置").properties({
            appId: string(),
            secret: string(),
            msgPush: object().desc("微信推送解密密匙").properties({
                token: string(),
                encodingAESKey: string()
            })
        }).requireAll(),
        payment: object().desc("微信支付支付").properties({
            appId: string(),
            mchId: string(),
            key: string(),
            notifyUrl: string(),
            pfxFile: string().desc('微信商户平台证书'),
            refundNotifyUrl: string(),

            apiV3CallbackAESKey: string().desc('v3版本回调解密key'),
            wechatPaySerial: string().desc('微信支付公钥ID'),
            certificateSerialNumber: string().desc('平台证书序列号'),
            signPrivateKey: string().desc('签名秘钥'),
            signPublicKey: string().desc('签名公钥'),
        }).require('appId', 'mchId'),
        logDir: string()
    })
);

module.exports = { info, request, response };