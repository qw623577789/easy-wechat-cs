module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].work.oauth.code.getForBase(request);
}