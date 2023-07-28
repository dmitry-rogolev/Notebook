import NotTypeError from "../../Errors/NotTypeError";
import Note from "../../Models/Note";
import { isObject } from "../../helpers";
import Controller from "../Controller";
import { cutForbiddenTags } from '../../helpers';

class StoreController extends Controller
{
    /**
     * 
     * @param {Object} note 
     * @returns {Object}
     */
    static invoke(note = {}) {
        if (! isObject(note)) {
            throw new NotTypeError('note', 'object');
        }

        if (note.text) {
            note.text = cutForbiddenTags(note.text);
        }

        return Note.create(note);
    }
}

export default StoreController;
