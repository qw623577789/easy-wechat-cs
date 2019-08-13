module.exports = async () => {
    return easyWechats.map(_ => {
        let {platform, wxApp, payment} = _.config;
        return {platform, wxApp, payment, logDir: _.logger.logDir};
    })
}