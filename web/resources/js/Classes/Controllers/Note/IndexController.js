import Note from "../../Models/Note";
import Controller from "../Controller";

class IndexContoller extends Controller
{
    static index() {
        return Note.all();
    }
}

export default IndexContoller;
