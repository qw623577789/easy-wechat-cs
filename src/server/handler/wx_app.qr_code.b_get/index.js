module.exports = async ({request}) => {
    return (await easyWechat.wxApp.qrCode.bGet(request)).toString('base64');
}