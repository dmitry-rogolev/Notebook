class Cache
{
    static add(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key, defaultValue = null) {
        let value = localStorage.getItem(key);

        if (value === null) {
            return defaultValue;
        }

        if (! value) {
            return value;
        }

        return JSON.parse(localStorage.getItem(key));
    }

    static has(key) {
        let value = localStorage.getItem(key);

        if (value === null) {
            return false;
        }

        return true;
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

export default Cache;
