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
		this._easyWechats = configs.map(({platform, wxApp, payment, logDir}) => {
			return new EasyWechat({platform, wxApp, payment},  logDir);
		});
	}

    
    get app() { 
        return {
		    oauth: {
		        accessToken: {
		            check: (request, index = this._configIndex) => this._request('app.oauth.access_token.check', {request, index}),
		            get: (request, index = this._configIndex) => this._request('app.oauth.access_token.get', {request, index}),
		            refresh: (request, index = this._configIndex) => this._request('app.oauth.access_token.refresh', {request, index})
		        }
		    },
		    user: {
		        infoGetByOauthAccessToken: (request, index = this._configIndex) => this._request('app.user.info_get_by_oauth_access_token', {request, index})
		    }
		}
    }
    
    get payment() { 
        return {
		    common: {
		        signGet: (request, index = this._configIndex) => this._request('payment.common.sign_get', {request, index})
		    },
		    order: {
		        create: (request, index = this._configIndex) => this._request('payment.order.create', {request, index}),
		        get: (request, index = this._configIndex) => this._request('payment.order.get', {request, index}),
		        refund: (request, index = this._configIndex) => this._request('payment.order.refund', {request, index})
		    },
		    redPacket: {
		        fissionSend: (request, index = this._configIndex) => this._request('payment.red_packet.fission_send', {request, index}),
		        infoGet: (request, index = this._configIndex) => this._request('payment.red_packet.info_get', {request, index}),
		        normalSend: (request, index = this._configIndex) => this._request('payment.red_packet.normal_send', {request, index})
		    }
		}
    }
    
    get platform() { 
        return {
		    cs: {
		        add: (request, index = this._configIndex) => this._request('platform.cs.add', {request, index}),
		        avatarUpdate: (request, index = this._configIndex) => this._request('platform.cs.avatar_update', {request, index}),
		        bind: (request, index = this._configIndex) => this._request('platform.cs.bind', {request, index}),
		        delete: (request, index = this._configIndex) => this._request('platform.cs.delete', {request, index}),
		        list: (index = this._configIndex) => this._request('platform.cs.list', {request: null, index}),
		        nicknameUpdate: (request, index = this._configIndex) => this._request('platform.cs.nickname_update', {request, index})
		    },
		    js: {
		        configGet: (request, index = this._configIndex) => this._request('platform.js.config_get', {request, index})
		    },
		    menu: {
		        delete: (index = this._configIndex) => this._request('platform.menu.delete', {request: null, index}),
		        get: (index = this._configIndex) => this._request('platform.menu.get', {request: null, index}),
		        set: (request, index = this._configIndex) => this._request('platform.menu.set', {request, index})
		    },
		    msg: {
		        cs: {
		            cardSend: (request, index = this._configIndex) => this._request('platform.msg.cs.card_send', {request, index}),
		            imageSend: (request, index = this._configIndex) => this._request('platform.msg.cs.image_send', {request, index}),
		            menuSend: (request, index = this._configIndex) => this._request('platform.msg.cs.menu_send', {request, index}),
		            mpArticleSend: (request, index = this._configIndex) => this._request('platform.msg.cs.mp_article_send', {request, index}),
		            musicSend: (request, index = this._configIndex) => this._request('platform.msg.cs.music_send', {request, index}),
		            outsideArticleSend: (request, index = this._configIndex) => this._request('platform.msg.cs.outside_article_send', {request, index}),
		            textSend: (request, index = this._configIndex) => this._request('platform.msg.cs.text_send', {request, index}),
		            typingSet: (request, index = this._configIndex) => this._request('platform.msg.cs.typing_set', {request, index}),
		            videoSend: (request, index = this._configIndex) => this._request('platform.msg.cs.video_send', {request, index}),
		            voiceSend: (request, index = this._configIndex) => this._request('platform.msg.cs.voice_send', {request, index}),
		            wxAppSend: (request, index = this._configIndex) => this._request('platform.msg.cs.wx_app_send', {request, index})
		        },
		        template: {
		            push: (request, index = this._configIndex) => this._request('platform.msg.template.push', {request, index})
		        }
		    },
		    oauth: {
		        accessToken: {
		            check: (request, index = this._configIndex) => this._request('platform.oauth.access_token.check', {request, index}),
		            get: (request, index = this._configIndex) => this._request('platform.oauth.access_token.get', {request, index}),
		            refresh: (request, index = this._configIndex) => this._request('platform.oauth.access_token.refresh', {request, index})
		        },
		        code: {
		            getForBase: (request, index = this._configIndex) => this._request('platform.oauth.code.get_for_base', {request, index}),
		            getForUserInfo: (request, index = this._configIndex) => this._request('platform.oauth.code.get_for_user_info', {request, index})
		        }
		    },
		    user: {
		        infoGetByNormalAccessToken: (request, index = this._configIndex) => this._request('platform.user.info_get_by_normal_access_token', {request, index}),
		        infoGetByOauthAccessToken: (request, index = this._configIndex) => this._request('platform.user.info_get_by_oauth_access_token', {request, index})
		    }
		}
    }
    
    get wxApp() { 
        return {
		    msg: {
		        cs: {
		            imageSend: (request, index = this._configIndex) => this._request('wx_app.msg.cs.image_send', {request, index}),
		            linkSend: (request, index = this._configIndex) => this._request('wx_app.msg.cs.link_send', {request, index}),
		            pageSend: (request, index = this._configIndex) => this._request('wx_app.msg.cs.page_send', {request, index}),
		            textSend: (request, index = this._configIndex) => this._request('wx_app.msg.cs.text_send', {request, index})
		        },
		        template: {
		            push: (request, index = this._configIndex) => this._request('wx_app.msg.template.push', {request, index}),
		            subscribeSend: (request, index = this._configIndex) => this._request('wx_app.msg.template.subscribe_send', {request, index})
		        }
		    },
		    qrCode: {
		        aGet: (request, index = this._configIndex) => this._request('wx_app.qr_code.a_get', {request, index}),
		        bGet: (request, index = this._configIndex) => this._request('wx_app.qr_code.b_get', {request, index})
		    },
		    security: {
		        imgCheck: (request, index = this._configIndex) => this._request('wx_app.security.img_check', {request, index}),
		        textCheck: (request, index = this._configIndex) => this._request('wx_app.security.text_check', {request, index})
		    },
		    session: {
		        get: (request, index = this._configIndex) => this._request('wx_app.session.get', {request, index})
		    },
		    user: {
		        infoDecrypt: (request, index = this._configIndex) => this._request('wx_app.user.info_decrypt', {request, index})
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
			platformMessage: (func, index = this._configIndex) => this._easyWechats[index].middleware.platformMessage(func),
			payment: (func, index = this._configIndex) => this._easyWechats[index].middleware.payment(func),
            refund: (func, index = this._configIndex) => this._easyWechats[index].middleware.refund(func),
			wxAppJsonMessage: (func, index = this._configIndex) => this._easyWechats[index].middleware.wxAppJsonMessage(func),
			wxAppXmlMessage: (func, index = this._configIndex) => this._easyWechats[index].middleware.wxAppXmlMessage(func),
		}
	}
}




