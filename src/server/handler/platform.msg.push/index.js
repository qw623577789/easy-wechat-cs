module.exports = async ({request}) => {
    return await easyWechat.platform.msg.push(request);
}