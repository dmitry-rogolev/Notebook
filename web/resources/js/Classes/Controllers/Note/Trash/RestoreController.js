import Note from "../../../Models/Note";
import Controller from "../../Controller";

class RestoreController extends Controller
{
    static restore(note) {
        if (! (note instanceof Note)) {
            throw new Error('The "note" parameter must be of type "Classes/Models/Note".');
        }

        return note.restore();
    }
}

export default RestoreController;