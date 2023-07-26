import { AxiosError } from "axios";
import Database from "../../../Classes/Database/Database";
import DatabaseFacade from "../../../Classes/Facades/DatabaseFacade";
import ServerFacade from "../../../Classes/Facades/Server";
import Model from "../../../Classes/Model/Model";
import Note from "../../../Classes/Models/Note";
import { cache, clientDriver, config, csrfCookie, empty, isArray, isObject, notEmpty, serverDriver } from "../../../Classes/helpers";

async function auth() {
    await csrfCookie();

    await serverDriver().post('/login', {
        email: 'admin@admin.com', 
        password: 'password', 
    });
}

async function logout() {
    await serverDriver().post('/logout');
}

test('table property', () => {
    let model = new Model();
    expect(model.table).toBe('models');
    let note = new Note();
    expect(note.table).toBe('notes');

    expect(Model.table).toBeUndefined();
    expect(Note.table).toBeUndefined();
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
    let note = new Note();
    expect(note.getTable()).toBe('notes');

    expect(Model.getTable()).toBe('models');
    expect(Note.getTable()).toBe('notes');
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

test('hasAttribute', () => {
    let model = new Model(ServerFacade.store({title: 'title', text: 'text'}));
    expect(model.hasAttribute('title')).toBeTruthy();
    expect(model.hasAttribute('some_attribute')).toBeFalsy();
});

test('getOriginalAttribute', () => {
    let model = new Model(ServerFacade.store({title: 'title', text: 'text'}));
    model.setAttribute('title', 'new_title');

    expect(model.getAttribute('title')).toBe('new_title');
    expect(model.getOriginalAttribute('title')).toBe('title');
});

test('hasOriginalAttribute', () => {
    let model = new Model(ServerFacade.store({title: 'title', text: 'text'}));

    expect(model.hasOriginalAttribute('title')).toBeTruthy();
    expect(model.hasOriginalAttribute('some_attribute')).toBeFalsy();
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

test('fill', () => {
    let primary_key = config('model.primary_key', Model.DEFAULT_PRIMARY_KEY);
    let model = new Model(ServerFacade.store({title: 'title', text: 'text'}));

    model.fill({
        title: 'updated', 
        text: 'updated', 
    });

    expect(model.getAttribute('title')).toBe('updated');
    expect(model.getOriginalAttribute('title')).toBe('title');

    expect(model.getAttribute('text')).toBe('updated');
    expect(model.getOriginalAttribute('text')).toBe('text');

    expect(model.isDirty).toBeTruthy();

    let models = cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}${model.table}`);

    expect(isArray(models) && notEmpty(models)).toBeTruthy();

    let index = models.findIndex((v) => {
        if (isObject(v) && primary_key in v) {
            return v[primary_key] === model.primaryKey;
        }

        return false;
    });

    expect(index !== -1).toBeTruthy();

    model.fill({
        title: 'title', 
        text: 'text', 
    });

    expect(model.getAttribute('title')).toBe('title');
    expect(model.getOriginalAttribute('title')).toBe('title');

    expect(model.getAttribute('text')).toBe('text');
    expect(model.getOriginalAttribute('text')).toBe('text');

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

test('proxy', () => {
    let model = Model.proxy(new Model(ServerFacade.store({title: 'title', text: 'text'}))); 

    expect(model.isDirty).toBeFalsy();
    expect(model.title).toBe('title');

    model.getAttribute('title');

    model.title = 'updated';

    expect(model.title).toBe('updated');
    expect(model.isDirty).toBeTruthy();

    model._isDirty = false;

    expect(model._isDirty).toBeFalsy();
});

it('all', async () => {
    clientDriver().post(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/models`, [
        {title: 'title', text: 'text'}, 
        {title: 'title', text: 'text'}, 
        {title: 'title', text: 'text'}, 
    ]);

    let models = await Model.all();

    expect(isArray(models)).toBeTruthy();
    expect(models).toHaveLength(3);
    expect(models[0]).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY));
    expect(models[0]).toHaveProperty('title', 'title');
    expect(models[0]).toHaveProperty('text', 'text');
    expect(models[0]).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(models[0]).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(models[0]).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), null);

    await auth();

    await serverDriver().delete(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`);
    await serverDriver().delete(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${config('model.trashed.prefix')}notes`);

    await serverDriver().post(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, {title: 'title', text: 'text'});
    await serverDriver().post(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, {title: 'title', text: 'text'});
    await serverDriver().post(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, {title: 'title', text: 'text'});

    models = await Note.all();

    expect(isArray(models)).toBeTruthy();
    expect(models).toHaveLength(3);
    expect(models[0]).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY));
    expect(models[0]).toHaveProperty('title', 'title');
    expect(models[0]).toHaveProperty('text', 'text');
    expect(models[0]).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(models[0]).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(models[0]).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), null);

    models.forEach(async (model) => {
        await serverDriver().delete(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${config('model.trashed.prefix', Model.DEFAULT_TRASHED_PREFIX)}notes/${model[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
    });

    await logout();
}, 100000);

it('create', async () => {
    let note = await Note.create({
        title: 'title', 
        text: 'text', 
    });

    expect(note).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY));
    expect(note).toHaveProperty('title', 'title');
    expect(note).toHaveProperty('text', 'text');
    expect(note).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(note).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(note).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), null);

    await auth();

    note = await Note.create({
        title: 'title', 
        text: 'text', 
    });

    expect(note).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY));
    expect(note).toHaveProperty('title', 'title');
    expect(note).toHaveProperty('text', 'text');
    expect(note).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(note).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(note).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), null);

    await serverDriver().delete(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${config('model.trashed.prefix', Model.DEFAULT_TRASHED_PREFIX)}notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);

    await logout();
}, 50000);

