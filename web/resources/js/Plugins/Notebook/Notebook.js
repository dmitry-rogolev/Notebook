import { router } from "@inertiajs/vue3";
import Fuse from 'fuse.js'
import { cache, config, inertia, isBoolean, isNull, plugin, store, t } from "../../Classes/helpers";
import IndexController from "../../Classes/Controllers/Note/IndexController";
import TrashIndexController from "../../Classes/Controllers/Note/Trash/IndexController";
import Window from "../Window/Window";

class Notebook
{
    static DEFAULT_CACHE_PREFIX = '__cache_notebook_';
    static DEFAULT_AUTOSAVE = false;
    static DEFAULT_AUTOSAVE_INTERVAL = 60000;

    _isInit = false;
    _autosave = false;
    _timerAutosave = 0;

    _notes = [];
    _trashNotes = [];

    // _search = '';

    // _found = [];

    /**
     * @property {Boolean}
     */
    get isInit() {
        return this._isInit;
    }

    /**
     * @property {Array}
     */
    get notes() {
        return this._notes ?? [];
    }

    /**
     * @property {Array}
     */
    get trashNotes() {
        return this._trashNotes;
    }

    /**
     * @property {Boolean}
     */
    get autosave() {
        return this._autosave;
    }

    /**
     * @property {Array}
     */
    // get found() {
    //     return this._found;
    // }

    /**
     * 
     * @returns {Boolean}
     */
    getAutosave() {
        let autosave = cache(`${config('notebook.cache.prefix', Notebook.DEFAULT_CACHE_PREFIX)}autosave`);

        if (isNull(autosave)) {
            return config('notebook.autosave.default', Notebook.DEFAULT_AUTOSAVE);
        }

        return autosave;
    }

    /**
     * 
     * @param {Boolean} autosave 
     * @returns {void}
     */
    setAutosave(autosave) {
        if (isBoolean(autosave)) {
            cache(`${config('notebook.cache.prefix', Notebook.DEFAULT_CACHE_PREFIX)}autosave`, autosave);
            this._autosave = autosave;
        }
    }

    constructor() {
        plugin('window').setDefaultFile({
            title: '', 
            text: '', 
        });
    }

    /**
     * @returns {void}
     */
    async init() {
        if (! this.isInit) {
            inertia().on('success', () => {
                store().dispatch('locale');
            });

            this._autosave = this.getAutosave();
            this._notes = await this._fetchNotes();
            this._trashNotes = await this._fetchTrashNotes();

            this.openWindow();
            this._addKeyUpEventListener();

            this._isInit = true;
        }
    }

    /**
     * @returns {void}
     */
    dispose() {
        if (this.isInit) {
            this.closeWindow();

            this._notes = [];
            this._trashNotes = [];
            this._removeKeyUpEventListener();

            this._isInit = false;
        }
    }

    /**
     * 
     * @returns {Array}
     */
    async _fetchNotes() {
        return IndexController.invoke();
    }

    /**
     * 
     * @returns {Array}
     */
    async _fetchTrashNotes() {
        return TrashIndexController.invoke();
    }

    /**
     * @returns {void}
     */
    openWindow() {
        if (config('window.open', Window.DEFAULT_OPEN)) {
            if (this.notes.length) {
                plugin('window').open(this.notes[0]);
            } else if (this.trashNotes.length) {
                plugin('window').open(this.trashNotes[0]);
            }
        }
    }

    /**
     * @returns {void}
     */
    closeWindow() {
        plugin('window').close();
    }

    // create(note = {}) {
    //     StoreController.store(note).then(note => {
    //         this._notes.push(note);
    //         this._$window.open(note);
    //         this._$notifier.push({
    //             message: this._$t('Created'), 
    //             success: true, 
    //         });
    //     });
    // } 

    // openFile() {
    //     let input = document.createElement('input');
    //     input.type = 'file';
    //     input.accept = 'text/*';
    //     input.onchange = () => {
    //         if (input.files[0]) {
    //             input.files[0].arrayBuffer().then((arrayBuffer) => {
    //                 this.create({
    //                     title: input.files[0].name, 
    //                     text: this._toHtml(new TextDecoder().decode(arrayBuffer)), 
    //                 });
    //             });
    //         }
    //     }
    //     input.click();
    // }

    // update() {
    //     if (this._$window.file.isDirty) {
    //         UpdateController.update(this._$window.file).then(() => {
    //             this._$notifier.push({
    //                 message: this._$t('Saved'), 
    //                 success: true, 
    //             });
    //         });
    //     }
    // }

    // delete() {
    //     let note = this._$window.file;
    //     DeleteController.delete(note).then(() => {
    //         this._getNotes().then((notes) => {
    //             this._notes = notes;

