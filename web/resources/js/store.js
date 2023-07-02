import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            dark: false, 
            locale: 'ru', 
        };
    }, 

    getters: {
        getDark() {
            return localStorage.getItem('dark') == 'true' ? true : false;
        }, 
        getLocale() {
            return localStorage.getItem('locale');
        }, 
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
            if (dark != undefined) {
                context.commit('dark', dark);
                localStorage.setItem('dark', dark);

                if (dark) {
                    document.body.classList.add('dark');
                } else {
                    document.body.classList.remove('dark');
                }
            } else {
                context.commit('dark', context.getters.getDark);

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
                localStorage.setItem('locale', locale);
            } else {
                context.commit('locale', context.getters.getLocale);
            }
        }, 
    }, 
});

export default store;