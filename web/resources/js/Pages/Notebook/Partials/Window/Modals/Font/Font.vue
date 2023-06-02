<template>
    <div class="flex flex-nowrap">

        <ul role="menubar" class="border-gray-300 dark:border-gray-600 border-r">

            <li role="menuitem" class="mb-2">
                <TabLinkComponent @click="closeAll(); isOpenSerif = true" :active="isOpenSerif" :aria-controls="serifToken" align="right" class="w-full text-right px-2">
                    Serif
                </TabLinkComponent>
            </li>

            <li role="menuitem" class="mb-2">
                <TabLinkComponent @click="closeAll(); isOpenSans = true" :active="isOpenSans" :aria-controls="sansToken" align="right" class="w-full text-right px-2">
                    Sans
                </TabLinkComponent>
            </li>

            <li role="menuitem" class="mb-2">
                <TabLinkComponent @click="closeAll(); isOpenCursive = true" :active="isOpenCursive" :aria-controls="cursiveToken" align="right" class="w-full text-right px-2">
                    Cursive
                </TabLinkComponent>
            </li>

            <li role="menuitem" class="mb-2">
                <TabLinkComponent @click="closeAll(); isOpenFantasy = true" :active="isOpenFantasy" :aria-controls="fantasyToken" align="right" class="w-full text-right px-2">
                    Fantasy
                </TabLinkComponent>
            </li>
            
            <li role="menuitem">
                <TabLinkComponent @click="closeAll(); isOpenMono = true" :active="isOpenMono" :aria-controls="isOpenMono" align="right" class="w-full text-right px-2">
                    Mono
                </TabLinkComponent>
            </li>

        </ul>

        <div ref="menu" class="flex-auto overflow-y-auto h-52">

            <transition name="font" mode="out-in" @after-enter="afterEnter">

                <ul v-if="isOpenSerif" role="menu" :id="serifToken" class="px-2 overflow-y-auto h-52">
                    <li role="menuitem" v-for="(item, index) in fonts.serif" class="mb-2 last:mb-0">
                        <CardButtonComponent class="w-full text-left py-1 px-2" @click="$emit('update:font', {family: 'serif', name: item})">
                            <div class="text-xs text-gray-600 dark:text-gray-400">
                                {{ item }}
                            </div>
                            <div class="truncate text-gray-800 dark:text-gray-200 text-2xl" :style="{fontFamily: `'${item}', serif`}">
                                {{ exampleText }}
                            </div>
                        </CardButtonComponent>
                    </li>
                </ul>

                <ul v-else-if="isOpenSans" role="menu" :id="sansToken" class="px-2 overflow-y-auto h-52">
                    <li role="menuitem" v-for="(item, index) in fonts['sans-serif']" class="mb-2 last:mb-0">
                        <CardButtonComponent class="w-full text-left py-1 px-2" @click="$emit('update:font', {family: 'sans-serif', name: item})">
                            <div class="text-xs text-gray-600 dark:text-gray-400">
                                {{ item }}
                            </div>
                            <div class="truncate text-gray-800 dark:text-gray-200 text-2xl" :style="{fontFamily: `'${item}', sans-serif`}">
                                {{ exampleText }}
                            </div>
                        </CardButtonComponent>
                    </li>
                </ul>

                <ul v-else-if="isOpenCursive" role="menu" :id="cursiveToken" class="px-2 overflow-y-auto h-52">
                    <li role="menuitem" v-for="(item, index) in fonts.cursive" class="mb-2 last:mb-0">
                        <CardButtonComponent class="w-full text-left py-1 px-2" @click="$emit('update:font', {family: 'cursive', name: item})">
                            <div class="text-xs text-gray-600 dark:text-gray-400">
                                {{ item }}
                            </div>
                            <div class="truncate text-gray-800 dark:text-gray-200 text-2xl" :style="{fontFamily: `'${item}', cursive`}">
                                {{ exampleText }}
                            </div>
                        </CardButtonComponent>
                    </li>
                </ul>

                <ul v-else-if="isOpenFantasy" role="menu" :id="fantasyToken" class="px-2 overflow-y-auto h-52">
                    <li role="menuitem" v-for="(item, index) in fonts.fantasy" class="mb-2 last:mb-0">
                        <CardButtonComponent class="w-full text-left py-1 px-2" @click="$emit('update:font', {family: 'fantasy', name: item})">
                            <div class="text-xs text-gray-600 dark:text-gray-400">
                                {{ item }}
                            </div>
                            <div class="truncate text-gray-800 dark:text-gray-200 text-2xl" :style="{fontFamily: `'${item}', fantasy`}">
                                {{ exampleText }}
                            </div>
                        </CardButtonComponent>
                    </li>
                </ul>

                <ul v-else-if="isOpenMono" role="menu" :id="isOpenMono" class="px-2 overflow-y-auto h-52">
                    <li role="menuitem" v-for="(item, index) in fonts.monospace" class="mb-2 last:mb-0">
                        <CardButtonComponent class="w-full text-left py-1 px-2" @click="$emit('update:font', {family: 'monospace', name: item})">
                            <div class="text-xs text-gray-600 dark:text-gray-400">
                                {{ item }}
                            </div>
                            <div class="truncate text-gray-800 dark:text-gray-200 text-2xl" :style="{fontFamily: `'${item}', monospace`}">
                                {{ exampleText }}
                            </div>
                        </CardButtonComponent>
                    </li>
                </ul>

            </transition>

        </div>

    </div>
</template>

<script>
import TabLinkComponent from '@/Components/TabLink.vue';
import CardButtonComponent from '@/Components/CardButton.vue';
import { token } from '@/helpers';
import { faker } from '@faker-js/faker';
import fonts from '@/assets/fonts.json';

export default {
    name: 'FontPartial', 

    components: {
        TabLinkComponent, 
        CardButtonComponent, 
    }, 

    emits: [
        'update:font', 
    ], 

    data() {
        return {
            items: null, 
            fonts: null, 
            serifToken: token(), 
            sansToken: token(), 
            cursiveToken: token(), 
            fantasyToken: token(), 
            monoToken: token(), 
            isOpenSerif: false, 
            isOpenSans: false, 
            isOpenCursive: false, 
            isOpenFantasy: false, 
            isOpenMono: false, 
        };
    }, 

    computed: {
        exampleText() {
            return faker.lorem.lines(1);
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
            this.isOpenSerif = false;
            this.isOpenSans = false;
            this.isOpenCursive = false;
            this.isOpenFantasy = false;
            this.isOpenMono = false;
        }, 
    }, 

    mounted() {
        this.fonts = fonts;
        this.isOpenSerif = true;
    }
};
</script>

<style scoped>
.font-enter-active,
.font-leave-active {
  transition: all 0.3s ease;
}
.font-enter-from,
.font-leave-to {
  opacity: 0;
}
</style>