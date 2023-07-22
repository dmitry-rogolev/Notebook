import AxiosServerDriverFacade from "../../../Classes/Facades/AxiosServerDriver";
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

    let response = await AxiosServerDriverFacade.get('/api/notes');

    let data = response?.data?.data;
    expect(isArray(data)).toBeTruthy();
    expect(data[0]).toHaveProperty(config('model.primary_key'));
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('text');
    expect(data[0]).toHaveProperty(config('model.created_at'));
    expect(data[0]).toHaveProperty(config('model.updated_at'));
    expect(data[0]).toHaveProperty(config('model.deleted_at'));
}, 50000);

it('post', async () => {
    expect.assertions(6);
    let response = await AxiosServerDriverFacade.post('/api/notes', {
        title: 'title', 
        text: 'text', 
    });
    let data = response?.data?.data;
    expect(data).toHaveProperty(config('model.primary_key'));
    expect(data).toHaveProperty('title', 'title');
    expect(data).toHaveProperty('text', 'text');
    expect(data).toHaveProperty(config('model.created_at'));
    expect(data).toHaveProperty(config('model.updated_at'));
    expect(data).toHaveProperty(config('model.deleted_at'));

    await AxiosServerDriverFacade.delete('/api/notes/' + data[config('model.primary_key')]);
    await AxiosServerDriverFacade.delete('/api/trashnotes/' + data[config('model.primary_key')]);
}, 50000);

it('patch', async () => {
    expect.assertions(6);

    let response = await AxiosServerDriverFacade.post('/api/notes', {
        title: 'title', 
        text: 'text', 
    });
    let old = response?.data?.data;

    await sleep(1000);

    response = await AxiosServerDriverFacade.patch(`/api/notes/${old[config('model.primary_key')]}`, {
        title: 'new_title', 
        text: 'new_text', 
    });
    let updated = response?.data?.data;

    expect(updated[config('model.primary_key')]).toBe(old[config('model.primary_key')]);
    expect(updated['title']).toBe('new_title');
    expect(updated['text']).toBe('new_text');
    expect(updated[config('model.created_at')]).toBe(old[config('model.created_at')]);
    expect(updated[config('model.updated_at')]).not.toBe(old[config('model.updated_at')]);
    expect(updated[config('model.deleted_at')]).toBe(old[config('model.deleted_at')]);

    await AxiosServerDriverFacade.delete('/api/notes/' + old[config('model.primary_key')]);
    await AxiosServerDriverFacade.delete('/api/trashnotes/' + old[config('model.primary_key')]);
}, 50000);

it('delete', async () => {
    expect.assertions(2);

    let response = await AxiosServerDriverFacade.post('/api/notes', {
        title: 'title', 
        text: 'text', 
    });
    let data = response?.data?.data;

    expect(data[config('model.deleted_at')]).toBeNull();

    response = await AxiosServerDriverFacade.delete(`/api/notes/${data[config('model.primary_key')]}`);
    data = response?.data?.data;

    expect(data[config('model.deleted_at')]).not.toBeNull();

    await AxiosServerDriverFacade.delete('/api/trashnotes/' + data[config('model.primary_key')]);

    await logout();
}, 50000);