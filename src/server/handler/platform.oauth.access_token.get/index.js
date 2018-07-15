module.exports = async ({request}) => {
    return await easyWechat.platform.oauth.accessToken.get(request);
}