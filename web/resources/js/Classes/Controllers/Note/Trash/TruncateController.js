import Note from "../../../Models/Note";
import Controller from "../../Controller";

class TruncateController extends Controller
{
    /**
     * 
     * @returns {void}
     */
    static async invoke() {
        await Note.forceTruncate();
    }
}

export default TruncateController;
