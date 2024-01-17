import Controller from "../../../../../Classes/Controllers/Controller";
import RestoreController from "../../../../../Classes/Controllers/Note/Trash/RestoreController";

test('RestoreController is Controller', () => {
    expect(new RestoreController).toBeInstanceOf(Controller);
});

test('RestoreController has method invoke', () => {
    expect(RestoreController.invoke).not.toBeUndefined();
});
