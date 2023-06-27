import Note from "../../Models/Note";
import Controller from "../Controller";
import { cutForbiddenTags } from '@/helpers';

class StoreController extends Controller
{
    static store(note = {}) {
        if (typeof note !== 'object') {
            throw new Error('The "note" parameter must be an object.');
        }

        if (note.text) {
            note.text = cutForbiddenTags(note.text);
        }

        if (! ('title' in note)) {
            note.title = '';
        }

        if (! ('text' in note)) {
            note.text = '';
        }

        return Note.create(note);
    }
}

export default StoreController;
