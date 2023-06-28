import Note from "../../../Models/Note";
import Controller from "../../Controller";

class DeleteAllController extends Controller
{
    static async truncate() {
        return await Note.truncateTrash();
    }
}

export default DeleteAllController;
