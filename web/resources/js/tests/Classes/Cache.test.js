import Cache from "../../Classes/Cache";

test('Cache set and get', () => {
    Cache.set('key', 'value');
    expect(Cache.get('key')).toBe('value');

    Cache.set('key', {name: 'Bob'});
    expect(Cache.get('key')).toEqual({name: 'Bob'});
});

test('Cache has', () => {
    Cache.set('key', 'value');
    expect(Cache.has('key')).toBeTruthy();

    Cache.set('key', 'value');
    expect(Cache.has('not-key')).toBeFalsy();
});

test('Cache remove', () => {
    Cache.set('key', 'value');
    expect(Cache.has('key')).toBeTruthy();
    Cache.remove('key');
    expect(Cache.has('key')).toBeFalsy();
});

test('Cache clear', () => {
    Cache.set('key1', 'value');
    Cache.set('key2', 'value');
    Cache.set('key3', 'value');

    expect(Cache.has('key1')).toBeTruthy();
    expect(Cache.has('key2')).toBeTruthy();
    expect(Cache.has('key3')).toBeTruthy();

    Cache.clear();

    expect(Cache.has('key1')).toBeFalsy();
    expect(Cache.has('key2')).toBeFalsy();
    expect(Cache.has('key3')).toBeFalsy();
});

test('Cache all', () => {
    Cache.set('key1', 'value');
    Cache.set('key2', 'value');
    Cache.set('key3', 'value');

    let cache = Cache.all();

    expect(cache).toEqual({
        key1: 'value', 
        key2: 'value', 
        key3: 'value', 
    });
});