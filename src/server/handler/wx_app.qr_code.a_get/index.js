module.exports = async ({request}) => {
    return await easyWechat.wxApp.qrCode.aGet(request);
}