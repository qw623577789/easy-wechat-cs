const BusinessClient = require('@qtk/schema-tcp-request-framework').Client;
const EasyWechat = require('easy-wechat');

module.exports = class {
    constructor() {
		this._client = null;
		this._easyWechat = null;
    }

	async init(host, port) {
        this._client = new BusinessClient({
            host, 
            port, 
            schemaDir: `${__dirname}/../server/schema`
		});

		let {platform, wxApp, payment, logDir} = await this._request('config.get', null);
		this._easyWechat = new EasyWechat({platform, wxApp, payment},  logDir);
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
			platformMessage: this._easyWechat.middleware.platformMessage,
			payment: this._easyWechat.middleware.payment,
            refund: this._easyWechat.middleware.refund,
			wxAppJsonMessage: this._easyWechat.middleware.wxAppJsonMessage,
			wxAppXmlMessage: this._easyWechat.middleware.wxAppXmlMessage,
		}
	}
}


<%
    function build(obj) { 
        if (obj.name != undefined && obj.hasParams != undefined) {
            return `(${obj.hasParams ? 'request':''}) => this._request('${obj.name}', ${obj.hasParams ? 'request':'null'})`;
        }
        else {
            return Object.keys(obj).reduce((prev, key) => {
                prev[key] = build(obj[key]);
                return prev;
            }, {})
        }
    }
%>

