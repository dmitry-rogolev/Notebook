import Cache from '../../Classes/Cache/Cache';
import AxiosServerDriver from '../../Classes/Database/Drivers/AxiosServerDriver';
import { cache, config, empty, getValue, uuid, is, isArray, isBoolean, isFunction, isJson, isNull, isNumber, isObject, isString, isUndefined, notEmpty, parseJson, rand, time, toJson, timestamp, zero, delay, sleep, server, csrfCookie, getCookie, register, user, serverDriver, driver, setValue, removeValue, getIndexById, url, keysByUrl, clientDriver, pluralize, timestamps, isDateFormatISO8601 } from '../../Classes/helpers';
import { jest } from '@jest/globals';
import AxiosServerDriverFacade from '../../Classes/Facades/AxiosServerDriver';
import LocalStorageDriver from '../../Classes/Database/Drivers/LocalStorageDriver';
import Model from '../../Classes/Model/Model';

jest.useRealTimers();

async function auth() {
    await csrfCookie();

    await AxiosServerDriverFacade.post('/login', {
        email: 'admin@admin.com', 
        password: 'password', 
    });
}

async function logout() {
    await serverDriver().post('/logout');
}

test('isObject', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject('')).toBe(false);
});

test('isString', () => {
    expect(isString('')).toBe(true);
    expect(isString({})).toBe(false);
    expect(isString(5)).toBe(false);
});

test('isArray', () => {
    expect(isArray([])).toBe(true);
    expect(isArray(5)).toBe(false);
    expect(isArray({})).toBe(false);
});

test('empty', () => {
    expect(empty({})).toBe(true);
    expect(empty({name: 'name'})).toBe(false);
    expect(empty([])).toBe(true);
    expect(empty(['name'])).toBe(false);
    expect(empty('')).toBe(true);
    expect(empty('name')).toBe(false);
    expect(empty(5)).toBe(false);
    expect(empty(0)).toBe(true);
});

test('isNumber', () => {
    expect(isNumber(5)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber('')).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber(4.2)).toBe(true);
});

test('isBoolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean({})).toBe(false);
});

test('isFunction', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction({})).toBe(false);
    expect(isFunction('')).toBe(false);
});

test('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined('')).toBe(false);
});

test('isNull', () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull({})).toBe(false);
});

test('is', () => {
    expect(is('', 'string')).toBe(true);
    expect(is({}, 'object')).toBe(true);
    expect(is({}, 'string')).toBe(false);
    expect(is([], 'object')).toBe(true);
});

test('notEmpty', () => {
    expect(notEmpty({})).toBe(false);
    expect(notEmpty({name: 'name'})).toBe(true);
    expect(notEmpty([])).toBe(false);
    expect(notEmpty(['name'])).toBe(true);
    expect(notEmpty('')).toBe(false);
    expect(notEmpty('name')).toBe(true);
    expect(notEmpty(5)).toBe(true);
    expect(notEmpty(0)).toBe(false);
});

test('toJson', () => {
    let obj = {
        name: 'name', 
        email: 'email@email.com', 
    };
    
    expect(toJson(obj)).toBe(JSON.stringify(obj));
    expect(toJson(JSON.stringify(obj))).toBe(JSON.stringify(obj));
});

test('parseJson', () => {
    let obj = {
        name: 'name', 
        email: 'email@email.com', 
    };

    expect(parseJson(JSON.stringify(obj))).toEqual(obj);
    expect(parseJson(obj)).toEqual(obj);
});

test('isJson', () => {
    let obj = {
        name: 'name', 
        email: 'email@email.com', 
    };

    expect(isJson(JSON.stringify(obj))).toBe(true);
    expect(isJson(obj)).toBe(false);
});

test('getValue', () => {
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

    expect(getValue(users, '0.roles.0.name')).toBe('Admin');
    expect(getValue(users, '1.name')).toBe('Boris');
    expect(getValue(users, '2.roles')).toEqual([
        {
            id: 1, 
            name: 'User', 
        }, 
    ]);
    expect(getValue(users, 2)).toEqual({
        id: 3, 
        name: 'John', 
        roles: [
            {
                id: 1, 
                name: 'User', 
            }, 
        ], 
    });
});

test('setValue', () => {
    let users = [];

    setValue(users, 0, {name: 'Bob'});
    expect(getValue(users, 0)).toEqual({name: 'Bob'});

    setValue(users, '1', {name: 'Boris'});
    expect(getValue(users, '1')).toEqual({name: 'Boris'});

    setValue(users, '0.id', 1);
    expect(getValue(users, '0.id')).toBe(1);

    setValue(users, '0.notes.0.title', 'Some title');
    expect(getValue(users, '0.notes.0.title')).toBe('Some title');

    setValue(users, '1.notes', [{id: 1}, {id: 2}]);
    expect(getValue(users, '1.notes')).toEqual([{id: 1}, {id: 2}]);

    setValue(users, '0.name', 'Ignut');
    expect(getValue(users, '0.name')).toBe('Ignut');

    setValue(users, '0.notes.0.title', 'New title');
    expect(getValue(users, '0.notes.0.title')).toBe('New title');

    setValue(users, '1.notes', [{id: 3}, {id: 4}]);
    expect(getValue(users, '1.notes')).toEqual([{id: 3}, {id: 4}]);
});

test('removeValue', () => {
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

    removeValue(users, '0.roles.0.name');
    expect(getValue(users, '0.roles.0.name')).toBeUndefined();

    removeValue(users, '1.name')
    expect(getValue(users, '1.name')).toBeUndefined();

    removeValue(users, '2.roles')
    expect(getValue(users, '2.roles')).toBeUndefined();

    removeValue(users, 2)
    expect(getValue(users, 2)).toBeUndefined();
});

