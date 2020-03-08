module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].app.oauth.accessToken.refresh(request);
}