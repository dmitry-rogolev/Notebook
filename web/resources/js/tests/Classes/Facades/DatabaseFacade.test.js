import DatabaseFacade from "../../../Classes/Facades/DatabaseFacade";
import Model from "../../../Classes/Model/Model";
import { clientDriver, config, csrfCookie, driver, serverDriver, sleep, user } from "../../../Classes/helpers";

async function auth() {
    await csrfCookie();

    await serverDriver().post('/login', {
        email: 'admin@admin.com', 
        password: 'password', 
    });
}

async function logout() {
    await csrfCookie();
    await serverDriver().post('/logout');
}

it('get', async () => {
    expect.assertions(12);

    await logout();

    let note = clientDriver().post(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {title: 'title', text: 'text'}).data.data;
    let result = (await DatabaseFacade.get(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY), note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]);
    expect(result).toHaveProperty('title', 'title');
    expect(result).toHaveProperty('text', 'text');
    expect(result).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT), note[config('model.created_at', Model.DEFAULT_CREATED_AT)]);
    expect(result).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT), note[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]);
    expect(result).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), note[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]);

    await auth();

    note = (await serverDriver().post(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {title: 'title', text: 'text'})).data.data;
    result = (await DatabaseFacade.get(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY), note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]);
    expect(result).toHaveProperty('title', 'title');
    expect(result).toHaveProperty('text', 'text');
    expect(result).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT), note[config('model.created_at', Model.DEFAULT_CREATED_AT)]);
    expect(result).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT), note[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]);
    expect(result).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), note[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]);

    await logout();
}, 50000);

it('store', async () => {
    expect.assertions(12);

    let note = (await DatabaseFacade.store(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {title: 'title', text: 'text'})).data.data;
    let result = (await DatabaseFacade.get(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY), note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]);
    expect(result).toHaveProperty('title', 'title');
    expect(result).toHaveProperty('text', 'text');
    expect(result).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT), note[config('model.created_at', Model.DEFAULT_CREATED_AT)]);
    expect(result).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT), note[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]);
    expect(result).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), note[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]);

    await auth();

    note = (await DatabaseFacade.store(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {title: 'title', text: 'text'})).data.data;
    result = (await DatabaseFacade.get(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY), note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]);
    expect(result).toHaveProperty('title', 'title');
    expect(result).toHaveProperty('text', 'text');
    expect(result).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT), note[config('model.created_at', Model.DEFAULT_CREATED_AT)]);
    expect(result).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT), note[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]);
    expect(result).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), note[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]);

    await logout();
}, 50000);

it('update', async () => {
    expect.assertions(12);

    let note = (await DatabaseFacade.store(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {title: 'title', text: 'text'})).data.data;
    let result = Object.assign({}, note);
    result.title = 'updated';
    result.text = 'updated';
    result = (await DatabaseFacade.update(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`, result)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY), note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]);
    expect(result).toHaveProperty('title', 'updated');
    expect(result).toHaveProperty('text', 'updated');
    expect(result).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(result).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(result).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), note[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]);

    await auth();

    note = (await DatabaseFacade.store(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {title: 'title', text: 'text'})).data.data;
    result = Object.assign({}, note);
    result.title = 'updated';
    result.text = 'updated';
    result = (await DatabaseFacade.update(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`, result)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY), note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]);
    expect(result).toHaveProperty('title', 'updated');
    expect(result).toHaveProperty('text', 'updated');
    expect(result).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(result).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(result).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT), note[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]);

    await logout();
}, 50000);

it('delete', async () => {
    expect.assertions(2);

    let note = (await DatabaseFacade.store(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {title: 'title', text: 'text'})).data.data;
    await DatabaseFacade.delete(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
    let result = (await DatabaseFacade.get(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`)).data.data;
    
    expect(result).toBeNull();

    await auth();

    note = (await DatabaseFacade.store(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {title: 'title', text: 'text'})).data.data;
    await DatabaseFacade.delete(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
    try {
        result = await DatabaseFacade.get(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${note[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
        result = result.data.data;
    } catch (e) {
        result = null;
    }
    
    expect(result).toBeNull();

    await logout();
}, 50000);
