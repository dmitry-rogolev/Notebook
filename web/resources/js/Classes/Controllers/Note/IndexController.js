import Note from "../../Models/Note";
import Controller from "../Controller";

class IndexContoller extends Controller
{
    static async index() {
        let $sort = window.app.config.globalProperties.$sort;
        return $sort.sort(await Note.all()) ?? [];
    }
}

export default IndexContoller;
