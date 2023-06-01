<template>
    <ModalComponent :active="active" @close="$emit('close')" @after-enter="afterEnter">
        <template #header>
            <div class="px-4 py-2">
                <h5 class="text-base">Insert symbols</h5>
            </div>
        </template>
        <template #content>
            <div class="px-4 pb-4 pt-2 overflow-hidden">
                <ul role="menubar" class="flex flex-nowrap border-b border-gray-300 dark:border-gray-600 mb-3">
                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="openSymbols" :active="isSymbols" :aria-controls="symbolsToken" title="Symbols">
                            <i class="fa-solid fa-at text-center px-3"></i>
                        </TabLinkComponent>
                    </li>
                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="openArrows"  :active="isArrows" :aria-controls="arrowsToken" title="Arrows">
                            <i class="fa-solid fa-arrows-up-down-left-right text-center px-3"></i>
                        </TabLinkComponent>
                    </li>
                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="openCurrencies"  :active="isCurrencies" :aria-controls="currenciesToken" title="Currencies">
                            <i class="fa-solid fa-wallet text-center px-3"></i>
                        </TabLinkComponent>
                    </li>
                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="openLetters"  :active="isLetters" :aria-controls="lettersToken" title="Letters">
                            <i class="fa-solid fa-font text-center px-3"></i>
                        </TabLinkComponent>
                    </li>
                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="openMath"  :active="isMath" :aria-controls="mathToken" title="Math">
                            <i class="fa-solid fa-square-root-variable text-center px-3"></i>
                        </TabLinkComponent>
                    </li>
                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="openNumbers"  :active="isNumbers" :aria-controls="numbersToken" title="Numbers">
                            <i class="fa-solid fa-5 text-center px-3"></i>
                        </TabLinkComponent>
                    </li>
                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="openPunctuation"  :active="isPunctuation" :aria-controls="punctuationToken" title="Punctuation">
                            <i class="fa-regular fa-question text-center px-3"></i>
                        </TabLinkComponent>
                    </li>
                </ul>
                <div 
                    ref="cards"
                    @keyup.left="left" 
                    @keyup.right="right" 
                    >
                    <transition 
                        mode="out-in"
                        enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0"
                        leave-active-class="transition ease-in duration-100"
                        leave-to-class="opacity-0"
                        @after-enter="afterEnter"
                        >
                        <ul v-if="isSymbols" :id="symbolsToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in symbols" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>
                        <ul v-else-if="isArrows" :id="arrowsToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in arrows" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>
                        <ul v-else-if="isCurrencies" :id="currenciesToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in currencies" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>
                        <ul v-else-if="isLetters" :id="lettersToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in letters" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>
                        <ul v-else-if="isMath" :id="mathToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in math" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>
                        <ul v-else-if="isNumbers" :id="numbersToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in numbers" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>
                        <ul v-else-if="isPunctuation" :id="punctuationToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in punctuation" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>
                    </transition>
                </div>
            </div>
        </template>
    </ModalComponent>
</template>

<script>
import ModalComponent from '@/Components/Modal.vue';
import TabLinkComponent from '@/Components/TabLink.vue';
import CardButtonComponent from '@/Components/CardButton.vue';
import { token } from '@/helpers';
import symbols from '@/assets/symbols.json';
import arrows from '@/assets/arrows.json';
import currencies from '@/assets/currencies.json';
import letters from '@/assets/letters.json';
import math from '@/assets/math.json';
import numbers from '@/assets/numbers.json';
import punctuation from '@/assets/punctuation.json';

