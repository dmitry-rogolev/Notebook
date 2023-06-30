<template>
    <div>
        <TriggerComponent v-bind="$attrs" @click="modal.show()" :class="[triggerClass]">
            <slot></slot>
        </TriggerComponent>
        <teleport to="body">
            <ModalComponent ref="modal" @close="modal.hide()">
                <template #header>
                    <div class="px-4 py-2">
                        {{ $t('Insert symbols') }}
                    </div>
                </template>
                <template #content>
                    <div class="px-4 pb-4 pt-2 overflow-hidden">

                        <ul role="menubar" class="flex flex-nowrap border-b border-gray-300 dark:border-gray-600 mb-3">
                            
                            <li role="menuitem" class="mr-2">
                                <TabLinkComponent class="pb-2" @click="closeAll(); isOpenSymbols = true;" :active="isOpenSymbols" :aria-controls="symbolsToken" :title="$t('Symbols')">
                                    <i class="fa-solid fa-at text-center px-3"></i>
                                </TabLinkComponent>
                            </li>
        
                            <li role="menuitem" class="mr-2">
                                <TabLinkComponent class="pb-2" @click="closeAll(); isOpenArrows = true;" :active="isOpenArrows" :aria-controls="arrowsToken" :title="$t('Arrows')">
                                    <i class="fa-solid fa-arrows-up-down-left-right text-center px-3"></i>
                                </TabLinkComponent>
                            </li>
        
                            <li role="menuitem" class="mr-2">
                                <TabLinkComponent class="pb-2" @click="closeAll(); isOpenCurrencies = true;" :active="isOpenCurrencies" :aria-controls="currenciesToken" :title="$t('Currencies')">
                                    <i class="fa-solid fa-wallet text-center px-3"></i>
                                </TabLinkComponent>
                            </li>
        
                            <li role="menuitem" class="mr-2">
                                <TabLinkComponent class="pb-2" @click="closeAll(); isOpenLetters = true;" :active="isOpenLetters" :aria-controls="lettersToken" :title="$t('Letters')">
                                    <i class="fa-solid fa-font text-center px-3"></i>
                                </TabLinkComponent>
                            </li>
        
                            <li role="menuitem" class="mr-2">
                                <TabLinkComponent class="pb-2" @click="closeAll(); isOpenMath = true;" :active="isOpenMath" :aria-controls="mathToken" :title="$t('Math')">
                                    <i class="fa-solid fa-square-root-variable text-center px-3"></i>
                                </TabLinkComponent>
                            </li>
                            
                            <li role="menuitem" class="mr-2">
                                <TabLinkComponent class="pb-2" @click="closeAll(); isOpenNumbers = true;" :active="isOpenNumbers" :aria-controls="numbersToken" :title="$t('Numbers')">
                                    <i class="fa-solid fa-5 text-center px-3"></i>
                                </TabLinkComponent>
                            </li>
        
                            <li role="menuitem" class="mr-2">
                                <TabLinkComponent class="pb-2" @click="closeAll(); isOpenPunctuation = true;" :active="isOpenPunctuation" :aria-controls="punctuationToken" :title="$t('Punctuation')">
                                    <i class="fa-regular fa-question text-center px-3"></i>
                                </TabLinkComponent>
                            </li>
        
                        </ul>
        
                        <div ref="menu">
        
                            <ul v-if="isOpenSymbols" :id="symbolsToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                                <li v-for="item in symbols" role="menuitem" class="m-1">
                                    <CardButtonComponent class="py-2 w-10 text-sm" @click="$editable.execCommand('insertHTML', item.htmlCode); modal.hide();" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                                </li>
                            </ul>
    
                            <ul v-else-if="isOpenArrows" :id="arrowsToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                                <li v-for="item in arrows" role="menuitem" class="m-1">
                                    <CardButtonComponent class="py-2 w-10 text-sm" @click="$editable.execCommand('insertHTML', item.htmlCode); modal.hide();" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                                </li>
                            </ul>
    
                            <ul v-else-if="isOpenCurrencies" :id="currenciesToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                                <li v-for="item in currencies" role="menuitem" class="m-1">
                                    <CardButtonComponent class="py-2 w-10 text-sm" @click="$editable.execCommand('insertHTML', item.htmlCode); modal.hide();" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                                </li>
                            </ul>
    
                            <ul v-else-if="isOpenLetters" :id="lettersToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                                <li v-for="item in letters" role="menuitem" class="m-1">
                                    <CardButtonComponent class="py-2 w-10 text-sm" @click="$editable.execCommand('insertHTML', item.htmlCode); modal.hide();" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                                </li>
                            </ul>
    
                            <ul v-else-if="isOpenMath" :id="mathToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                                <li v-for="item in math" role="menuitem" class="m-1">
                                    <CardButtonComponent class="py-2 w-10 text-sm" @click="$editable.execCommand('insertHTML', item.htmlCode); modal.hide();" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                                </li>
                            </ul>
    
                            <ul v-else-if="isOpenNumbers" :id="numbersToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                                <li v-for="item in numbers" role="menuitem" class="m-1">
                                    <CardButtonComponent class="py-2 w-10 text-sm" @click="$editable.execCommand('insertHTML', item.htmlCode); modal.hide();" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                                </li>
                            </ul>
    
                            <ul v-else-if="isOpenPunctuation" :id="punctuationToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                                <li v-for="item in punctuation" role="menuitem" class="m-1">
                                    <CardButtonComponent class="py-2 w-10 text-sm" @click="$editable.execCommand('insertHTML', item.htmlCode); modal.hide();" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                                </li>
                            </ul>
        
                        </div>
        
                    </div>
                </template>
            </ModalComponent>
        </teleport>
    </div>
</template>

<script>
import ModalComponent from '@/Components/Modal/Modal.vue';
import TriggerComponent from '@/Components/Modal/Trigger.vue';
import { Modal } from 'flowbite';
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
    name: 'InsertSymbolsWindowModalPartial', 

    components: {
        ModalComponent, 
        TriggerComponent, 
        TabLinkComponent, 
        CardButtonComponent, 
    }, 

    data() {
        return {
            modal: null, 
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
        };
    }, 

    props: {
        triggerClass: {
            type: [ Array, String ],
            default: '', 
        },
    },

    methods: {
        initModal() {
            this.modal = new Modal(this.$refs.modal.$el, {
                placement: 'center-center', 
                backdrop: 'dynamic', 
                closable: true, 
                onShow: () => {
                    this.closeAll();
                    this.isOpenSymbols = true;
                }, 
                onHide: () => {
                    this.dropzone = null;
                }, 
            });
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
    }, 

    created() {
        this.symbols = symbols;
        this.arrows = arrows;
        this.currencies = currencies;
        this.letters = letters;
        this.math = math;
        this.numbers = numbers;
        this.punctuation = punctuation;
    }, 

    mounted() {
        this.initModal();
    }, 
};
</script>

<style scoped>

</style>