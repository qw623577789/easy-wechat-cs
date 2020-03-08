module.exports = async ({request: {request, index}}) => {
    return await easyWechats[index].<%= functionName %>(request);
}