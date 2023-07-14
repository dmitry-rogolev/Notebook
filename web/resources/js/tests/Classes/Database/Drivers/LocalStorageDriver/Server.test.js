import ServerFacade from "../../../../../Classes/Facades/Server";
import Model from "../../../../../Classes/Model/Model";
import { config, delay } from "../../../../../Classes/helpers";
import { jest } from '@jest/globals';

jest.useRealTimers();

test('store', () => {
    let data = {
        title: 'title', 
        text: 'text', 
    };

    let note = ServerFacade.store(data);

    expect(note).toHaveProperty(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY));
    expect(note).toHaveProperty('title');
    expect(note).toHaveProperty('text');
    expect(note).toHaveProperty(config('model.created_at', Model.DEFAULT_CREATED_AT));
    expect(note).toHaveProperty(config('model.updated_at', Model.DEFAULT_UPDATED_AT));
    expect(note).toHaveProperty(config('model.deleted_at', Model.DEFAULT_DELETED_AT));
});

it('update', async () => {
    let data = {
        title: 'title', 
        text: 'text', 
    };

    let note = ServerFacade.store(data);

    let fn = jest.fn(() => {
        note = ServerFacade.update(note);
        expect(note[config('model.created_at', Model.DEFAULT_CREATED_AT)]).not.toBe(note[config('model.updated_at', Model.DEFAULT_UPDATED_AT)]);
    });
  
    await delay(fn, 100);
  
    expect(fn).toHaveBeenCalled();
});
