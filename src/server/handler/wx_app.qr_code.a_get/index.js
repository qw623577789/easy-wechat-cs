module.exports = async ({request: {request, index}}) => {
    return (await easyWechats[index].wxApp.qrCode.aGet(request)).toString('base64');
}