import Note from "../../../Models/Note";
import Controller from "../../Controller";

class DeleteAllController extends Controller
{
    /**
     * 
     * @returns {void}
     */
    static async truncate() {
        await Note.truncateTrash();
    }
}

export default DeleteAllController;
