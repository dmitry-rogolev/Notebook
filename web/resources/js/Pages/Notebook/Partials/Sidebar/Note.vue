<template>
    <ItemSidebarComponent
        :class="{'bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 cursor-pointer dark:hover:bg-slate-700': note.id != this.currentNote?.id, 'bg-indigo-200 dark:bg-indigo-900 cursor-default': note.id == this.currentNote?.id}"
        class="p-2 lg:p-3 border-b border-gray-300 dark:border-gray-600 transition duration-200 ease-in-out select-none w-full text-left focus-visible:outline-none focus:bg-indigo-200 dark:focus:bg-indigo-900"
        >
        <div class="truncate text-base lg:text-lg font-bold text-gray-700 dark:text-gray-300">{{ note.title ? note.title : 'No name' }}</div>
        <div v-if="note.text" class="truncate text-sm lg:text-base text-gray-700 dark:text-gray-300">{{ cutTags(note.text) }}</div>
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
    }, 

    props: {
        note: {
            type: Object, 
            required: true, 
        }, 
    }, 

    methods: {
        cutTags(str) {
            return cutTags(str);
        }, 
    }, 
}
</script>

<style scoped>

</style>
