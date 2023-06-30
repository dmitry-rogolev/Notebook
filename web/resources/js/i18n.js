import { createI18n } from 'vue-i18n';
import messages from './assets/messages';

const i18n = createI18n({
    messages: messages, 
    locale: 'ru', 
    fallbackLocale: 'en', 
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
