module.exports = async ({request}) => {
    return await easyWechat.wxApp.msg.template.subscribeSend(request);
}