import Note from "../../../Models/Note";
import Controller from "../../Controller";

class RestoreAllController extends Controller
{
    /**
     * 
     * @returns {void}
     */
    static async restore() {
        await Note.restoreTrash();
    }
}

export default RestoreAllController;
