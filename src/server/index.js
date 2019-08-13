const TcpServer = require('@qtk/schema-tcp-request-framework').Server;
const Log4js = require('log4js');
const EasyWechat = require('easy-wechat');

module.exports = class {
    start(host, port, config, logPath) {
        this._host = host;
        this._port = port;
        this._config = config;
        this._logPath = logPath;
        this._initLogger();
        this._initServer();
        this._initEasyWechat();
    }

    _initLogger() {
        Log4js.configure({
            appenders: {
                runtime: this._logPath ? {
                    type: 'dateFile',
                    filename: `${this._logPath}/runtime/`,
                    pattern: "yyyy-MM-dd.log",
                    alwaysIncludePattern: true
                } : {
                    type: 'console'
                }
            },
            categories: {
                default: { appenders: ['runtime'], level: "ALL" }
            }
        });
        global.Logger = Log4js.getLogger('default');
    }
    
    _initServer() {
        global.server = new TcpServer({
            host: this._host,
            port: parseInt(this._port),
            handlerDir: `${__dirname}/handler`,
            schemaDir: `${__dirname}/schema`
        });
        
        server.on("exception", (socket, err) => {
            Logger.error(`internal server error: `, err.stack);
        });
        
        server.on("started", () => {
            Logger.info(`server started at: ${this._host}:${this._port}`);
        });
    
        server.start();
    }
    
    _initEasyWechat() {
        let config = JSON.parse(this._config);
        global.easyWechats = [].concat(config)
            .map(_ => {
                return new EasyWechat(_, this._logPath != undefined ? `${this._logPath}/lib` : undefined);
            });
    }
}


