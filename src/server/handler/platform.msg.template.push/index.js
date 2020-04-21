module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].platform.msg.template.push(request);
}