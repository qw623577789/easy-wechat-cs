module.exports = async ({request}) => {
    return await easyWechat.platform.oauth.code.getForUserInfo(request);
}