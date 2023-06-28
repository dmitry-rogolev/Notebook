import Note from "../../../Models/Note";
import Controller from "../../Controller";

class DestroyController extends Controller
{
    static delete(note) {
        if (! (note instanceof Note)) {
            throw new Error('The "note" parameter must be of type "Classes/Models/Note".');
        }

        return note.forceDelete();
    }
}

export default DestroyController;