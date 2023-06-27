import Model from "../Model/Model";

class Note extends Model
{
    static _table = 'notes';

    static _defaults = {
        title: '', 
        text: '', 
    }

    constructor(originals = {}) {
        super(originals);
    }
}

export default Note;
