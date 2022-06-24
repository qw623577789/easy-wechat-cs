module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].work.user.infoGetByUserId(request);
}