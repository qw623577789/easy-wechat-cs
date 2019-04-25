module.exports = async ({request}) => {
    return await easyWechat.platform.user.infoGetByOAuthAccessToken(request);
}