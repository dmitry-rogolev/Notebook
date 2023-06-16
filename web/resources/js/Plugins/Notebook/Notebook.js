class Notebook 
{
    _isInit = false;

    _defaultOptions = {
        path: '/api/notes',
        current: 'last', 
    };

    _notes = [];

    _found = [];

    _note = {
        title: '', 
        text: '', 
    };

    _search = '';

    _isOpenWindow = false;

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

    set note(v) {
        if (v) {
            this._note = v;
        } else {
            this._note = {
                title: '', 
                text: '', 
            };
        }

        if (v) {
            if (! v.title) {
                this._note.title = '';
            }

            if (! v.text) {
                this._note.text = '';
            }

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

    constructor(options = {}) {

    }

    init() {
        if (! this._isInit) {
            this._fetchNotes();

            this._isInit = true;

            return true;
        }
        return false;
    }

    dispose() {
        this._notes = [];
        this._note = {
            title: '', 
            text: '', 
        };
        this._isOpenWindow = false;
        this._isInit = false;
    }

    create(note = {}) {
        if (note && note.text) {
            note.text = this._cutForbiddenTags(note.text);
        }
        axios.post(this._defaultOptions.path, note).then((response) => {
            this.note = response.data.data;

            window.app.config.globalProperties.$notifier.push({
                message: 'Created', 
                success: true, 
            });
        });
    }

    update(note) {
        if (! note) {
            note = {
                title: '', 
                text: '', 
            };
        }

        if (this._note.title != note.title || this._note.text != note.text) {
            if (note && note.text) {
                note.text = this._cutForbiddenTags(note.text);
            }
            axios.patch(this._defaultOptions.path + '/' + this._note.id, note).then((response) => {
                this.note = response.data.data;

                window.app.config.globalProperties.$notifier.push({
                    message: 'Saved', 
                    success: true, 
                });
            });
        }
    }

    delete() {
        axios.delete(this._defaultOptions.path + '/' + this._note.id);

        this._notes = this._notes.filter((item) => {
            return item.id != this._note.id;
        });

        this._defineNote();

        window.app.config.globalProperties.$notifier.push({
            message: 'Deleted', 
            success: true, 
        });

        if (this._found && this._found.length) {
            this._found = this._found.filter((item) => {
                return item.id != this._note.id;
            });
        }
    }

    find(search) {
        if (search) {
            this._search = search;
            axios.get(this._defaultOptions.path + '?search=' + search).then((response) => {
                this._found = response.data.data;
            });
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

    _fetchNotes() {
        axios.get(this._defaultOptions.path).then((response) => {
            this._notes = response.data.data;

            this._defineNote();

            this._isOpenWindow = true;
        });
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

    _cutForbiddenTags(str) {
        return str.replace(/<\/?[^>]+>/igm, (v) => { 
            return /<\/?(script|meta|body|iframe|head|html).*>/igm.test(v) ? '' : v;
        });
    }
}

export default Notebook;