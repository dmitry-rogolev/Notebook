<template>
    <MarkComponent 
        class="shadow-lg rounded-lg top-10 right-2 w-80 border-gray-300 dark:border-gray-600 border bg-white dark:bg-gray-800"
        dividerClass="border-gray-300 dark:border-gray-600 border-b"
        >
        <template #find>
            <input 
                type="text" 
                v-model="keyword"
                :placeholder="$t('Find')" 
                class="w-full focus-visible:outline-none border-0 rounded-l-lg text-gray-700 dark:text-gray-300 focus:ring-0 bg-white dark:bg-gray-800"
                />

            <button 
                type="button"
                @click="this.case = ! this.case; $mark.toggleCase();"
                class="px-4 focus-visible:outline-none text-gray-700 dark:text-gray-300 border-0 transition duration-200 ease-in-out"
                :class="this.case ? 'bg-gray-200 dark:bg-gray-700' : ''"
                :title="$t('Case sensitive')"
                >
                Aa
            </button>
            
            <button 
                @click="$mark.hide()" 
                type="button" 
                class="px-4 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus:bg-gray-200 dark:focus:bg-gray-700 text-gray-700 dark:text-gray-300 border-0 transition duration-200 ease-in-out"
                :class="showReplace ? 'rounded-tr-lg' : 'rounded-r-lg'"
                :title="$t('Close')"
                >
                <i class="fa-solid fa-xmark"></i>
            </button>
        </template>

        <template #replace>
            <input 
                type="text" 
                v-model="replace"
                :placeholder="$t('Replace')" 
                class="w-full focus-visible:outline-none focus:outline-none rounded-bl-lg border-0 text-gray-700 dark:text-gray-300 focus:border-gray-300 dark:focus:border-gray-600 focus:ring-0 bg-white dark:bg-gray-800"
                />

            <button 
                type="button"
                @click="$mark.undo(keyword);"
                class="px-4 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus:bg-gray-200 dark:focus:bg-gray-700 text-gray-700 dark:text-gray-300 border-0 transition duration-200 ease-in-out"
                :title="$t('Undo')"
                >
                <i class="fa-solid fa-rotate-left"></i>
            </button>
            
            <button 
                @click="$mark.replace(keyword, replace);" 
                type="button" 
                class="px-4 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus:bg-gray-200 dark:focus:bg-gray-700 rounded-br-lg text-gray-700 dark:text-gray-300 border-0 transition duration-200 ease-in-out"
                :title="$t('Replace')"
                >
                <i class="fa-solid fa-right-left"></i>
            </button>
        </template>
    </MarkComponent>
</template>

<script>
import MarkComponent from '@/Plugins/Mark/Components/Mark.vue';

export default {
    name: 'MarkPartial', 

    components: {
        MarkComponent, 
    }, 

    data() {
        return {
            search: '', 
            replace: '', 
            case: false, 
        };
    },

    computed: {
        showReplace() {
            return this.$mark.isShowReplace;
        }, 
        keyword: {
            get() {
                return this.search;
            }, 
            set(v) {
                this.search = v;
                this.$mark.find(v);
            }, 
        }, 
    },
}
</script>

<style scoped>

</style>
