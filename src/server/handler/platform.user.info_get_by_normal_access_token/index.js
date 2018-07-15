module.exports = async ({request}) => {
    return await easyWechat.platform.user.infoGetByNormalAccessToken(request);
}