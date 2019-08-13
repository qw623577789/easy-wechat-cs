module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].wxApp.session.get(request);
}