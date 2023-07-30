import { createStore } from 'vuex';
import { cache, config, isUndefined, plugin } from './Classes/helpers';

const store = createStore({
    state() {
        return {
            dark: false, 
            locale: 'ru', 
        };
    },  

    mutations: {
        dark(state, dark) {
            state.dark = dark;
        }, 
        locale(state, locale) {
            state.locale = locale;
        }, 
    }, 

    actions: {
        dark(context, dark) {
            if (! isUndefined(dark)) {
                context.commit('dark', dark);
                cache('dark', dark);

                if (dark) {
                    document.body.classList.add('dark');
                } else {
                    document.body.classList.remove('dark');
                }
            } else {
                context.commit('dark', cache('dark') ?? false);

                if (context.getters.getDark) {
                    document.body.classList.add('dark');
                } else {
                    document.body.classList.remove('dark');
                }
            }
        }, 
        locale(context, locale) {
            if (locale != undefined) {
                context.commit('locale', locale);
                cache('locale', locale);
                plugin('i18n').locale = locale;
            } else {
                locale = cache('locale') ?? config('locale.default', 'ru');
                context.commit('locale', locale);
                plugin('i18n').locale = locale;
            }
        }, 
    }, 
});

export default store;