    //             this.find(this._search);
    //             this._openWindow();
    //             this._$notifier.push({
    //                 message: this._$t('Deleted'), 
    //                 success: true, 
    //             });
    //             this._getTrash().then(trash => {
    //                 this._trash = trash;
    //             });
    //         });
    //     });
    // }

    // restore() {
    //     let note = this._$window.file;
    //     if (note.isTrashed) {
    //         TrashRestoreController.restore(note).then(() => {
    //             this._getNotes().then((notes) => {
    //                 this._notes = notes;
    //             });
    //             this._getTrash().then(trash => {
    //                 this._trash = trash;
    //                 this._openWindowTrash();
    //                 this._$notifier.push({
    //                     message: this._$t('Restored'), 
    //                     success: true, 
    //                 });
    //             });
    //         });
    //     }
    // }

    // forceDelete() {
    //     let note = this._$window.file;
    //     if (note.isTrashed) {
    //         TrashDeleteController.delete(note).then(() => {
    //             this._getTrash().then(trash => {
    //                 this._trash = trash;
    //                 this._openWindowTrash();
    //                 this._$notifier.push({
    //                     message: this._$t('Deleted'), 
    //                     success: true, 
    //                 });
    //             });
    //         });
    //     }
    // }

    // clear() {
    //     if (this._notes.length) {
    //         DeleteAllController.truncate().then(() => {
    //             this._notes = [];
    //             this._openWindowTrash();
    //             this._$notifier.push({
    //                 message: this._$t('Cleared'), 
    //                 success: true, 
    //             });
    //             this._getTrash().then(trash => {
    //                 this._trash = trash;
    //             });
    //         });
    //     }
    // }

    // restoreAll() {
    //     if (this._trash.length) {
    //         TrashRestoreAllController.restore().then(() => {
    //             this._trash = [];
    
    //             this._getNotes().then((notes) => {
    //                 this._notes = notes;
    //                 this._openWindow();
    //                 this._$notifier.push({
    //                     message: this._$t('Restored'), 
    //                     success: true, 
    //                 });
    //             });
    //         });
    //     }
    // }

    // forceClear() {
    //     if (this._trash.length) {
    //         TrashDeleteAllController.truncate().then(() => {
    //             this._trash = [];
    //             this._openWindow();
    //             this._$notifier.push({
    //                 message: this._$t('Cleared'), 
    //                 success: true, 
    //             });
    //         });
    //     }
    // }

    /**
    * @returns {void}
    */
    toggleAutosave() {
        this.setAutosave(! this._autosave);

        if (this._autosave) {
            this.onAutosave();
        } else {
            this.offAutosave();
        }
    }

    /**
    * @returns {void}
    */
    onAutosave() {
        if (this._timerAutosave === 0) {
            this._timerAutosave = setInterval(() => this.update(), config('notebook.autosave.interval', Notebook.DEFAULT_AUTOSAVE_INTERVAL));

            plugin('notifier').push({
                message: t('Auto save mod on'), 
                success: true, 
            });
        }
    }

    /**
    * @returns {void}
    */
    offAutosave() {
        if (this._timerAutosave !== 0) {
            clearInterval(this._timerAutosave);
            this._timerAutosave = 0;

            plugin('notifier').push({
                message: t('Auto save mod off'), 
                success: true, 
            });
        }
    }

    // find(search) {
    //     if (search) {
    //         this._search = search;

    //         let fuse = new Fuse(this._notes, {
    //             keys: [
    //                 'title', 
    //                 'text', 
    //             ], 
    //             includeMatches: true, 
    //         });

    //         this._found = fuse.search(search);
    //     } else {
    //         this._found = null;
    //     }
    // }

    // logout() {
    //     router.post(route('logout'));
    //     this._closeWindow();
    //     this._notes = [];
    //     this._trash = [];
    // }

    // _updateNotes() {
    //     this._getNotes().then((notes) => {
    //         this._notes = notes;
    //         this._openWindow();
    //     });
    // }

    // _toHtml(str) {
    //     return str
    //         .split('\n\n')
    //         .map((v) => {
    //             return `<div>${v.split('\n').join(' ')}</div>`;
    //         })
    //         .join('');
    // }

    _addKeyUpEventListener() {
        document.addEventListener('keyup', this._keyup);
    }

    _removeKeyUpEventListener() {
        document.removeEventListener('keyup', this._keyup);
    }

    _keyup(e) {
        e.preventDefault();
        e.stopPropagation();

        // New
        if (e.altKey && e.code == 'KeyN') {
            plugin('notebook').create();
        } 

        // Open
        else if (e.altKey && e.code == 'KeyO') {
            plugin('notebook').openFile();
        } 

        if (plugin('window').file.id && ! plugin('window').file.isTrashed) {
            // Save
            if (e.altKey && e.code == 'KeyS') {
                plugin('notebook').update();
            } 
        }

        // Exit
        else if (e.altKey && e.code == 'KeyQ') {
            plugin('window').close();
        }
    }
}

export default Notebook;