test('config', () => {
    expect(config('app_name')).toBe('Notebook');
    expect(config('database_name', 'localStorage')).toBe('localStorage');
});

test('cache', () => {
    expect(cache()).toBeInstanceOf(Cache);

    cache('prefix_key', 'value');
    expect(cache('prefix_key')).toBe('value');

    cache().remove('prefix_key');
    expect(cache('prefix_key')).toBeNull();
    expect(cache('wrong', null, 'value')).toBe('value');
});

test('time', () => {
    expect(isNumber(time())).toBeTruthy();
});

test('rand', () => {
    expect(isNumber(rand())).toBeTruthy();
    expect(rand(-100, 1000)).toBeGreaterThanOrEqual(-100);
    expect(rand(-100, 1000)).toBeLessThanOrEqual(1000);
});

test('uuid', () => {
    expect(isString(uuid())).toBeTruthy();
});

test('zero', () => {
    expect(zero(3)).toBe('03');
    expect(zero(10)).toBe('10');
});

test('timestamp', () => {
    expect(isString(timestamp())).toBeTruthy();
    expect(timestamp().split('T').length).toBe(2);
});

it('delay', async () => {
    expect.assertions(1);

    let start = time();
    let fn = () => time() - start;
    await expect(delay(fn, 100)).resolves.toBeGreaterThanOrEqual(100);
});

it('sleep', async () => {
    expect.assertions(1);
    let start = time();
    await expect(sleep(100).then(() => time() - start)).resolves.toBeGreaterThanOrEqual(100);
});

it('csrfCookie', async () => {
    expect.assertions(1);
    await csrfCookie();
    expect(getCookie('XSRF-TOKEN')).not.toBeUndefined();
}, 50000);

test('serverDriver', () => {
    expect(serverDriver()).toBeInstanceOf(AxiosServerDriver);
});

test('clientDriver', () => {
    expect(clientDriver()).toBeInstanceOf(LocalStorageDriver);
});

it('driver', async () => {
    expect.assertions(2);

    expect(await driver()).toBeInstanceOf(LocalStorageDriver);

    await auth();

    expect(await driver()).toBeInstanceOf(AxiosServerDriver);
    
    await logout();
});

test('getIndexById', () => {
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

    expect(getIndexById(users, 1)).toBe(0);
    expect(getIndexById(users, 2)).toBe(1);
    expect(getIndexById(users, 3)).toBe(2);
});

test('url', () => {
    expect(url('api/notes')).toBeInstanceOf(URL);
    expect(url('api/notes').toString()).toBe((new URL('/api/notes', config('app_url'))).toString());
    expect(url(new URL('/api/notes', config('app_url'))).toString()).toBe((new URL('/api/notes', config('app_url'))).toString());
});

test('keysByUrl', () => {
    expect(keysByUrl('/api/')).toEqual(['']);
    expect(keysByUrl('')).toEqual(['']);
    expect(keysByUrl('/api/notes')).toEqual(['notes']);
    expect(keysByUrl('/api/notes/1')).toEqual(['notes', '1']);
    expect(keysByUrl('/api/notes/1/roles/2')).toEqual(['notes', '1', 'roles', '2']);
});

it('user', async () => {
    expect.assertions(11);

    let u = await user();
    expect(u).toBeNull();

    await auth();

    u = await user();
    expect(u).toHaveProperty(config('model.primary_key'));
    expect(u).toHaveProperty('name');
    expect(u).toHaveProperty('email');
    expect(u).toHaveProperty('email_verified_at');
    expect(u).toHaveProperty('two_factor_confirmed_at');
    expect(u).toHaveProperty('current_team_id');
    expect(u).toHaveProperty('profile_photo_path');
    expect(u).toHaveProperty('profile_photo_url');
    expect(u).toHaveProperty(config('model.created_at'));
    expect(u).toHaveProperty(config('model.updated_at'));

    await logout();
});

test('pluralize', () => {
    expect(pluralize('word')).toBe('words');
});

test('timestamps', () => {
    let attributes = {
        [config('model.created_at', Model.DEFAULT_CREATED_AT)]: timestamp(), 
        [config('model.updated_at', Model.DEFAULT_UPDATED_AT)]: timestamp(), 
        [config('model.deleted_at', Model.DEFAULT_DELETED_AT)]: timestamp(), 
    };
    let keys = [config('model.created_at', Model.DEFAULT_CREATED_AT), config('model.updated_at', Model.DEFAULT_UPDATED_AT), config('model.deleted_at', Model.DEFAULT_DELETED_AT)];
    timestamps(attributes, keys);

    expect(attributes).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(attributes).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(attributes).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT));

    expect(attributes[config('model.created_at', Model.DEFAULT_CREATED_AT)]).toBeInstanceOf(Date);
    expect(attributes[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]).toBeInstanceOf(Date);
    expect(attributes[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]).toBeInstanceOf(Date);

    timestamps(attributes, keys);

    expect(attributes).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(attributes).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(attributes).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT));

    expect(attributes[config('model.created_at', Model.DEFAULT_CREATED_AT)]).toBeInstanceOf(Date);
    expect(attributes[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]).toBeInstanceOf(Date);
    expect(attributes[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]).toBeInstanceOf(Date);

    attributes = {};
    timestamps(attributes, keys);

    expect(attributes).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(attributes).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(attributes).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT));

    expect(attributes[config('model.created_at', Model.DEFAULT_CREATED_AT)]).toBeNull();
    expect(attributes[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]).toBeNull();
    expect(attributes[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]).toBeNull();
});

test('isDateFormatISO8601', () => {
    expect(isDateFormatISO8601('25.08.2000')).toBeFalsy();
    expect(isDateFormatISO8601('2000-08-25T04:25:24.000000Z')).toBeTruthy();
});
