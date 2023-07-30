import Fuse from 'fuse.js'
import { cache, config, createElement, inertia, isAuth, isBoolean, isNull, isObject, isString, notEmpty, plugin, router, store, t } from "../../Classes/helpers";
import IndexController from "../../Classes/Controllers/Note/IndexController";
import TrashIndexController from "../../Classes/Controllers/Note/Trash/IndexController";
import Window from "../Window/Window";
import StoreController from "../../Classes/Controllers/Note/StoreController";
import NotTypeError from "../../Classes/Errors/NotTypeError";
import UpdateController from "../../Classes/Controllers/Note/UpdateController";
import DeleteController from "../../Classes/Controllers/Note/DeleteController";
import TrashDeleteController from "../../Classes/Controllers/Note/Trash/DeleteController";
import TruncateController from "../../Classes/Controllers/Note/TruncateController";
import TrashTruncateController from "../../Classes/Controllers/Note/Trash/TruncateController";
import RestoreController from "../../Classes/Controllers/Note/Trash/RestoreController";
import RevertController from "../../Classes/Controllers/Note/Trash/RevertController";

class Notebook
{
    static DEFAULT_CACHE_PREFIX = '__cache_notebook_';
    static DEFAULT_AUTOSAVE = false;
    static DEFAULT_AUTOSAVE_INTERVAL = 60000;

    _isInit = false;
    _autosave = false;
    _timerAutosave = 0;
    _search = '';

    _notes = [];
    _trashNotes = [];
    _found = [];

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
        return this._trashNotes ?? [];
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
    get found() {
        return this._found ?? [];
    }

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
    openWindow(trashNotes = false) {
        if (config('window.open', Window.DEFAULT_OPEN)) {
            if (trashNotes) {
                if (this.trashNotes.length) {
                    plugin('window').open(this.trashNotes[0]);
                } else if (this.notes.length) {
                    plugin('window').open(this.notes[0]);
                } else {
                    this.closeWindow();
                }
            } else {
                if (this.notes.length) {
                    plugin('window').open(this.notes[0]);
                } else if (this.trashNotes.length) {
                    plugin('window').open(this.trashNotes[0]);
                } else {
                    this.closeWindow();
                }
            }
        }
    }

    /**
     * @returns {void}
     */
    closeWindow() {
        plugin('window').close();
    }

    /**
     * 
     * @param {Object} note 
     */
    async create(note = {}) {
        note = await StoreController.invoke(note);

        if (isObject(note)) {
            this._notes.push(note);
            plugin('window').open(note);
            plugin('notifier').push({
                message: t('Created'), 
                success: true, 
            });
        }
    } 

    /**
     * @returns {void}
     */
    openFile() {
        let input = createElement('input');
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

    /**
     * @returns {void}
     */
    async update() {
        if (plugin('window').file.isDirty) {
            await UpdateController.invoke(plugin('window').file);
            plugin('notifier').push({
                message: t('Saved'), 
                success: true, 
            });
        }
    }

    /**
     * @returns {void}
     */
    async delete() {
        await DeleteController.invoke(plugin('window').file);

        this._notes = await this._fetchNotes();
        this._trashNotes = await this._fetchTrashNotes();
        this.find(this._search);

        this.openWindow();

        plugin('notifier').push({
            message: t('Deleted'), 
            success: true, 
        });
    }

    /**
     * @returns {void}
     */
    async forceDelete() {
        if (plugin('window').file.isTrashed) {
            await TrashDeleteController.invoke(plugin('window').file);
            this._trashNotes = await this._fetchTrashNotes();
            this.openWindow(true);
            plugin('notifier').push({
                message: t('Deleted'), 
                success: true, 
            });
        }
    }

    /**
     * @returns {void}
     */
    async truncate() {
        if (this._notes.length) {
            await TruncateController.invoke();
            this._notes = [];
            this._trashNotes = await this._fetchTrashNotes();
            this.openWindow(true);
            plugin('notifier').push({
                message: t('Cleared'), 
                success: true, 
            });
        }
    }

    /**
     * @returns {void}
     */
    async forceTruncate() {
        if (this._trashNotes.length) {
            await TrashTruncateController.invoke();
            this._trashNotes = [];
            this.openWindow();
            plugin('notifier').push({
                message: t('Cleared'), 
                success: true, 
            });
        }
    }

    /**
     * @returns {void}
     */
    async restore() {
        if (plugin('window').file.isTrashed) {
            await RestoreController.invoke(plugin('window').file);
            this._notes = await this._fetchNotes();
            this._trashNotes = await this._fetchTrashNotes();
            plugin('notifier').push({
                message: t('Restored'), 
                success: true, 
            });
        }
    }

    /**
     * @returns {void}
     */
    async revert() {
        if (this._trashNotes.length) {
            await RevertController.invoke();
            this._trashNotes = [];
            this._notes = await this._fetchNotes();
            this.openWindow();
            plugin('notifier').push({
                message: t('Restored'), 
                success: true, 
            });
        }
    }

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

    /**
     * 
     * @param {String} search 
     * @returns {void}
     */
    find(search) {
        if (! isString(search)) {
            throw new NotTypeError('search', 'string');
        }

        if (notEmpty(search)) {
            this._search = search;

            let fuse = new Fuse(this._notes, {
                keys: ['title', 'text'], 
                includeMatches: true, 
            });

            this._found = fuse.search(search);
        } else {
            this._found = null;
        }
    }

    /**
     * 
     * @returns {void}
     */
    async logout() {
        if (await isAuth()) {
            router().post(route('logout'));
            this.closeWindow();
            this._notes = await this._fetchNotes();
            this._trashNotes = await this._fetchTrashNotes();
        }
    }

    /**
     * 
     * @param {String} str 
     * @returns {String}
     */
    _toHtml(str) {
        if (! isString(str)) {
            throw new NotTypeError('str', 'string');
        }

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
