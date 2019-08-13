module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].platform.oauth.code.getForUserInfo(request);
}