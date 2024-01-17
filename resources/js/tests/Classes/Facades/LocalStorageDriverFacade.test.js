import Database from "../../../Classes/Database/Database";
import LocalStorageDriverFacade from "../../../Classes/Facades/LocalStorageDriverFacade";
import Model from "../../../Classes/Model/Model";
import { cache, config } from "../../../Classes/helpers";

test('get', () => {
    cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + 'key', 'value');
    expect(LocalStorageDriverFacade.get('key').data.data).toBe('value');

    cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + 'key', {id: 1, name: 'Bob'});
    expect(LocalStorageDriverFacade.get('key').data.data).toEqual({id: 1, name: 'Bob'});

    cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + 'key', [{id: 1, name: 'Bob'}, {id: 2, name: 'Boris'}]);
    expect(LocalStorageDriverFacade.get('key').data.data).toEqual([{id: 1, name: 'Bob'}, {id: 2, name: 'Boris'}]);

    let users = [
        {
            id: 1, 
            name: 'Bob', 
            roles: [
                {
                    id: 1, 
                    name: 'Admin', 
                }, 
            ], 
        }, 
        {
            id: 2, 
            name: 'Boris', 
            roles: [
                {
                    id: 1, 
                    name: 'Moderator', 
                }, 
            ], 
        }, 
        {
            id: 3, 
            name: 'John', 
            roles: [
                {
                    id: 1, 
                    name: 'User', 
                }, 
            ], 
        }, 
    ];

    cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + 'users', users);
    expect(LocalStorageDriverFacade.get('/users').data.data).toEqual(users);

    expect(LocalStorageDriverFacade.get('/users/1').data.data).toEqual({
        id: 1, 
        name: 'Bob', 
        roles: [
            {
                id: 1, 
                name: 'Admin', 
            }, 
        ], 
    });

    expect(LocalStorageDriverFacade.get('/users/3').data.data).toEqual({
        id: 3, 
        name: 'John', 
        roles: [
            {
                id: 1, 
                name: 'User', 
            }, 
        ], 
    });

    expect(LocalStorageDriverFacade.get('/users/3/name').data.data).toBe('John');
    expect(LocalStorageDriverFacade.get('/users/3/roles/1/name').data.data).toBe('User');
});

test('post', () => {
    let notes = LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}], false, false).data.data;
    
    expect(notes).toHaveLength(2);

    expect(notes[0]).not.toHaveProperty(config('model.primary_key'));
    expect(notes[0]).toHaveProperty('title', 'title1');
    expect(notes[0]).toHaveProperty('text', 'text1');
    expect(notes[0]).not.toHaveProperty(config('model.created_at'));
    expect(notes[0]).not.toHaveProperty(config('model.updated_at'));
    expect(notes[0]).not.toHaveProperty(config('model.deleted_at'));

    expect(notes[1]).not.toHaveProperty(config('model.primary_key'));
    expect(notes[1]).toHaveProperty('title', 'title2');
    expect(notes[1]).toHaveProperty('text', 'text2');
    expect(notes[1]).not.toHaveProperty(config('model.created_at'));
    expect(notes[1]).not.toHaveProperty(config('model.updated_at'));
    expect(notes[1]).not.toHaveProperty(config('model.deleted_at'));

    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`).data.data).toEqual(notes);

    notes = LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}], false).data.data;
    
    expect(notes).toHaveLength(2);

    expect(notes[0]).toHaveProperty(config('model.primary_key'));
    expect(notes[0]).toHaveProperty('title', 'title1');
    expect(notes[0]).toHaveProperty('text', 'text1');
    expect(notes[0]).toHaveProperty(config('model.created_at'));
    expect(notes[0]).toHaveProperty(config('model.updated_at'));
    expect(notes[0]).toHaveProperty(config('model.deleted_at'));

    expect(notes[1]).toHaveProperty(config('model.primary_key'));
    expect(notes[1]).toHaveProperty('title', 'title2');
    expect(notes[1]).toHaveProperty('text', 'text2');
    expect(notes[1]).toHaveProperty(config('model.created_at'));
    expect(notes[1]).toHaveProperty(config('model.updated_at'));
    expect(notes[1]).toHaveProperty(config('model.deleted_at'));

    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`).data.data).toEqual(notes);

    LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, '', false).data.data;

    let note = LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, {title: 'title', text: 'text'}).data.data;
    LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, {title: 'title', text: 'text'});
    LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, {title: 'title', text: 'text'});

    expect(note).toHaveProperty(config('model.primary_key'));
    expect(note).toHaveProperty('title', 'title');
    expect(note).toHaveProperty('text', 'text');
    expect(note).toHaveProperty(config('model.created_at'));
    expect(note).toHaveProperty(config('model.updated_at'));
    expect(note).toHaveProperty(config('model.deleted_at'));

    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`).data.data).toHaveLength(4);
    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`).data.data).toEqual(note);

    note = LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`, {title: 'new_title', text: 'new_text'}).data.data;

    expect(note).toHaveProperty(config('model.primary_key'));
    expect(note).toHaveProperty('title', 'new_title');
    expect(note).toHaveProperty('text', 'new_text');
    expect(note).toHaveProperty(config('model.created_at'));
    expect(note).toHaveProperty(config('model.updated_at'));
    expect(note).toHaveProperty(config('model.deleted_at'));

    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`).data.data).toEqual(note);
});

