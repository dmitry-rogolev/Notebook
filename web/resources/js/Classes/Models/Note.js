import Model from "../Model/Model";

class Note extends Model
{
    static _table = 'notes';

    constructor(originals = {}) {
        super(originals);
    }
}

export default Note;
