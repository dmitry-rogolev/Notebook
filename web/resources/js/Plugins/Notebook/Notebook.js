import { router } from "@inertiajs/vue3";
import { Inertia } from '@inertiajs/inertia';
import Cache from "../../Classes/Cache";
import Configuration from "../../Classes/Configuration";
import DeleteAllController from "../../Classes/Controllers/Note/DeleteAllController";
import DeleteController from "../../Classes/Controllers/Note/DeleteController";
import IndexContoller from "../../Classes/Controllers/Note/IndexController";
import StoreController from "../../Classes/Controllers/Note/StoreController";
import UpdateController from "../../Classes/Controllers/Note/UpdateController";
import TrashIndexController from "../../Classes/Controllers/Note/Trash/IndexController";
import TrashDeleteController from "../../Classes/Controllers/Note/Trash/DeleteController";
import TrashDeleteAllController from "../../Classes/Controllers/Note/Trash/DeleteAllController";
import TrashRestoreController from "../../Classes/Controllers/Note/Trash/RestoreController";
import TrashRestoreAllController from "../../Classes/Controllers/Note/Trash/RestoreAllController";
import Fuse from 'fuse.js'

class Notebook
{
    _configuration = null;
    _$window = null;
    _$notifier = null;
    _$t = null;

    _isInit = false;
    _autosave = false;
    _timerAutosave = 0;
    _search = '';

    _notes = [];
    _found = [];
    _trash = [];

