module.exports = async () => {
    let {platform, wxApp, payment} = easyWechat.config;
    return {platform, wxApp, payment, logDir: easyWechat.logger.logDir};
}