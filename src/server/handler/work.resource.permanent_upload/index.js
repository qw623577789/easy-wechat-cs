module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].work.resource.permanentUpload(request);
}