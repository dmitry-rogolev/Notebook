import FactoryInterface from "@/Interfaces/FactoryInterface";
import Url from "./Url";
import UrlBuilder from "./UrlBuilder";

class UrlFactory extends FactoryInterface
{
    /**
     * 
     * @returns {Url}
     */
    make() {
        return new Url();
    }

    /**
     * 
     * @returns {UrlBuilder}
     */
    makeBuilder() {
        return new UrlBuilder();
    }
}

export default UrlFactory;