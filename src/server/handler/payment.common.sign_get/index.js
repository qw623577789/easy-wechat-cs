module.exports = async ({request}) => {
    return await easyWechat.payment.common.signGet(request);
}