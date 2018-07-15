module.exports = async ({request}) => {
    return await easyWechat.wxApp.msg.cs.pageSend(request);
}