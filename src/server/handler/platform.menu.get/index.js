module.exports = async ({request}) => {
    return await easyWechat.platform.menu.get(request);
}