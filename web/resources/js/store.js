import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            dark: false, 
            autosave: true, 
            windowHeight: 0, 
            font: {
                family: 'sans-serif', 
                name: 'Figtree',  
            }, 
        };
    }, 

    getters: {
        getDark() {
            return localStorage.getItem('dark') == 'true' ? true : false;
        }, 
        getAutosave() {
            return localStorage.getItem('autosave') == 'true' ? true : false;
        }, 
        getFont() {
            let font = localStorage.getItem('font');
            if (font) {
                font = JSON.parse(font);
            }
            return font;
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
        font(state, font) {
            state.font = font;
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
        font(context, font) {
            if (font != undefined) {
                context.commit('font', font);
                localStorage.setItem('font', JSON.stringify(font));
            } else {
                font = context.getters.getFont;
                if (font) {
                    context.commit('font', font);
                }
            }
        }, 
    }, 
});

export default store;