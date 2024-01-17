import Controller from "../../../../Classes/Controllers/Controller";
import StoreController from "../../../../Classes/Controllers/Note/StoreController";

test('StoreController is Controller', () => {
    expect(new StoreController).toBeInstanceOf(Controller);
});

test('StoreController has method invoke', () => {
    expect(StoreController.invoke).not.toBeUndefined();
});
