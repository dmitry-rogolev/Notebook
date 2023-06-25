import Note from "../../Models/Note";
import Controller from "../Controller";

class UpdateController extends Controller
{
    static async update(note) {
        if (! (note instanceof Note)) {
            throw new Error('The "note" parameter must be of type "Classes/Models/Note".');
        }

        await note.save();
    }
}

export default UpdateController;
