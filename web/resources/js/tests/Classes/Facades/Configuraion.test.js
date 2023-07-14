import ConfigurationFacade from '../../../Classes/Facades/Configuration';

test('ConfigurationFacade can get value', () => {
    expect(ConfigurationFacade.get('app_name')).toBe('Notebook');
});
