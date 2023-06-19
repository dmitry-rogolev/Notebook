class Sort
{
    _column;
    _direction;

    _defaultOptions = {
        columns: [
            'title', 
            'updated_at', 
        ], 
        directions: [
            'desc', 
            'asc', 
        ], 
    };

    get column() {
        return this._column;
    }

    set column(v) {
        if (this._defaultOptions.columns.includes(v)) {
            this._column = v;
        }
    }

    get direction() {
        return this._direction;
    }

    set direction(v) {
        if (this._defaultOptions.directions.includes(v)) {
            this._direction = v;
        }
    }

    constructor(column = 'updated_at', direction = 'desc') {
        this.column = column;
        this.direction = direction;
    }

    sort(array) {
        if (Array.isArray(array)) {
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

        return array;
    }

    toggleDirection() {
        if (this._direction == this._defaultOptions.directions[0]) {
            this._direction = this._defaultOptions.directions[1];
        } else {
            this._direction = this._defaultOptions.directions[0];
        }
    }
}

export default Sort;