import AxiosServerDriverFacade from "../../../Classes/Facades/AxiosServerDriver";
import Model from "../../../Classes/Model/Model";
import { config, csrfCookie, isArray, serverDriver, sleep } from "../../../Classes/helpers";

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

it('get', async () => {
    expect.assertions(7);

    await auth();

    let response = await AxiosServerDriverFacade.get(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`);

    let data = response?.data?.data;
    expect(isArray(data)).toBeTruthy();
    expect(data[0]).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY));
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('text');
    expect(data[0]).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(data[0]).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(data[0]).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT));
}, 50000);

it('post', async () => {
    expect.assertions(6);
    let response = await AxiosServerDriverFacade.post(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {
        title: 'title', 
        text: 'text', 
    });
    let data = response?.data?.data;
    expect(data).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY));
    expect(data).toHaveProperty('title', 'title');
    expect(data).toHaveProperty('text', 'text');
    expect(data).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(data).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(data).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT));

    await AxiosServerDriverFacade.delete(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${data[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
    await AxiosServerDriverFacade.delete(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/trashnotes/${data[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
}, 50000);

it('patch', async () => {
    expect.assertions(6);

    let response = await AxiosServerDriverFacade.post(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {
        title: 'title', 
        text: 'text', 
    });
    let old = response?.data?.data;

    await sleep(1000);

    response = await AxiosServerDriverFacade.patch(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${old[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`, {
        title: 'new_title', 
        text: 'new_text', 
    });
    let updated = response?.data?.data;

    expect(updated[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]).toBe(old[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]);
    expect(updated['title']).toBe('new_title');
    expect(updated['text']).toBe('new_text');
    expect(updated[config('model.created_at', Model.DEFAULT_CREATED_AT)]).toBe(old[config('model.created_at', Model.DEFAULT_CREATED_AT)]);
    expect(updated[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]).not.toBe(old[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]);
    expect(updated[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]).toBe(old[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]);

    await AxiosServerDriverFacade.delete(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${old[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
    await AxiosServerDriverFacade.delete(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/trashnotes/${old[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
}, 50000);

it('delete', async () => {
    expect.assertions(2);

    let response = await AxiosServerDriverFacade.post(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes`, {
        title: 'title', 
        text: 'text', 
    });
    let data = response?.data?.data;

    expect(data[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]).toBeNull();

    response = await AxiosServerDriverFacade.delete(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/notes/${data[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);
    data = response?.data?.data;

    expect(data[config('model.deleted_at', Model.DEFAULT_DELETED_AT)]).not.toBeNull();

    await AxiosServerDriverFacade.delete(`/${config('routes.api.prefix', Model.DEFAULT_UUID_PREFIX)}/trashnotes/${data[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)]}`);

    await logout();
}, 50000);