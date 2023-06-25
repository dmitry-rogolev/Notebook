import Note from "../../Models/Note";
import Controller from "../Controller";

class IndexContoller extends Controller
{
    static async index() {
        return await Note.all() ?? [];
    }
}

export default IndexContoller;
