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

    
    get payment() { 
        return {
		    common: {
		        signGet: (request) => this._request('payment.common.sign_get', request)
		    },
		    order: {
		        create: (request) => this._request('payment.order.create', request),
		        get: (request) => this._request('payment.order.get', request),
		        refund: (request) => this._request('payment.order.refund', request)
		    },
		    redPacket: {
		        fissionSend: (request) => this._request('payment.red_packet.fission_send', request),
		        infoGet: (request) => this._request('payment.red_packet.info_get', request),
		        normalSend: (request) => this._request('payment.red_packet.normal_send', request)
		    }
		}
    }
    
    get platform() { 
        return {
		    js: {
		        configGet: (request) => this._request('platform.js.config_get', request)
		    },
		    menu: {
		        delete: () => this._request('platform.menu.delete', null),
		        get: () => this._request('platform.menu.get', null),
		        set: (request) => this._request('platform.menu.set', request)
		    },
		    msg: {
		        push: (request) => this._request('platform.msg.push', request)
		    },
		    oauth: {
		        accessToken: {
		            check: (request) => this._request('platform.oauth.access_token.check', request),
		            get: (request) => this._request('platform.oauth.access_token.get', request),
		            refresh: (request) => this._request('platform.oauth.access_token.refresh', request)
		        },
		        code: {
		            getForBase: (request) => this._request('platform.oauth.code.get_for_base', request),
		            getForUserInfo: (request) => this._request('platform.oauth.code.get_for_user_info', request)
		        }
		    },
		    user: {
		        infoGetByNormalAccessToken: (request) => this._request('platform.user.info_get_by_normal_access_token', request),
		        infoGetByOauthAccessToken: (request) => this._request('platform.user.info_get_by_oauth_access_token', request)
		    }
		}
    }
    
    get wxApp() { 
        return {
		    msg: {
		        common: {
		            textSecurityCheck: (request) => this._request('wx_app.msg.common.text_security_check', request)
		        },
		        cs: {
		            imageSend: (request) => this._request('wx_app.msg.cs.image_send', request),
		            linkSend: (request) => this._request('wx_app.msg.cs.link_send', request),
		            pageSend: (request) => this._request('wx_app.msg.cs.page_send', request),
		            textSend: (request) => this._request('wx_app.msg.cs.text_send', request)
		        },
		        template: {
		            push: (request) => this._request('wx_app.msg.template.push', request)
		        }
		    },
		    qrCode: {
		        aGet: (request) => this._request('wx_app.qr_code.a_get', request),
		        bGet: (request) => this._request('wx_app.qr_code.b_get', request)
		    },
		    session: {
		        get: (request) => this._request('wx_app.session.get', request)
		    },
		    user: {
		        infoDecrypt: (request) => this._request('wx_app.user.info_decrypt', request)
		    }
		}
    }
    

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




