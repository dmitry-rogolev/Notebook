import Model from "../Model/Model";

class Note extends Model
{
    static _table = 'notes';

    _defaults = {
        id: 0, 
        title: '', 
        text: '', 
    }

    constructor(originals = {}) {
        super(originals);
    }
}

export default Note;
