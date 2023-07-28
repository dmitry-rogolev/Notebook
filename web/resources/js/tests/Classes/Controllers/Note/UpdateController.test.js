import Controller from "../../../../Classes/Controllers/Controller";
import UpdateController from "../../../../Classes/Controllers/Note/UpdateController";

test('UpdateController is Controller', () => {
    expect(new UpdateController).toBeInstanceOf(Controller);
});

test('UpdateController has method invoke', () => {
    expect(UpdateController.invoke).not.toBeUndefined();
});
