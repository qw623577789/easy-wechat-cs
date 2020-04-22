module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].platform.resource.temporaryUpload(request);
}