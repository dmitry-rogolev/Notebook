import NotTypeError from "../../../Errors/NotTypeError";
import Note from "../../../Models/Note";
import Controller from "../../Controller";

class DeleteController extends Controller
{
    static async delete(note) {
        if (! (note instanceof Note)) {
            throw new NotTypeError('note', 'Classes/Models/Note');
        }

        await note.forceDelete();
    }
}

export default DeleteController;
