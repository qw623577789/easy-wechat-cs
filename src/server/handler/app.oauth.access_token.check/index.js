module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].app.oauth.accessToken.check(request);
}