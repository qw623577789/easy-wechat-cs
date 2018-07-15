module.exports = async ({request}) => {
    return await easyWechat.payment.redPacket.fissionSend(request);
}