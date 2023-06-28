import Note from "../../../Models/Note";
import Controller from "../../Controller";

class RestoreAllController extends Controller
{
    static async restore() {
        return await Note.restoreTrash();
    }
}

export default RestoreAllController;
