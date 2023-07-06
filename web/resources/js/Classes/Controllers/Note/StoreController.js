import NotObjectError from "../../Errors/NotObjectError";
import Note from "../../Models/Note";
import { isObject } from "../../helpers";
import Controller from "../Controller";
import { cutForbiddenTags } from '@/helpers';

class StoreController extends Controller
{
    /**
     * 
     * @param {Object} note 
     * @returns {Object}
     */
    static store(note = {}) {
        if (! isObject(note)) {
            throw new NotObjectError('note');
        }

        if (note.text) {
            note.text = cutForbiddenTags(note.text);
        }

        return Note.create(note);
    }
}

export default StoreController;
