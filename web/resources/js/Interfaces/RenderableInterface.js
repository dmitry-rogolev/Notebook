class RenderableInterface
{
    /**
     * @returns {String}
     */
    render() {
        throw new Error('It\'s abstract method');
    }
}

export default RenderableInterface;