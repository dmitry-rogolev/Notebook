import Cache from "@/Classes/Cache";
import Fuse from 'fuse.js'

class Notebook 
{
    _isInit = false;

    _defaultOptions = {
        path: '/api/notes',
        current: 'last', 
        autosaveInterval: 60000, 
    };

    _notes = [];

    _found = [];

    _note = {
        title: '', 
        text: '', 
    };

    _record = {
        title: '', 
        text: '', 
    };

    _search = '';

    _isOpenWindow = false;

    _autosave = false;

    _timerAutosave = null;

    get isInit() {
        return this._isInit;
    }

    get notes() {
        return this._notes;
    }

    get found() {
        return this._found;
    }

    get note() {
        return this._note;
    }

    get isOpenWindow() {
        return this._isOpenWindow;
    }

    get autosave() {
        return this._autosave;
    }

    set note(v) {
        if (v) {
            if (! v.title) {
                v.title = '';
            }

            if (! v.text) {
                v.text = '';
            }

            this._note = v;

            let record = Cache.get(v.id);

            if (! record) {
                record = v;
            } 

            let self = this;

            this._record = new Proxy(Object.assign({}, record), {
                set(target, property, value) {
                    if ((property === 'text' || property === 'title') && target[property] != value) {
                        if (self._note[property] == value) {
                            Cache.remove(target.id);
                            self._note.changed = false;
                        } else {
                            Cache.add(target.id, target);
                            self._note.changed = true;
                        }
                    }

                    target[property] = value;

                    return true;
                }, 
            });
        } else {
            this._note = {
                title: '', 
                text: '', 
            };
            this._record = {
                title: '', 
                text: '', 
            };
        }

        if (v) {
            if (this._notes) {
                let i = this._notes.findIndex((item) => {
                    return item.id == v.id;
                });
                if (i !== -1) {
                    this._notes[i] = v;
                } else {
                    this._notes.push(v);
                }
            }

            if (this._found) {
                let i = this._found.findIndex((item) => {
                    return item.id == v.id;
                });
                if (i !== -1) {
                    this._found[i] = v;
                } else {
                    this.find(this._search);
                }
            } 
        }
    }

    get record() {
        return this._record;
    }

    constructor(options = {}) {

    }

    init() {
        if (! this._isInit) {
            this._fetchNotes();

            this._autosave = this._getAutosaveFromLocalStorage();

            if (this._autosave) {
                this._onAutosave();
            }

            this._addKeyUpEventListener();

            this._isInit = true;

            return true;
        }
        return false;
    }

    dispose() {
        this._notes = [];
        this.note = null;
        this._isOpenWindow = false;
        this._offAutosave();
        this._removeKeyUpEventListener();
        this._isInit = false;
    }

    create(note = {}) {
        if (note && note.text) {
            note.text = this._cutForbiddenTags(note.text);
        }
        axios.post(this._defaultOptions.path, note).then((response) => {
            this.note = response.data.data;

            this._cacheNotes();

            window.app.config.globalProperties.$notifier.push({
                message: 'Created', 
                success: true, 
            });
        });
    }

    update() {
        if (this._isChanged()) {
            if (this._record.text) {
                this._record.text = this._cutForbiddenTags(this._record.text);
            }

            Cache.remove(this.record.id);

            this._updateOnServer();
        }
    }

    _updateInCache() {
        this._cacheNotes();
    }

    _updateOnServer() {
        axios.patch(this._defaultOptions.path + '/' + this._note.id, this._record).then((response) => {
            this.note = response.data.data;
            this._note.changed = false;

            this._updateInCache();

            window.app.config.globalProperties.$notifier.push({
                message: 'Saved', 
                success: true, 
            });
        });
    }

    _isChanged() {
        return this._note.changed;
    }

    delete() {
        this._deleteFromServer();

        this._deleteFromCache();

        this._deleteFromFound();

        this._defineNote();

        window.app.config.globalProperties.$notifier.push({
            message: 'Deleted', 
            success: true, 
        });
    }

    _deleteFromServer() {
        axios.delete(this._defaultOptions.path + '/' + this._note.id);
    }

