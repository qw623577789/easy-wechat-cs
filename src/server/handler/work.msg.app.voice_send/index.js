module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].work.msg.app.voiceSend(request);
}