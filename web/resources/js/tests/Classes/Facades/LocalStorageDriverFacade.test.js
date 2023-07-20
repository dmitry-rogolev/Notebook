import Database from "../../../Classes/Database/Database";
import LocalStorageDriverFacade from "../../../Classes/Facades/LocalStorageDriverFacade";
import Model from "../../../Classes/Model/Model";
import { cache, config } from "../../../Classes/helpers";

test('get', () => {
    cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + 'key', 'value');
    expect(LocalStorageDriverFacade.get('key')).toBe('value');

    cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + 'key', {id: 1, name: 'Bob'});
    expect(LocalStorageDriverFacade.get('key')).toEqual({id: 1, name: 'Bob'});

    cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + 'key', [{id: 1, name: 'Bob'}, {id: 2, name: 'Boris'}]);
    expect(LocalStorageDriverFacade.get('key')).toEqual([{id: 1, name: 'Bob'}, {id: 2, name: 'Boris'}]);

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
    expect(LocalStorageDriverFacade.get('/users')).toEqual(users);

    expect(LocalStorageDriverFacade.get('/users/1')).toEqual({
        id: 1, 
        name: 'Bob', 
        roles: [
            {
                id: 1, 
                name: 'Admin', 
            }, 
        ], 
    });

    expect(LocalStorageDriverFacade.get('/users/3')).toEqual({
        id: 3, 
        name: 'John', 
        roles: [
            {
                id: 1, 
                name: 'User', 
            }, 
        ], 
    });

    expect(LocalStorageDriverFacade.get('/users/3/name')).toBe('John');
    expect(LocalStorageDriverFacade.get('/users/3/roles/1/name')).toBe('User');
});

test('post', () => {
    let notes = LocalStorageDriverFacade.post('/api/notes', [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}], false, false);
    
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

    expect(LocalStorageDriverFacade.get('/api/notes')).toEqual(notes);

    notes = LocalStorageDriverFacade.post('/api/notes', [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}], false);
    
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

    expect(LocalStorageDriverFacade.get('/api/notes')).toEqual(notes);

    LocalStorageDriverFacade.post('/api/notes', '', false)

    let note = LocalStorageDriverFacade.post('/api/notes', {title: 'title', text: 'text'});
    LocalStorageDriverFacade.post('/api/notes', {title: 'title', text: 'text'});
    LocalStorageDriverFacade.post('/api/notes', {title: 'title', text: 'text'});

    expect(note).toHaveProperty(config('model.primary_key'));
    expect(note).toHaveProperty('title', 'title');
    expect(note).toHaveProperty('text', 'text');
    expect(note).toHaveProperty(config('model.created_at'));
    expect(note).toHaveProperty(config('model.updated_at'));
    expect(note).toHaveProperty(config('model.deleted_at'));

    expect(LocalStorageDriverFacade.get('/api/notes')).toHaveLength(4);
    expect(LocalStorageDriverFacade.get(`/api/notes/${config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX)}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).toEqual(note);

    note = LocalStorageDriverFacade.post(`/api/notes/${config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX)}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`, {title: 'new_title', text: 'new_text'});

    expect(note).toHaveProperty(config('model.primary_key'));
    expect(note).toHaveProperty('title', 'new_title');
    expect(note).toHaveProperty('text', 'new_text');
    expect(note).toHaveProperty(config('model.created_at'));
    expect(note).toHaveProperty(config('model.updated_at'));
    expect(note).toHaveProperty(config('model.deleted_at'));

    expect(LocalStorageDriverFacade.get(`/api/notes/${config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX)}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).toEqual(note);
});

test('patch', () => {
    cache().clear();
    let note = LocalStorageDriverFacade.post('/api/notes', {title: 'title', text: 'text'});
    let updated = Object.assign({}, note);
    updated.title = 'new';
    updated.text = 'new';
    updated = LocalStorageDriverFacade.patch(`/api/notes/${config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX)}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`, updated);
    
    expect(updated).toHaveProperty(config('model.primary_key'));
    expect(updated).toHaveProperty('title', 'new');
    expect(updated).toHaveProperty('text', 'new');
    expect(updated).toHaveProperty(config('model.created_at'));
    expect(updated).toHaveProperty(config('model.updated_at'));
    expect(updated).toHaveProperty(config('model.deleted_at'));

    expect(LocalStorageDriverFacade.get(`/api/notes/${config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX)}${updated[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).toEqual(updated);

    cache().clear();

    let notes = LocalStorageDriverFacade.post('/api/notes', [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}], false, false);
    
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

    expect(LocalStorageDriverFacade.get('/api/notes')).toEqual(notes);

    cache().clear();

    note = LocalStorageDriverFacade.post('/api/notes', {title: 'title', text: 'text'});
    LocalStorageDriverFacade.patch(`/api/notes/${config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX)}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}/title`, 'new_title');

    expect(LocalStorageDriverFacade.get(`/api/notes/${config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX)}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).toHaveProperty('title', 'new_title');
});

test('delete', () => {
    let note = LocalStorageDriverFacade.post('/api/notes', {title: 'title', text: 'text'});
    LocalStorageDriverFacade.delete(`/api/notes/${config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX)}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
    expect(LocalStorageDriverFacade.get(`/api/notes/${config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX)}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).toBeNull();

    LocalStorageDriverFacade.post('/api/notes', [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}], false, false);
    LocalStorageDriverFacade.delete('/api/notes');
    expect(LocalStorageDriverFacade.get('/api/notes')).toBeNull();
});