    _deleteFromCache() {
        Cache.remove(this._note.id);

        this._notes = this._notes.filter((item) => {
            return item.id != this._note.id;
        });

        this._cacheNotes();
    }

    _deleteFromFound() {
        if (this._found && this._found.length) {
            this._found = this._found.filter((item) => {
                return item.id != this._note.id;
            });
        }
    }

    find(search) {
        if (search) {
            this._search = search;

            let notes = [];

            this.notes.forEach(v => {
                let n = Object.assign({}, v);
                n.text = this._cutTags(v.text);
                notes.push(n);
            });

            let fuse = new Fuse(notes, {
                keys: [
                    'title', 
                    'text', 
                ], 
                includeMatches: true, 
            });
            let found = fuse.search(search);

            this._found = found;

            
        } else {
            this._found = null;
        }
    }

    openWindow(note) {
        this.note = note;
        this._isOpenWindow = true;
    }

    closeWindow() {
        this.note = null;
        this._isOpenWindow = false;
    }

    toggleAutosave() {
        this._autosave = ! this._autosave;
        this._setAutosaveInLocalStorage(this._autosave);

        if (this._autosave) {
            this._onAutosave();
        } else {
            this._offAutosave();
        }
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
                        text: new TextDecoder().decode(arrayBuffer), 
                    });
                });
            }
        }
        input.click();
    }

    _onAutosave() {
        if (! this._timerAutosave) {
            this._timerAutosave = setInterval(() => this.update(), this._defaultOptions.autosaveInterval);

            window.app.config.globalProperties.$notifier.push({
                message: 'Auto save mod on', 
                success: true, 
            });
        }
    }

    _offAutosave() {
        if (this._timerAutosave) {
            clearInterval(this._timerAutosave);
            this._timerAutosave = null;

            window.app.config.globalProperties.$notifier.push({
                message: 'Auto save mod off', 
                success: true, 
            });
        }
    }

    _fetchNotes() {
        if (this._isCashed()) {
            this._fetchNotesFromCache();
        } else {
            this._fetchNotesFromServer();
        }
    }

    _isCashed() {
        return Cache.has('notes');
    }

    _fetchNotesFromCache() {
        this._notes = this._getNotesFromCache();
        this._setDateForUpdatedAtAndCreatedAtProperties();
        this._setChangedPropertyToNotes();
        this._defineNote();
        this._isOpenWindow = true;
    }

    _fetchNotesFromServer() {
        axios.get(this._defaultOptions.path).then((response) => {
            this._notes = response.data.data;
            this._setDateForUpdatedAtAndCreatedAtProperties();
            this._setChangedPropertyToNotes();
            this._cacheNotes();
            this._defineNote();
            this._isOpenWindow = true;
        });
    }

    _getNotesFromCache() {
        return Cache.get('notes');
    }

    _cacheNotes() {
        Cache.add('notes', this._notes);
    }

    _defineNote() {
        if (this._notes.length) {
            let index = 0;

            if (this._defaultOptions.current == 'last') {
                index = this._notes.length - 1;
            }

            this.note = this._notes[index];
        }
    }

    _setChangedPropertyToNotes() {
        for (let note of this._notes) {
            if (Cache.has(note.id)) {
                note.changed = true;
            } else {
                note.changed = false;
            }
        }
    }

    _setDateForUpdatedAtAndCreatedAtProperties() {
        for (let note of this._notes) {
            note.updated_at = new Date(note.updated_at);
            note.created_at = new Date(note.created_at);
        }
    }

    _cutForbiddenTags(str) {
        return str.replace(/<\/?[^>]+>/igm, (v) => { 
            return /<\/?(script|meta|body|iframe|head|html).*>/igm.test(v) ? '' : v;
        });
    }

    _cutTags(str) {
        return str.replace(/<\/?[^>]+>/igm, '');
    }

    _getAutosaveFromLocalStorage() {
        return localStorage.getItem('autosave') == 'true' ? true : false;
    }

    _setAutosaveInLocalStorage(autosave) {
        localStorage.setItem('autosave', autosave);
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
            $notebook.closeWindow();
        }
    }
}

export default Notebook;