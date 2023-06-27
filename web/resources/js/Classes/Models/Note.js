import Model from "../Model/Model";

class Note extends Model
{
    static _table = 'notes';

    _defaults = {
        title: '', 
        text: '', 
    }

    constructor(originals = {}) {
        super(originals);
    }
}

export default Note;
