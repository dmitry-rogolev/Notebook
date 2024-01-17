import Controller from "../../../../Classes/Controllers/Controller";
import IndexContoller from "../../../../Classes/Controllers/Note/IndexController";

test('IndexContoller is Controller', () => {
    expect(new IndexContoller).toBeInstanceOf(Controller);
});

test('IndexContoller has method invoke', () => {
    expect(IndexContoller.invoke).not.toBeUndefined();
});
