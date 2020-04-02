module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].app.user.infoGetByOauthAccessToken(request);
    
}