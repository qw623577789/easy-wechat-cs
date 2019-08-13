module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].wxApp.msg.cs.linkSend(request);
}