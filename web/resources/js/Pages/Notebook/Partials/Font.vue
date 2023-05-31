<template>
    <div class="flex flex-nowrap">
        <ul role="menubar" class="border-gray-300 dark:border-gray-600 border-r">
            <li role="menuitem" class="mb-2">
                <TabLinkComponent @click="openSerif" :active="isOpenSerif" :aria-controls="serifToken" align="right" class="w-full text-right px-2">
                    Serif
                </TabLinkComponent>
            </li>
            <li role="menuitem" class="mb-2">
                <TabLinkComponent @click="openSans" :active="isOpenSans" :aria-controls="sansToken" align="right" class="w-full text-right px-2">
                    Sans
                </TabLinkComponent>
            </li>
            <li role="menuitem" class="mb-2">
                <TabLinkComponent @click="openCursive" :active="isOpenCursive" :aria-controls="cursiveToken" align="right" class="w-full text-right px-2">
                    Cursive
                </TabLinkComponent>
            </li>
            <li role="menuitem" class="mb-2">
                <TabLinkComponent @click="openFantasy" :active="isOpenFantasy" :aria-controls="fantasyToken" align="right" class="w-full text-right px-2">
                    Fantasy
                </TabLinkComponent>
            </li>
            <li role="menuitem">
                <TabLinkComponent @click="openMono" :active="isOpenMono" :aria-controls="isOpenMono" align="right" class="w-full text-right px-2">
                    Mono
                </TabLinkComponent>
            </li>
        </ul>
        <div ref="menu" class="flex-auto overflow-y-auto h-52">
            <transition 
                mode="out-in"
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0"
                leave-active-class="transition ease-in duration-200"
                leave-to-class="opacity-0"
                >

                <ul v-if="isOpenSerif" role="menu" :id="serifToken" class="px-2 overflow-y-auto h-52">
                    <li role="menuitem" v-for="(item, index) in fonts.serif" class="mb-2 last:mb-0">
                        <CardButtonComponent class="w-full text-left py-1 px-2" @click="$emit('update:font', {family: 'serif', name: item})">
                            <div class="text-xs text-gray-600 dark:text-gray-400">
                                {{ item }}
                            </div>
                            <div class="truncate text-gray-800 dark:text-gray-200 text-2xl" :style="{fontFamily: `'${item}', serif`}">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
            menu: null, 
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

    methods: {
        defineValues() {
            this.menu = $(this.$refs.menu);
            this.items = this.menu.find('.card:not([tabindex=-1])');
        }, 
        defineFocus() {
            this.items.first().focus();
        },
        afterEnter() {
            this.defineValues();
            this.defineFocus();
        }, 
        openSerif() {
            this.closeAll();
            this.isOpenSerif = true;
        }, 
        closeSerif() {
            this.isOpenSerif = false;
        }, 
        openSans() {
            this.closeAll();
            this.isOpenSans = true;
        }, 
        closeSans() {
            this.isOpenSans = false;
        }, 
        openCursive() {
            this.closeAll();
            this.isOpenCursive = true;
        }, 
        closeCursive() {
            this.isOpenCursive = false;
        }, 
        openFantasy() {
            this.closeAll();
            this.isOpenFantasy = true;
        }, 
        closeFantasy() {
            this.isOpenFantasy = false;
        }, 
        openMono() {
            this.closeAll();
            this.isOpenMono = true;
        }, 
        closeMono() {
            this.isOpenMono = false;
        }, 
        closeAll() {
            this.closeSerif();
            this.closeSans();
            this.closeCursive();
            this.closeFantasy();
            this.closeMono();
        }, 
    }, 

    mounted() {
        this.fonts = fonts;
        this.openSerif();
    }
};
</script>