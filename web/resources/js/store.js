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
            } else {
                context.commit('dark', context.getters.getDark);
            }
        }, 
    }, 
});

export default store;