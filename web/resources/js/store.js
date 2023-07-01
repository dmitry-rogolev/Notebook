import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            dark: false, 
        };
    }, 

    getters: {
        getDark() {
            return localStorage.getItem('dark') == 'true' ? true : false;
        }, 
    }, 

    mutations: {
        dark(state, dark) {
            state.dark = dark;
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
    }, 
});

export default store;