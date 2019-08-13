module.exports = async ({request: {request, index}}) => {
    return (await easyWechats[index].wxApp.qrCode.bGet(request)).toString('base64');
}