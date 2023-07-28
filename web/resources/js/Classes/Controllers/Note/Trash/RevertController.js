import Note from "../../../Models/Note";
import Controller from "../../Controller";

class RevertController extends Controller
{
    /**
     * 
     * @returns {void}
     */
    static async invoke() {
        await Note.revert();
    }
}

export default RevertController;
