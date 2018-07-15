module.exports = async ({request}) => {
    return await easyWechat.payment.order.get(request);
}