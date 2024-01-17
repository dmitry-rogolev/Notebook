class FactoryInterface
{
    make() {
        throw new Error('It\'s abstract method.');
    }
}

export default FactoryInterface;