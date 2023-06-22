class DriverInterface
{
    get(key, value = null) {
        throw new Error('It\'s abstract method.');
    }

    set(key, value) {
        throw new Error('It\'s abstract method.');
    }

    has(key) {
        throw new Error('It\'s abstract method.');
    }

    remove(key) {
        throw new Error('It\'s abstract method.');
    }

    clear() {
        throw new Error('It\'s abstract method.');
    }
}

export default DriverInterface;