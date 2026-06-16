const log = {
    serverUrl : '/api/log',

    debug : ( ...args ) => {
        console.debug(`[DEBUG] `, ...args);
        //log.sendToServer('debug', args);
    },

    info : ( ...args ) => {
        console.info(`[INFO] `, ...args);
        //log.sendToServer('info', args);
    },

    error : ( ...args ) => {
        console.info(`[ERROR] `, ...args);
        log.sendToServer('error', args);
    },

    sendToServer : ( lv, args ) => {

        const params = {
            level : lv,
            message : args.map((arg) => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
        }


        fetch ( log.serverUrl, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(params),
        }).catch ( (error) => {
            console.error(`[LOG ERROR] Failed to send log to server`);
        });
    }
};

window.log = log;