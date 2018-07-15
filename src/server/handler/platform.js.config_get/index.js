module.exports = async ({request}) => {
    return await easyWechat.platform.js.configGet(request);
}