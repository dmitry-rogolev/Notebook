import NotTypeError from "../../Classes/Errors/NotTypeError";
import { config, isArray } from "../../Classes/helpers";

class Sort
{
    static DEFAULT_COLUMNS = [
        "title", 
        "updated_at"
    ];
    static DEFAULT_DIRECTIONS = [
        "desc", 
        "asc"
    ];

    _column = '';
    _direction = '';

    /**
     * @property {String}
     */
    get column() {
        return this._column;
    }

    set column(v) {
        if (config('sort.columns', Sort.DEFAULT_COLUMNS).includes(v)) {
            this._column = v;
        }
    }

    /**
     * @property {String}
     */
    get direction() {
        return this._direction;
    }

    set direction(v) {
        if (config('sort.directions', Sort.DEFAULT_DIRECTIONS).includes(v)) {
            this._direction = v;
        }
    }

    /**
     * 
     * @param {Array} array 
     * @returns {void}
     */
    sort(array) {
        if (! isArray(array)) {
            throw new NotTypeError('array', 'Array');
        }

        array.sort((a, b) => {
            if (this._direction == 'asc') {
                if (a[this._column] > b[this._column]) {
                    return 1;
                } else if (a[this._column] < b[this._column]) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                if (a[this._column] > b[this._column]) {
                    return -1;
                } else if (a[this._column] < b[this._column]) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    }

    /**
     * @returns {void}
     */
    toggleDirection() {
        let directions = config('sort.directions', Sort.DEFAULT_DIRECTIONS);

        if (this._direction === directions[0]) {
            this._direction = directions[1];
        } else {
            this._direction = directions[0];
        }
    }
}

export default Sort;