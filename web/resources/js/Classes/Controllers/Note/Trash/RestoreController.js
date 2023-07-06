import NotTypeError from "../../../Errors/NotTypeError";
import Note from "../../../Models/Note";
import Controller from "../../Controller";

class RestoreController extends Controller
{
    static async restore(note) {
        if (! (note instanceof Note)) {
            throw new NotTypeError('note', 'Classes/Models/Note');
        }

        await note.restore();
    }
}

export default RestoreController;