export default {
    name: 'ModalInsertSymbolsPartial', 

    components: {
        ModalComponent, 
        TabLinkComponent, 
        CardButtonComponent, 
    }, 

    emits: [
        'close', 
        'create:symbol', 
    ], 

    data() {
        return {
            cards: null, 
            symbolsToken: token(), 
            arrowsToken: token(), 
            currenciesToken: token(), 
            lettersToken: token(), 
            mathToken: token(), 
            numbersToken: token(), 
            punctuationToken: token(), 
            isSymbols: false, 
            isArrows: false, 
            isCurrencies: false, 
            isLetters: false, 
            isMath: false, 
            isNumbers: false, 
            isPunctuation: false, 
            symbols: null, 
            arrows: null, 
            currencies: null, 
            letters: null, 
            math: null, 
            numbers: null, 
            punctuation: null, 
            items: null, 
            index: 0, 
            focused: null, 
            isToggle: false, 
        };
    }, 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
    }, 

    watch: {
        active() {
            if (this.active) {
                this.openSymbols();
            }
        }, 
    }, 

    methods: {
        afterEnter() {
            this.defineValues();
            this.defineFocus();
        }, 
        defineValues() {
            this.cards = $(this.$refs.cards);
            this.items = this.cards.find('.card:not([tabindex=-1])');
            this.symbols = symbols;
            this.arrows = arrows;
            this.currencies = currencies;
            this.letters = letters;
            this.math = math;
            this.numbers = numbers;
            this.punctuation = punctuation;
        }, 
        defineFocus() {
            this.items.first().focus();
        }, 
        openSymbols() {
            this.closeAll();
            this.isSymbols = true;
        }, 
        openArrows() {
            this.closeAll();
            this.isArrows = true;
        }, 
        openCurrencies() {
            this.closeAll();
            this.isCurrencies = true;
        }, 
        openLetters() {
            this.closeAll();
            this.isLetters = true;
        }, 
        openMath() {
            this.closeAll();
            this.isMath = true;
        }, 
        openNumbers() {
            this.closeAll();
            this.isNumbers = true;
        }, 
        openPunctuation() {
            this.closeAll();
            this.isPunctuation = true;
        }, 
        closeSymbols() {
            this.isSymbols = false;
        }, 
        closeArrows() {
            this.isArrows = false;
        }, 
        closeCurrencies() {
            this.isCurrencies = false;
        }, 
        closeLetters() {
            this.isLetters = false;
        }, 
        closeMath() {
            this.isMath = false;
        }, 
        closeNumbers() {
            this.isNumbers = false;
        }, 
        closePunctuation() {
            this.isPunctuation = false;
        }, 
        closeAll() {
            this.closeSymbols();
            this.closeArrows();
            this.closeCurrencies();
            this.closeLetters();
            this.closeMath();
            this.closeNumbers();
            this.closePunctuation();
        }, 
        defineFocused() {
            this.focused = null;
            this.index = 0;

            if (this.isFocus()) {
                this.focused = $(document.activeElement);
                this.index = this.items.index(this.focused);
            }
        }, 
        isFocus() {
            return !! this.cards.has(document.activeElement).length;
        },  
        left() {
            this.defineFocused();

            if (this.focused) {
                this.defineFocusToPrevItem();
            } else {
                this.defineFocusToLastItem();
            }
        }, 
        right() {
            this.defineFocused();

            if (this.focused) {
                this.defineFocusToNextItem();
            } else {
                this.defineFocusToFirstItem();
            }
        }, 
        defineFocusToFirstItem() {
            this.index = 0;
            this.focused = this.items.eq(this.index);
            this.focused.focus();
        }, 
        defineFocusToLastItem() {
            this.index = this.items.length - 1;
            this.focused = this.items.eq(this.index);
            this.focused.focus();
        }, 
        defineFocusToNextItem() {
            this.index = this.index == this.items.length - 1 ? 0 : this.index + 1;
            this.focused = this.items.eq(this.index);
            this.focused.focus();
        }, 
        defineFocusToPrevItem() {
            this.index = this.index == 0 ? this.items.length - 1 : this.index - 1;
            this.focused = this.items.eq(this.index);
            this.focused.focus();
        }, 
    }, 
};
</script>