import Controller from "../../../../Classes/Controllers/Controller";
import TruncateController from "../../../../Classes/Controllers/Note/TruncateController";

test('TruncateController is Controller', () => {
    expect(new TruncateController).toBeInstanceOf(Controller);
});

test('TruncateController has method invoke', () => {
    expect(TruncateController.invoke).not.toBeUndefined();
});
