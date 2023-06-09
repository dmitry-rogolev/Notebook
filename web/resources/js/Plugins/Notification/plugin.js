import NotificationManager from './NotificationManager';

export default {
    install: (app, options = {}) => {
        let notifier = new NotificationManager();

        if (typeof options == 'object') {
            if ('interval' in options) {
                notifier.interval = options.interval;
            } 
    
            if ('timeoutMod' in options) {
                notifier.isTimeoutMod = options.timeoutMod;
            } 
    
            if ('filledMod' in options) {
                notifier.isFilledMod = options.filledMod;
            } 
        }

        app.config.globalProperties.$notifier = notifier;
    }, 
};
