module.exports = async () => {
    return easyWechats.map(_ => {
        let { platform, wxApp, payment, work } = _.config;
        return { platform, wxApp, payment, work, logDir: _.logger.logDir };
    })
}