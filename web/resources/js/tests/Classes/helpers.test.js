import Cache from '../../Classes/Cache/Cache';
import AxiosServerDriver from '../../Classes/Database/Drivers/AxiosServerDriver';
import { cache, config, empty, getValue, uuid, is, isArray, isBoolean, isFunction, isJson, isNull, isNumber, isObject, isString, isUndefined, notEmpty, parseJson, rand, time, toJson, timestamp, zero, delay, sleep, server, csrfCookie, getCookie, register, user, serverDriver, driver } from '../../Classes/helpers';
import { jest } from '@jest/globals';
import DriverInterface from '../../Interfaces/DriverInterface';

jest.useRealTimers();

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
});

test('serverDriver', () => {
    expect(serverDriver()).toBeInstanceOf(AxiosServerDriver);
});

test('driver', () => {
    expect(driver()).toBeInstanceOf(DriverInterface);
});
