module.exports = async ({request}) => {
    return await easyWechat.wxApp.user.infoDecrypt(request);
}