it('save', async () => {
    expect.assertions(9);

    let note = await Note.create({
        title: 'title', 
        text: 'text', 
    });

    note.title = 'updated';
    note.text = 'updated';

    expect(note.isDirty).toBeTruthy();

    await note.save();

    expect(note.isDirty).toBeFalsy();
    expect(note.getOriginalAttribute('title')).toBe('updated');
    expect(note.getOriginalAttribute('text')).toBe('updated');

    let notes = cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}${note.table}`);

    expect(isArray(notes) && empty(notes)).toBeTruthy();

    await auth();

    note = await Note.create({
        title: 'title', 
        text: 'text', 
    });

    note.title = 'updated';
    note.text = 'updated';

    expect(note.isDirty).toBeTruthy();

    await note.save();

    expect(note.isDirty).toBeFalsy();
    expect(note.getOriginalAttribute('title')).toBe('updated');
    expect(note.getOriginalAttribute('text')).toBe('updated');

    await logout();
}, 50000);

it('delete', async () => {
    expect.assertions(6);

    let note = await Note.create({
        title: 'title', 
        text: 'text', 
    });

    await note.delete();

    let trashed = (await DatabaseFacade.get(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${config('model.trashed.prefix', Model.DEFAULT_TRASHED_PREFIX)}notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`))?.data?.data;

    expect(trashed).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY), note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]);
    expect(trashed).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT));
    expect(trashed[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]).not.toBeNull();

    await auth();

    note = await Note.create({
        title: 'title', 
        text: 'text', 
    });

    await note.delete();

    trashed = (await DatabaseFacade.get(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${config('model.trashed.prefix', Model.DEFAULT_TRASHED_PREFIX)}notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`))?.data?.data;

    expect(trashed[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]).toBe(note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]);
    expect(trashed).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT));
    expect(trashed[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]).not.toBeNull();

    await logout();
}, 50000);

it('forceDelete', async () => {
    expect.assertions(2);

    let note = await Note.create({
        title: 'title', 
        text: 'text', 
    });

    await note.forceDelete();

    expect((await DatabaseFacade.get(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`))?.data?.data).toBeNull();

    await auth();

    note = await Note.create({
        title: 'title', 
        text: 'text', 
    });

    await note.forceDelete();

    try {
        await DatabaseFacade.get(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${config('model.trashed.prefix', Model.DEFAULT_TRASHED_PREFIX)}notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
    } catch (e) {
        expect(e).toBeInstanceOf(AxiosError);
    }

    await logout();
}, 50000);