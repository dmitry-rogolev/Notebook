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
                        <TabLinkComponent @click="closeAll(); isOpenSymbols = true;" :active="isOpenSymbols" :aria-controls="symbolsToken" title="Symbols">
                            <i class="fa-solid fa-at text-center px-3"></i>
                        </TabLinkComponent>
                    </li>

                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="closeAll(); isOpenArrows = true;" :active="isOpenArrows" :aria-controls="arrowsToken" title="Arrows">
                            <i class="fa-solid fa-arrows-up-down-left-right text-center px-3"></i>
                        </TabLinkComponent>
                    </li>

                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="closeAll(); isOpenCurrencies = true;" :active="isOpenCurrencies" :aria-controls="currenciesToken" title="Currencies">
                            <i class="fa-solid fa-wallet text-center px-3"></i>
                        </TabLinkComponent>
                    </li>

                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="closeAll(); isOpenLetters = true;" :active="isOpenLetters" :aria-controls="lettersToken" title="Letters">
                            <i class="fa-solid fa-font text-center px-3"></i>
                        </TabLinkComponent>
                    </li>

                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="closeAll(); isOpenMath = true;" :active="isOpenMath" :aria-controls="mathToken" title="Math">
                            <i class="fa-solid fa-square-root-variable text-center px-3"></i>
                        </TabLinkComponent>
                    </li>
                    
                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="closeAll(); isOpenNumbers = true;" :active="isOpenNumbers" :aria-controls="numbersToken" title="Numbers">
                            <i class="fa-solid fa-5 text-center px-3"></i>
                        </TabLinkComponent>
                    </li>

                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="closeAll(); isOpenPunctuation = true;" :active="isOpenPunctuation" :aria-controls="punctuationToken" title="Punctuation">
                            <i class="fa-regular fa-question text-center px-3"></i>
                        </TabLinkComponent>
                    </li>

                </ul>

                <div 
                    ref="menu"
                    @keyup.left="left" 
                    @keyup.right="right" 
                    >
                    <transition name="symbols" mode="out-in" @after-enter="afterEnter">

                        <ul v-if="isOpenSymbols" :id="symbolsToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in symbols" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>

                        <ul v-else-if="isOpenArrows" :id="arrowsToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in arrows" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>

                        <ul v-else-if="isOpenCurrencies" :id="currenciesToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in currencies" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>

                        <ul v-else-if="isOpenLetters" :id="lettersToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in letters" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>

                        <ul v-else-if="isOpenMath" :id="mathToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in math" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>

                        <ul v-else-if="isOpenNumbers" :id="numbersToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in numbers" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 w-10 text-sm" @click="$emit('create:symbol', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                            </li>
                        </ul>

                        <ul v-else-if="isOpenPunctuation" :id="punctuationToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
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
            symbolsToken: token(), 
            arrowsToken: token(), 
            currenciesToken: token(), 
            lettersToken: token(), 
            mathToken: token(), 
            numbersToken: token(), 
            punctuationToken: token(), 
            isOpenSymbols: false, 
            isOpenArrows: false, 
            isOpenCurrencies: false, 
            isOpenLetters: false, 
            isOpenMath: false, 
            isOpenNumbers: false, 
            isOpenPunctuation: false, 
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
                this.closeAll();
                this.isOpenSymbols = true;
            }
        }, 
    }, 

    methods: {
        defineValues() {
            this.items = this.$refs.menu.querySelectorAll('.card:not([tabindex="-1"])');
        }, 
        defineFocus() {
            this.items.item(0).focus();
        }, 
        afterEnter() {
            this.defineValues();
            this.defineFocus();
        }, 
        closeAll() {
            this.isOpenSymbols = false;
            this.isOpenArrows = false;
            this.isOpenCurrencies = false;
            this.isOpenLetters = false;
            this.isOpenMath = false;
            this.isOpenNumbers = false;
            this.isOpenPunctuation = false;
        }, 
        defineFocused() {
            this.focused = null;
            this.index = 0;

            if (this.isFocus()) {
                this.focused = document.activeElement;
                this.items.forEach((item, index) => {
                    if (item.isSameNode(this.focused)) {
                        this.index = index;
                        return false;
                    }
                });
            }
        }, 
        isFocus() {
            return this.$refs.menu.contains(document.activeElement);
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
            this.focused = this.items.item(this.index);
            this.focused.focus();
        }, 
        defineFocusToLastItem() {
            this.index = this.items.length - 1;
            this.focused = this.items.item(this.index);
            this.focused.focus();
        }, 
        defineFocusToNextItem() {
            this.index = this.index == this.items.length - 1 ? 0 : this.index + 1;
            this.focused = this.items.item(this.index);
            this.focused.focus();
        }, 
        defineFocusToPrevItem() {
            this.index = this.index == 0 ? this.items.length - 1 : this.index - 1;
            this.focused = this.items.item(this.index);
            this.focused.focus();
        }, 
    }, 

    created() {
        this.symbols = symbols;
        this.arrows = arrows;
        this.currencies = currencies;
        this.letters = letters;
        this.math = math;
        this.numbers = numbers;
        this.punctuation = punctuation;
    }
};
</script>

<style scoped>
.symbols-enter-active,
.symbols-leave-active {
    transition: all 0.3s ease;
}
.symbols-enter-from,
.symbols-leave-to {
    opacity: 0;
}
</style>