import NotTypeError from "../../Errors/NotTypeError";
import Note from "../../Models/Note";
import Controller from "../Controller";

class UpdateController extends Controller
{
    /**
     * 
     * @param {Object} note 
     * @returns {void}
     */
    static async invoke(note) {
        if (! (note instanceof Note)) {
            throw new NotTypeError('note', 'Classes/Models/Note');
        }

        await note.save();
    }
}

export default UpdateController;
