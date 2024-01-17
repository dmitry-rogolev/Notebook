import Note from "../../Models/Note";
import { plugin } from "../../helpers";
import Controller from "../Controller";

class IndexContoller extends Controller
{
    /**
     * 
     * @returns {Array}
     */
    static async invoke() {
        return plugin('sort').sort(await Note.all());
    }
}

export default IndexContoller;
