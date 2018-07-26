const Client = require('../').Client;
const assert = require('assert');

before(async () => {
    global.client = new Client();
    await client.init('127.0.0.1', 5211);
});

describe("test", function() {
    this.timeout(10000);   

    it('platform.oauth.code.get_for_base', async function() {
        const response = await client.platform.oauth.code.getForBase({redirectUrl: 'https://wechat.dierxuetang.com/platform.user.get_by_oauth_accessToken'});
        assert(typeof response === 'string', response);
    });

    it('platform.oauth.code.get_for_user_info', async function() {
        const response = await client.platform.oauth.code.getForUserInfo({redirectUrl: 'https://wechat.dierxuetang.com/platform.user.oauth.code.get'});
        console.log(response)
        assert(typeof response === 'string', response);
    });

    it('platform.oauth.access_token.get', async function() {
        const response = await client.platform.oauth.accessToken.get("xxxxxxxxxxxxxxx");
        console.log(response)
        assert(typeof response === 'object', response);
    });

    it('platform.oauth.access_token.check', async function() {
        const response = await client.platform.oauth.accessToken.check({
            accessToken: 'xxxxxxxxxxxxxxxxxxxxx',
            openId: 'oga5Q0fEb_X7_NFu5EpcvkMp3Qzo'
        });
        console.log(response)
        assert(typeof response === 'boolean', response);
    });

    it('platform.oauth.access_token.refresh', async function() {
        const response = await client.platform.oauth.accessToken.refresh('xxxxxxxxxxxxxxxxxxxxx');
        console.log(response)
        assert(typeof response === 'object', response);
    });

    it('platform.js.config_get', async function() {
        const response = await client.platform.js.configGet('https://wechat.dierxuetang.com/platform.user.get_by_oauth_accessToken');
        assert(typeof response === 'object', response);
    });

    it('platform.menu.delete', async function() {
        this.timeout(10000);   
        const response = await client.platform.menu.delete();
    });

    it('platform.menu.set', async function() {
        this.timeout(10000);   
        let menuInfo = {
            "button":[
                {	
                    "type":"view",
                    "name":"我要加油",
                    "url":"http://test.blackgold.qubaotech.com/proxy/wechat.user.authorize?referer=http%3a%2f%2ftest.blackgold.qubaotech.com%2f%3f%23"
                },
                {	
                    "type":"view",
                    "name":"附近油站",
                    "url":"http://test.blackgold.qubaotech.com/proxy/wechat.user.authorize?referer=http%3a%2f%2ftest.blackgold.qubaotech.com%2f%3f%23%2fnearby-station"
                },
                {	
                    "name":"我的兆方卡",
                    "sub_button": [
                        {
                            "type":"view",
                            "name":"我的兆方卡",
                            "url":"http://test.blackgold.qubaotech.com/proxy/wechat.user.authorize?referer=http%3a%2f%2ftest.blackgold.qubaotech.com%2f%3f%23%2fmine"
                        },
                        {	
                            "type":"view",
                            "name":"新手教程",
                            "url":"http://test.blackgold.qubaotech.com/proxy/wechat.user.authorize?referer=http%3a%2f%2ftest.blackgold.qubaotech.com%2fguide.html"
                        }
                    ]
                },
    
            ]
        } 
        const response = await client.platform.menu.set(menuInfo);
    });

    it('platform.menu.get', async function() {
        this.timeout(10000); 
        const response = await client.platform.menu.get();
        assert(typeof response === 'object', response);
    });

    it('platform.user.info_get_by_normal_access_token', async function() {
        this.timeout(10000); 
        const response = await client.platform.user.infoGetByNormalAccessToken('oga5Q0fEb_X7_NFu5EpcvkMp3Qzo');
        assert(typeof response === 'object', response);
    });

    it('platform.msg.push', async function() {
        this.timeout(10000); 
        const response = await client.platform.msg.push('oga5Q0fEb_X7_NFu5EpcvkMp3Qzo');
        assert(typeof response === 'object', response);
    });

    it('wx_app.msg.common.text_security_check', async function() {
        this.timeout(10000); 
        const response = await client.wxApp.msg.common.textSecurityCheck("11111");
        assert(typeof response === 'boolean', response);
    });
    
    it('wx_app.session.get', async function() {
        this.timeout(10000); 
        const response = await client.wxApp.session.get('023PMWUA0JqFyg264jWA0JhKUA0PMWUd');
        assert(typeof response === 'object', response);
    });

    it('wx_app.qr_code.a_get', async function() {
        this.timeout(10000); 
        const response = await client.wxApp.qrCode.aGet({
            pagePath: 'http://www.baidu.com', 
            width: 500, 
            autoColor: true, 
            lineColor: {r:5, g:3, b: 2},
            isHyaline: true
        });
        assert(typeof response === 'string', response);
    });

    it('wx_app.qr_code.b_get', async function() {
        this.timeout(10000); 
        const response = await client.wxApp.qrCode.bGet({
            scene: "scene", 
            pagePath: 'pages/index/index', 
            width: 500, 
            autoColor: true, 
            lineColor: {r:5, g:3, b: 2},
            isHyaline: true
        });
        assert(typeof response === 'string', response);
    });

    it('wx_app.msg.template.push', async function() {
        this.timeout(10000); 
        const response = await client.wxApp.msg.template.push({
            openId: 'owqhY5MvPbuiJcnBmjb0cXv3pJdE', 
            templateId: 'Tfyej4uqRudQkfwAXKlrTl11IN_2N0wyQn79zNMb6nk', 
            formId: "1531464380847", 
            modelData:{
                keyword1: {
                    value:  'TIT造舰厂',
                    color: '#123455'
                },
                keyword2: {
                    value:  '2016年6月6日',
                    color: '#223455'
                },
                keyword3: {
                    value:  '咖啡',
                    color: '#323455'
                }
            }, 
            emphasisKeyword: 'keyword1.DATA', 
            wxAppPagePath: 'index?foo=bar', 
            color: '#173177'
        });
    });

    it('wx_app.msg.cs.text_send', async function() {
        this.timeout(10000); 
        const response = await client.wxApp.msg.cs.textSend({
            openId: 'owqhY5MvPbuiJcnBmjb0cXv3pJdE', 
            text: "11111"
        });
    });

    it('wx_app.user.info_decrypt', async function() {
        this.timeout(10000); 
        let sessionKey = 'tiihtNczf5v6AKRyjwEUhQ==';
        let encryptedData = 
            'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'+
            'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'+
            '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'+
            '3hVbJSRgv+4lGOETKUQz6OYStslQ142d'+
            'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'+
            'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'+
            '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'+
            'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'+
            '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'+
            '8LOddcQhULW4ucetDf96JcR3g0gfRK4P'+
            'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'+
            '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'+
            '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'+
            'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'+
            'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'+
            '20f0a04COwfneQAGGwd5oa+T8yO5hzuy'+
            'Db/XcxxmK01EpqOyuxINew==';
        let iv = 'r7BXXKkLb8qrSNn05n0qiA==';

        const response = await client.wxApp.user.infoDecrypt({encryptedData, iv, sessionKey});
        assert(typeof response === 'object', response);
    });

    it('payment.order.create', async function() {
        this.timeout(10000); 
        const response = await client.payment.order.create({
            orderId: Date.now() + "", 
            description: "description", 
            detail: "detail", 
            price: 101, 
            tradeType: require('../').Constant.Payment.TradeType.JS, 
            openId: 'o1Iue1FB0xBCaZQVqH3qMbZasr18'
        });
        console.log(response)
        assert(typeof response === 'object', response);
    });

    it('payment.order.get', async function() {
        this.timeout(10000); 
        const response = await client.payment.order.get({wechatOrderId: '4487919922420180715163327112231'});
        console.log(response)
        assert(typeof response === 'object', response);
    });

    it('payment.common.sign_get', async function() {
        this.timeout(10000); 
        const createResponse = await client.payment.order.create({
            orderId: Date.now() + "", 
            description: "description", 
            detail: "detail", 
            price: 101, 
            tradeType: require('../').Constant.Payment.TradeType.JS, 
            openId: 'o1Iue1FB0xBCaZQVqH3qMbZasr18'
        });
        let response = await client.payment.common.signGet({
            data: {
                appId: createResponse.appId,
                timeStamp: Date.now(),
                nonceStr: createResponse.nonceStr,
                package: "prepay_id=" + createResponse.prepayId,
                signType: require('../').Constant.Payment.EncrypType.MD5
            }
        });
        console.log(response)
        assert(typeof response === 'string', response);
    });
});


