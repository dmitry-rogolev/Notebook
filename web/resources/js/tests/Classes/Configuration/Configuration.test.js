import Configuration from '../../../Classes/Configuration/Configuration';
import config from '../../../config.json';

test('Configuration can get instance', () => {
    expect(Configuration.getInstance()).toBeInstanceOf(Configuration);
});

test('Configuration can get value', () => {
    expect(Configuration.getInstance().get('app_name')).toBe('Notebook');
});

test('Configuration can get configurations', () => {
    let configuration = Configuration.getInstance();
    expect(configuration.configurations).toEqual(config);
});

test('Configuration can  get parameter', () => {
    let configuration = Configuration.getInstance();
    expect(configuration.get('app_name')).toBe('Notebook');
});
