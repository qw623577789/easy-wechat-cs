module.exports = async ({request}) => {
    return await easyWechat.platform.templateMessage.push(request);
}