module.exports = async ({request}) => {
    return await easyWechat.payment.order.create(request);
}