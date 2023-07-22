import DatabaseFacade from "../../../Classes/Facades/DatabaseFacade";
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

    let note = clientDriver().post(`/${config('routes.api.prefix')}/notes`, {title: 'title', text: 'text'}).data.data;
    let result = (await DatabaseFacade.get(`/${config('routes.api.prefix')}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key')]}`)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key'), note[config('model.primary_key')]);
    expect(result).toHaveProperty('title', 'title');
    expect(result).toHaveProperty('text', 'text');
    expect(result).toHaveProperty(config('model.created_at'), note[config('model.created_at')]);
    expect(result).toHaveProperty(config('model.updated_at'), note[config('model.updated_at')]);
    expect(result).toHaveProperty(config('model.deleted_at'), note[config('model.deleted_at')]);

    await auth();

    note = (await serverDriver().post(`/${config('routes.api.prefix')}/notes`, {title: 'title', text: 'text'})).data.data;
    result = (await DatabaseFacade.get(`/${config('routes.api.prefix')}/notes/${note[config('model.primary_key')]}`)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key'), note[config('model.primary_key')]);
    expect(result).toHaveProperty('title', 'title');
    expect(result).toHaveProperty('text', 'text');
    expect(result).toHaveProperty(config('model.created_at'), note[config('model.created_at')]);
    expect(result).toHaveProperty(config('model.updated_at'), note[config('model.updated_at')]);
    expect(result).toHaveProperty(config('model.deleted_at'), note[config('model.deleted_at')]);

    await logout();
}, 50000);

it('store', async () => {
    expect.assertions(12);

    let note = (await DatabaseFacade.store(`/${config('routes.api.prefix')}/notes`, {title: 'title', text: 'text'})).data.data;
    let result = (await DatabaseFacade.get(`/${config('routes.api.prefix')}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key')]}`)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key'), note[config('model.primary_key')]);
    expect(result).toHaveProperty('title', 'title');
    expect(result).toHaveProperty('text', 'text');
    expect(result).toHaveProperty(config('model.created_at'), note[config('model.created_at')]);
    expect(result).toHaveProperty(config('model.updated_at'), note[config('model.updated_at')]);
    expect(result).toHaveProperty(config('model.deleted_at'), note[config('model.deleted_at')]);

    await auth();

    note = (await DatabaseFacade.store(`/${config('routes.api.prefix')}/notes`, {title: 'title', text: 'text'})).data.data;
    result = (await DatabaseFacade.get(`/${config('routes.api.prefix')}/notes/${note[config('model.primary_key')]}`)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key'), note[config('model.primary_key')]);
    expect(result).toHaveProperty('title', 'title');
    expect(result).toHaveProperty('text', 'text');
    expect(result).toHaveProperty(config('model.created_at'), note[config('model.created_at')]);
    expect(result).toHaveProperty(config('model.updated_at'), note[config('model.updated_at')]);
    expect(result).toHaveProperty(config('model.deleted_at'), note[config('model.deleted_at')]);

    await logout();
}, 50000);

it('update', async () => {
    expect.assertions(12);

    let note = (await DatabaseFacade.store(`/${config('routes.api.prefix')}/notes`, {title: 'title', text: 'text'})).data.data;
    let result = Object.assign({}, note);
    result.title = 'updated';
    result.text = 'updated';
    result = (await DatabaseFacade.update(`/${config('routes.api.prefix')}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key')]}`, result)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key'), note[config('model.primary_key')]);
    expect(result).toHaveProperty('title', 'updated');
    expect(result).toHaveProperty('text', 'updated');
    expect(result).toHaveProperty(config('model.created_at'));
    expect(result).toHaveProperty(config('model.updated_at'));
    expect(result).toHaveProperty(config('model.deleted_at'), note[config('model.deleted_at')]);

    await auth();

    note = (await DatabaseFacade.store(`/${config('routes.api.prefix')}/notes`, {title: 'title', text: 'text'})).data.data;
    result = Object.assign({}, note);
    result.title = 'updated';
    result.text = 'updated';
    result = (await DatabaseFacade.update(`/${config('routes.api.prefix')}/notes/${note[config('model.primary_key')]}`, result)).data.data;
    
    expect(result).toHaveProperty(config('model.primary_key'), note[config('model.primary_key')]);
    expect(result).toHaveProperty('title', 'updated');
    expect(result).toHaveProperty('text', 'updated');
    expect(result).toHaveProperty(config('model.created_at'));
    expect(result).toHaveProperty(config('model.updated_at'));
    expect(result).toHaveProperty(config('model.deleted_at'), note[config('model.deleted_at')]);

    await logout();
}, 50000);

it('delete', async () => {
    expect.assertions(2);

    let note = (await DatabaseFacade.store(`/${config('routes.api.prefix')}/notes`, {title: 'title', text: 'text'})).data.data;
    await DatabaseFacade.delete(`/${config('routes.api.prefix')}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key')]}`);
    let result = (await DatabaseFacade.get(`/${config('routes.api.prefix')}/notes/${config('model.uuid.prefix')}${note[config('model.primary_key')]}`)).data.data;
    
    expect(result).toBeNull();

    await auth();

    note = (await DatabaseFacade.store(`/${config('routes.api.prefix')}/notes`, {title: 'title', text: 'text'})).data.data;
    await DatabaseFacade.delete(`/${config('routes.api.prefix')}/notes/${note[config('model.primary_key')]}`);
    try {
        result = await DatabaseFacade.get(`/${config('routes.api.prefix')}/notes/${note[config('model.primary_key')]}`);
        result = result.data.data;
    } catch (e) {
        result = null;
    }
    
    expect(result).toBeNull();

    await logout();
}, 50000);
