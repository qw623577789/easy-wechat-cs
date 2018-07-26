module.exports = async ({request}) => {
    return await easyWechat.wxApp.msg.common.textSecurityCheck(request);
}