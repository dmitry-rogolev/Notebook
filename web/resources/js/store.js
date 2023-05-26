import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            dark: false, 
            autosave: true, 
        };
    }, 

    getters: {
        getDark() {
            return localStorage.getItem('dark') == 'true' ? true : false;
        }, 
        getAutosave() {
            return localStorage.getItem('autosave') == 'true' ? true : false;
        }, 
    }, 

    mutations: {
        dark(state, dark) {
            state.dark = dark;
        }, 
        autosave(state, autosave) {
            state.autosave = autosave;
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
        autosave(context, autosave) {
            if (autosave != undefined) {
                context.commit('autosave', autosave);
                localStorage.setItem('autosave', autosave);
            } else {
                context.commit('autosave', context.getters.getAutosave);
            }
        }, 
    }, 
});

export default store;