<template>
    <ItemSidebarComponent
        :class="{'bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 cursor-pointer dark:hover:bg-slate-700': note.id != this.currentNote?.id, 'bg-indigo-200 dark:bg-indigo-900 cursor-default': note.id == this.currentNote?.id}"
        class="p-2 lg:p-3 border-b border-gray-300 dark:border-gray-600 transition duration-200 ease-in-out select-none w-full text-left focus-visible:outline-none focus:bg-indigo-200 dark:focus:bg-indigo-900"
        >
        <div class="flex flex-nowrap">
            <div v-if="htmlMode" class="flex-auto truncate text-base lg:text-lg font-bold text-gray-700 dark:text-gray-300" v-html="note.title ? note.title : 'No name'"></div>
            <div v-else class="flex-auto truncate text-base lg:text-lg font-bold text-gray-700 dark:text-gray-300">{{ note.title ? note.title : 'No name' }}</div>
            <div v-show="changed" title="Changed" class="bg-gray-600 dark:bg-gray-300 rounded-full w-3 h-3 min-w-[0.75rem] min-h-[0.75rem]"></div>
        </div>
        <div v-if="note.text && htmlMode" class="truncate text-sm lg:text-base text-gray-700 dark:text-gray-300" v-html="cutTags(note.text)"></div>
        <div v-if="note.text && ! htmlMode" class="truncate text-sm lg:text-base text-gray-700 dark:text-gray-300">{{ cutTags(note.text) }}</div>
        <div class="truncate text-xs lg:text-sm text-gray-600 dark:text-gray-400">{{ note.updated }}</div>
    </ItemSidebarComponent>
</template>

<script>
import ItemSidebarComponent from '@/Plugins/Sidebar/Components/Item.vue';
import { cutTags } from '@/helpers';

export default {
    name: 'NoteSidebarPartial', 

    components: {
        ItemSidebarComponent, 
    }, 

    computed: {
        currentNote() {
            return this.$notebook.note;
        }, 
        changed() {
            return this.$notebook.notes.find((v) => v.id === this.note.id).changed;
        }, 
    }, 

    props: {
        note: {
            type: Object, 
            required: true, 
        }, 
        htmlMode: {
            type: Boolean, 
            default: false, 
        }, 
    }, 

    watch: {
        note() {
            this.toDateFormat();
        }, 
    }, 

    methods: {
        cutTags(str) {
            return cutTags(str);
        }, 
        toDateFormat() {
            this.note.updated = this.dateDiff(this.note.updated_at);
        }, 
        dateDiff(date) {
            let diff = new Date() - new Date(date);
            let postfix = '';

            diff /= 1000;
            postfix = 'seconds';

            if (diff > 60) {
                diff /= 60;
                postfix = 'minutes';

                if (diff > 60) {
                    diff /= 60;
                    postfix = 'hours';

                    if (diff > 24) {
                        diff /= 24;
                        postfix = 'days';

                        if (diff > 31) {
                            diff /= 31;
                            postfix = 'monthes';

                            if (diff > 12) {
                                diff /= 12;
                                postfix = 'years';
                            }
                        }
                    }
                }
            }

            return Math.round(diff) + ' ' + postfix + ' ago';
        }, 
    }, 

    mounted() {
        this.toDateFormat();
    }, 
}
</script>

<style scoped>

</style>
