import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            dark: false, 
            autosave: true, 
            windowHeight: 0, 
            sidebarWidth: 0, 
            windowWidth: 0, 
            statusbar: true, 
            fullscreen: false, 
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
        windowHeight(state, windowHeight) {
            state.windowHeight = windowHeight;
        }, 
        sidebarWidth(state, sidebarWidth) {
            state.sidebarWidth = sidebarWidth;
        }, 
        windowWidth(state, windowWidth) {
            state.windowWidth = windowWidth;
        }, 
        statusbar(state, statusbar) {
            state.statusbar = statusbar;
        }, 
        fullscreen(state, fullscreen) {
            state.fullscreen = fullscreen;
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