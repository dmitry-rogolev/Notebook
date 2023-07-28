import Controller from "../../../../../Classes/Controllers/Controller";
import RevertController from "../../../../../Classes/Controllers/Note/Trash/RevertController";

test('RevertController is Controller', () => {
    expect(new RevertController).toBeInstanceOf(Controller);
});

test('RevertController has method invoke', () => {
    expect(RevertController.invoke).not.toBeUndefined();
});
