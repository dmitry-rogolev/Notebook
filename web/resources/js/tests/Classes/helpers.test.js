import { isObject } from "@/Classes/helpers";

test('isObject test', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject('')).toBe(false);
});