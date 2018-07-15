module.exports = async ({request}) => {
    return await easyWechat.wxApp.session.get(request);
}