test('patch', () => {
    cache().clear();
    let note = LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, {title: 'title', text: 'text'}).data.data;
    let updated = Object.assign({}, note);
    updated.title = 'new';
    updated.text = 'new';
    updated = LocalStorageDriverFacade.patch(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`, updated).data.data;
    
    expect(updated).toHaveProperty(config('model.primary_key'));
    expect(updated).toHaveProperty('title', 'new');
    expect(updated).toHaveProperty('text', 'new');
    expect(updated).toHaveProperty(config('model.created_at'));
    expect(updated).toHaveProperty(config('model.updated_at'));
    expect(updated).toHaveProperty(config('model.deleted_at'));

    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${updated[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`).data.data).toEqual(updated);

    cache().clear();

    let notes = LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}], false, false).data.data;
    
    expect(notes).toHaveLength(2);

    expect(notes[0]).not.toHaveProperty(config('model.primary_key'));
    expect(notes[0]).toHaveProperty('title', 'title1');
    expect(notes[0]).toHaveProperty('text', 'text1');
    expect(notes[0]).not.toHaveProperty(config('model.created_at'));
    expect(notes[0]).not.toHaveProperty(config('model.updated_at'));
    expect(notes[0]).not.toHaveProperty(config('model.deleted_at'));

    expect(notes[1]).not.toHaveProperty(config('model.primary_key'));
    expect(notes[1]).toHaveProperty('title', 'title2');
    expect(notes[1]).toHaveProperty('text', 'text2');
    expect(notes[1]).not.toHaveProperty(config('model.created_at'));
    expect(notes[1]).not.toHaveProperty(config('model.updated_at'));
    expect(notes[1]).not.toHaveProperty(config('model.deleted_at'));

    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`).data.data).toEqual(notes);

    cache().clear();

    note = LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, {title: 'title', text: 'text'}).data.data;
    LocalStorageDriverFacade.patch(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}/title`, 'new_title').data.data;

    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`).data.data).toHaveProperty('title', 'new_title');
});

test('delete', () => {
    let note = LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, {title: 'title', text: 'text'}).data.data;
    LocalStorageDriverFacade.delete(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`).data.data).toBeNull();

    LocalStorageDriverFacade.post(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`, [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}], false, false);
    LocalStorageDriverFacade.delete(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`);
    expect(LocalStorageDriverFacade.get(`${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/notes`).data.data).toBeNull();
});
