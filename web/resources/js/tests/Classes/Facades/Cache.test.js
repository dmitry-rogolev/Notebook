import CacheFacade from '../../../Classes/Facades/Cache';

test('CacheFacade set and get', () => {
    CacheFacade.set('key', 'value');
    expect(CacheFacade.get('key')).toBe('value');

    CacheFacade.set('key', {name: 'Bob'});
    expect(CacheFacade.get('key')).toEqual({name: 'Bob'});
});

test('CacheFacade has', () => {
    CacheFacade.set('key', 'value');
    expect(CacheFacade.has('key')).toBeTruthy();

    CacheFacade.set('key', 'value');
    expect(CacheFacade.has('not-key')).toBeFalsy();
});

test('CacheFacade remove', () => {
    CacheFacade.set('key', 'value');
    expect(CacheFacade.has('key')).toBeTruthy();
    CacheFacade.remove('key');
    expect(CacheFacade.has('key')).toBeFalsy();
});

test('CacheFacade clear', () => {
    CacheFacade.set('key1', 'value');
    CacheFacade.set('key2', 'value');
    CacheFacade.set('key3', 'value');

    expect(CacheFacade.has('key1')).toBeTruthy();
    expect(CacheFacade.has('key2')).toBeTruthy();
    expect(CacheFacade.has('key3')).toBeTruthy();

    CacheFacade.clear();

    expect(CacheFacade.has('key1')).toBeFalsy();
    expect(CacheFacade.has('key2')).toBeFalsy();
    expect(CacheFacade.has('key3')).toBeFalsy();
});

test('CacheFacade all', () => {
    CacheFacade.set('key1', 'value');
    CacheFacade.set('key2', 'value');
    CacheFacade.set('key3', 'value');

    let cache = CacheFacade.all();

    expect(cache).toEqual({
        key1: 'value', 
        key2: 'value', 
        key3: 'value', 
    });
});