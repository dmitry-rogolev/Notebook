import { createI18n } from 'vue-i18n';
import messages from './assets/messages';
import { config } from './Classes/helpers';

const i18n = createI18n({
    messages: messages, 
    locale: config('locale.default', 'ru'), 
    fallbackLocale: config('locale.fallback', config('locale.default', 'ru') === 'ru' ? 'en' : 'ru'), 
    globalInjection: true,
    pluralRules: {
        ru: (choice, choicesLength, orgRule) => {
            if (choice === 0) {
                return 0;
            }
            
            let teen = choice > 10 && choice < 20;
            let endsWithOne = choice % 10 === 1;

            if (! teen && endsWithOne) {
                return 1;
            }

            if (! teen && choice % 10 >= 2 && choice % 10 <= 4) {
                return 2;
            }

            return choicesLength < 4 ? 2 : 3;
        }
    },
});

export default i18n;
