import Cache from "../../Classes/Cache";
import Configuration from "../../Classes/Configuration";
import DeleteAllController from "../../Classes/Controllers/Note/DeleteAllController";
import DestroyController from "../../Classes/Controllers/Note/DestroyController";
import IndexContoller from "../../Classes/Controllers/Note/IndexController";
import StoreController from "../../Classes/Controllers/Note/StoreController";
import UpdateController from "../../Classes/Controllers/Note/UpdateController";
import Fuse from 'fuse.js'

class Notebook
{
    _configuration = null;
    _$window = null;
    _$notifier = null;

    _isInit = false;
    _autosave = false;
    _timerAutosave = 0;
    _search = '';

    _notes = [];
    _found = [];

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

    constructor() {
        this._configuration = Configuration.getInstance();
        this._$window = window.app.config.globalProperties.$window;
        this._$notifier = window.app.config.globalProperties.$notifier;
        this._$window.setDefaultFile({
            title: '', 
            text: '', 
        });
    }

    init() {
        if (! this._isInit) {
            this._getNotes().then((notes) => {
                this._notes = notes;

                this._openWindow();

                this._autosave = this._getAutosave();

                this._addKeyUpEventListener();

                this._isInit = false;
            });
        }
    }

    dispose() {
        if (this._isInit) {
            this._closeWindow();

            this._notes = [];
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
                message: 'Created', 
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
                    message: 'Saved', 
                    success: true, 
                });
            });
        }
    }

    delete() {
        let note = this._$window.file;
        DestroyController.destroy(note).then(() => {
            this._notes.splice(this._notes.findIndex((v) => v.id === note.id), 1);
            this.find(this._search);
            this._openWindow();
            this._$notifier.push({
                message: 'Deleted', 
                success: true, 
            });
        });
    }

    clear() {
        DeleteAllController.truncate().then(() => {
            this._notes = [];
            this._closeWindow();
            this._$notifier.push({
                message: 'Cleared', 
                success: true, 
            });
        });
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

    _getNotes() {
        return IndexContoller.index();
    }

    _openWindow() {
        if (this._configuration.getIsOpenWindowAfterInit() && this._notes.length) {
            let index = 0;

            if (this._configuration.getOpenItemAfterInit() === 'last') {
                index = this._notes.length - 1;
            }

            this._$window.open(this._notes[index]);
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
        Cache.add(this._configuration.getNotebookCachePrefix() + 'autosave', autosave);
    }

    _onAutosave() {
        if (! this._timerAutosave) {
            this._timerAutosave = setInterval(() => this.update(), this._configuration.getAutosaveInterval());

            this._$notifier.push({
                message: 'Auto save mod on', 
                success: true, 
            });
        }
    }

    _offAutosave() {
        if (this._timerAutosave) {
            clearInterval(this._timerAutosave);
            this._timerAutosave = null;

            this._$notifier.push({
                message: 'Auto save mod off', 
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

        // Save
        if (e.altKey && e.code == 'KeyS') {
            $notebook.update();
        } 

        // Exit
        else if (e.altKey && e.code == 'KeyQ') {
            $window.close();
        }
    }
}

export default Notebook;
