const BusinessClient = require('@qtk/schema-tcp-request-framework').Client;
const EasyWechat = require('easy-wechat');

module.exports = class {
    constructor() {
		this._client = null;
		this._easyWechats = null;
    }

	async init(host, port, index = 0) {
        this._client = new BusinessClient({
            host, 
            port
		});

		this._configIndex = index;
		let configs = await this._request('config.get', null);
		this._easyWechats = configs.map(({platform, work, wxApp, payment, logDir}) => {
			return new EasyWechat({platform, work, wxApp, payment},  logDir);
		});
	}

    <% Object.keys(functionObj).forEach(nameSpace => { %>
    get <%= nameSpace %>() { 
        return <%- JSON.stringify(build(functionObj[nameSpace]), null, 4).replace(/\"/g, "").replace(/\n/g, "\n\t\t"); %>
    }
    <% }); %>

    async _request(method, request, timeout = 30) {
        return await this._client.send({command: method, payload: request, timeout}).catch((err) => {
            throw new Error(`[${method}] ${err.message}`)
        }); 
    }

    get middleware() {
		return {
			platformMessage: (func, index = this._configIndex) => this._easyWechats[index].middleware.platformMessage(func),
			workMessage: (func, index = this._configIndex) => this._easyWechats[index].middleware.workMessage(func),
            payment: (func, index = this._configIndex) => this._easyWechats[index].middleware.payment(func),
            refund: (func, index = this._configIndex) => this._easyWechats[index].middleware.refund(func),
			wxAppJsonMessage: (func, index = this._configIndex) => this._easyWechats[index].middleware.wxAppJsonMessage(func),
			wxAppXmlMessage: (func, index = this._configIndex) => this._easyWechats[index].middleware.wxAppXmlMessage(func),
		}
	}
}


<%
    function build(obj) { 
        if (obj.name != undefined && obj.hasParams != undefined) {
            return `(${obj.hasParams ? 'request, ':''}index = this._configIndex) => this._request('${obj.name}', {${obj.hasParams ? 'request, ':'request: null, '}index})`;
        }
        else {
            return Object.keys(obj).reduce((prev, key) => {
                prev[key] = build(obj[key]);
                return prev;
            }, {})
        }
    }
%>

