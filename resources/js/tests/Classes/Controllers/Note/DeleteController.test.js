import Controller from "../../../../Classes/Controllers/Controller";
import DeleteController from "../../../../Classes/Controllers/Note/DeleteController";

test('DeleteController is Controller', () => {
    expect(new DeleteController).toBeInstanceOf(Controller);
});

test('DeleteController has method invoke', () => {
    expect(DeleteController.invoke).not.toBeUndefined();
});
