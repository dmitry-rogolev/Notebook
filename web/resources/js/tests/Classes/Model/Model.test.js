import ServerFacade from "../../../Classes/Facades/Server";
import Model from "../../../Classes/Model/Model";
import { cache, config, isArray, isObject, notEmpty } from "../../../Classes/helpers";

test('table property', () => {
    let model = new Model();
    expect(model.table).toBe('models');
});

test('key property', () => {
    let model = new Model({id: 1});
    expect(model.key).toBe(1);
    expect(model.primaryKey).toBe(1);
});

test('isDirty property', () => {
    let model = new Model({id: 1});
    expect(model.isDirty).toBeFalsy();
    expect(model.isClean).toBeTruthy();
    
    model.setAttribute('id', 2);
    expect(model.isDirty).toBeTruthy();
    expect(model.isClean).toBeFalsy();
});

test('isTrashed property', () => {
    let model = new Model(ServerFacade.store({title: 'title', text: 'text'}));
    expect(model.isTrashed).toBeFalsy();

    model = new Model(ServerFacade.delete(ServerFacade.store({title: 'title', text: 'text'})));
    expect(model.isTrashed).toBeTruthy();
});

test('getTable', () => {
    let model = new Model();
    expect(model.getTable()).toBe('models');
});

test('getPrimaryKey', () => {
    let model = new Model({id: 1});
    expect(model.getPrimaryKey()).toBe(1);
});

test('dirty', () => {
    let model = new Model({id: 1});
    expect(model.dirty()).toBeFalsy();
    
    model.setAttribute('id', 2);
    expect(model.dirty()).toBeTruthy();
});

test('trashed', () => {
    let model = new Model(ServerFacade.store({title: 'title', text: 'text'}));
    expect(model.trashed()).toBeFalsy();

    model = new Model(ServerFacade.delete(ServerFacade.store({title: 'title', text: 'text'})));
    expect(model.trashed()).toBeTruthy();
});

test('getAttribute', () => {
    let model = new Model(ServerFacade.store({title: 'title', text: 'text'}));
    expect(model.getAttribute('title')).toBe('title');
    expect(model.getAttribute('some_attribute')).toBeUndefined();
});

test('getOriginalAttribute', () => {
    let model = new Model(ServerFacade.store({title: 'title', text: 'text'}));
    model.setAttribute('title', 'new_title');

    expect(model.getAttribute('title')).toBe('new_title');
    expect(model.getOriginalAttribute('title')).toBe('title');
});

test('setAttribute', () => {
    let model = new Model(ServerFacade.store({title: 'title', text: 'text'}));

    model.setAttribute('some_attribute', 'value');
    expect(model.getAttribute('some_attribute')).toBeUndefined();

    model.setAttribute('title', 'new_title');
    expect(model.getAttribute('title')).toBe('new_title');
    expect(model.isDirty).toBeTruthy();

    let primary_key = config('model.primary_key', Model.DEFAULT_PRIMARY_KEY);
    let models = cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}${model.table}`);

    expect(isArray(models) && notEmpty(models)).toBeTruthy();

    let index = models.findIndex((v) => {
        if (isObject(v) && primary_key in v) {
            return v[primary_key] === model.primaryKey;
        }

        return false;
    });

    expect(index !== -1).toBeTruthy();

    model.setAttribute('title', 'title');
    expect(model.getAttribute('title')).toBe('title');
    expect(model.isDirty).toBeFalsy();

    models = cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}${model.table}`);

    expect(isArray(models) && notEmpty(models)).toBeTruthy();

    index = models.findIndex((v) => {
        if (isObject(v) && primary_key in v) {
            return v[primary_key] === model.primaryKey;
        }

        return false;
    });

    expect(index === -1).toBeTruthy();
});

test('_getAttributes', () => {
    let originals = ServerFacade.store({title: 'title', text: 'text'});
    let attributes = Object.assign({}, originals);
    attributes.title = 'new_title';
    cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}models`, [attributes]);

    let model = new Model(attributes);

    expect(model.isDirty).toBeTruthy();
});