    /**
     * @property {Boolean}
     */
    get isInit() {
        return this._isInit;
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
    get notes() {
        return this._notes;
    }

    /**
     * @property {Array}
     */
    get found() {
        return this._found;
    }

    /**
     * @property {Array}
     */
    get trash() {
        return this._trash;
    }

    constructor() {
        this._configuration = Configuration.getInstance();
        this._$window = window.app.config.globalProperties.$window;
        this._$notifier = window.app.config.globalProperties.$notifier;
        this._$t = window.app.config.globalProperties.$t;
        this._$window.setDefaultFile({
            title: '', 
            text: '', 
        });
    }

    init() {
        if (! this._isInit) {
            Inertia.on('success', (event) => {
                window.app.config.globalProperties.$store.dispatch('locale');
            });

            this._getNotes().then((notes) => {
                this._notes = notes;

                this._getTrash().then(trash => {
                    this._trash = trash;
                });

                this._openWindow();

                this._autosave = this._getAutosave();

                this._addKeyUpEventListener();

                this._isInit = true;
            });
        }
    }

    dispose() {
        if (this._isInit) {
            this._closeWindow();

            this._notes = [];
            this._trash = [];
            this._autosave = false;

            this._removeKeyUpEventListener();

            this._isInit = false;
        }
    }

    create(note = {}) {
        StoreController.store(note).then(note => {
            this._notes.push(note);
            this._$window.open(note);
            this._$notifier.push({
                message: this._$t('Created'), 
                success: true, 
            });
        });
    } 

    openFile() {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'text/*';
        input.onchange = () => {
            if (input.files[0]) {
                input.files[0].arrayBuffer().then((arrayBuffer) => {
                    this.create({
                        title: input.files[0].name, 
                        text: this._toHtml(new TextDecoder().decode(arrayBuffer)), 
                    });
                });
            }
        }
        input.click();
    }

    update() {
        if (this._$window.file.isDirty) {
            UpdateController.update(this._$window.file).then(() => {
                this._$notifier.push({
                    message: this._$t('Saved'), 
                    success: true, 
                });
            });
        }
    }

    delete() {
        let note = this._$window.file;
        DeleteController.delete(note).then(() => {
            this._getNotes().then((notes) => {
                this._notes = notes;

                this.find(this._search);
                this._openWindow();
                this._$notifier.push({
                    message: this._$t('Deleted'), 
                    success: true, 
                });
                this._getTrash().then(trash => {
                    this._trash = trash;
                });
            });
        });
    }

    restore() {
        let note = this._$window.file;
        if (note.isTrashed) {
            TrashRestoreController.restore(note).then(() => {
                this._getNotes().then((notes) => {
                    this._notes = notes;
                });
                this._getTrash().then(trash => {
                    this._trash = trash;
                    this._openWindowTrash();
                    this._$notifier.push({
                        message: this._$t('Restored'), 
                        success: true, 
                    });
                });
            });
        }
    }

    forceDelete() {
        let note = this._$window.file;
        if (note.isTrashed) {
            TrashDeleteController.delete(note).then(() => {
                this._getTrash().then(trash => {
                    this._trash = trash;
                    this._openWindowTrash();
                    this._$notifier.push({
                        message: this._$t('Deleted'), 
                        success: true, 
                    });
                });
            });
        }
    }

    clear() {
        if (this._notes.length) {
            DeleteAllController.truncate().then(() => {
                this._notes = [];
                this._openWindowTrash();
                this._$notifier.push({
                    message: this._$t('Cleared'), 
                    success: true, 
                });
                this._getTrash().then(trash => {
                    this._trash = trash;
                });
            });
        }
    }

    restoreAll() {
        if (this._trash.length) {
            TrashRestoreAllController.restore().then(() => {
                this._trash = [];
    
                this._getNotes().then((notes) => {
                    this._notes = notes;
                    this._openWindow();
                    this._$notifier.push({
                        message: this._$t('Restored'), 
                        success: true, 
                    });
                });
            });
        }
    }

    forceClear() {
        if (this._trash.length) {
            TrashDeleteAllController.truncate().then(() => {
                this._trash = [];
                this._openWindow();
                this._$notifier.push({
                    message: this._$t('Cleared'), 
                    success: true, 
                });
            });
        }
    }

    /**
    * @returns {void}
    */
    toggleAutosave() {
        this._autosave = ! this._autosave;
        this._setAutosave(this._autosave);

        if (this._autosave) {
            this._onAutosave();
        } else {
            this._offAutosave();
        }
    }

    find(search) {
        if (search) {
            this._search = search;

            let fuse = new Fuse(this._notes, {
                keys: [
                    'title', 
                    'text', 
                ], 
                includeMatches: true, 
            });

            this._found = fuse.search(search);
        } else {
            this._found = null;
        }
    }

    logout() {
        router.post(route('logout'));
        this._closeWindow();
        this._notes = [];
        this._trash = [];
    }

    _getNotes() {
        return IndexContoller.index();
    }

    _getTrash() {
        return TrashIndexController.index();
    }

    _updateNotes() {
        this._getNotes().then((notes) => {
            this._notes = notes;
            this._openWindow();
        });
    }

    _openWindow() {
        if (this._configuration.getIsOpenWindowAfterInit() && this._notes.length) {
            let index = 0;

            if (this._configuration.getOpenItemAfterInit() === 'last') {
                index = this._notes.length - 1;
            }

            this._$window.open(this._notes[index]);
        } else if (! this._notes.length) {
            this._$window.close();
        }
    }

    _openWindowTrash() {
        if (this._configuration.getIsOpenWindowAfterInit() && this._trash.length) {
            let index = 0;

            if (this._configuration.getOpenItemAfterInit() === 'last') {
                index = this._trash.length - 1;
            }

            this._$window.open(this._trash[index]);
        } else if (! this._trash.length) {
            this._openWindow();
        }
    }

    _closeWindow() {
        this._$window.close();
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getAutosave() {
        return Cache.get(this._configuration.getNotebookCachePrefix() + 'autosave', false);
    }

    /**
     * 
     * @param {Boolean} autosave 
     * @returns {void}
     */
    _setAutosave(autosave) {
        Cache.set(this._configuration.getNotebookCachePrefix() + 'autosave', autosave);
    }

    _onAutosave() {
        if (! this._timerAutosave) {
            this._timerAutosave = setInterval(() => this.update(), this._configuration.getAutosaveInterval());

            this._$notifier.push({
                message: this._$t('Auto save mod on'), 
                success: true, 
            });
        }
    }

    _offAutosave() {
        if (this._timerAutosave) {
            clearInterval(this._timerAutosave);
            this._timerAutosave = null;

            this._$notifier.push({
                message: this._$t('Auto save mod off'), 
                success: true, 
            });
        }
    }

    _toHtml(str) {
        return str
            .split('\n\n')
            .map((v) => {
                return `<div>${v.split('\n').join(' ')}</div>`;
            })
            .join('');
    }

    _addKeyUpEventListener() {
        document.addEventListener('keyup', this._keyup);
    }

    _removeKeyUpEventListener() {
        document.removeEventListener('keyup', this._keyup);
    }

    _keyup(e) {
        e.preventDefault();
        e.stopPropagation();

        let $notebook = window.app.config.globalProperties.$notebook;
        let $window = window.app.config.globalProperties.$window;

        // New
        if (e.altKey && e.code == 'KeyN') {
            $notebook.create();
        } 

        // Open
        else if (e.altKey && e.code == 'KeyO') {
            $notebook.openFile();
        } 

        if ($window.file.id && ! $window.file.isTrashed) {
            // Save
            if (e.altKey && e.code == 'KeyS') {
                $notebook.update();
            } 
        }

        // Exit
        else if (e.altKey && e.code == 'KeyQ') {
            $window.close();
        }
    }
}

export default Notebook;
