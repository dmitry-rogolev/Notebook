<template>
    <ItemSidebarComponent
        :class="{'bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 cursor-pointer dark:hover:bg-slate-700': note.id != this.currentNote?.id, 'bg-indigo-200 dark:bg-indigo-900 cursor-default': note.id == this.currentNote?.id}"
        class="p-2 lg:p-3 border-b border-gray-300 dark:border-gray-600 transition duration-200 ease-in-out select-none w-full text-left focus-visible:outline-none focus:bg-indigo-200 dark:focus:bg-indigo-900"
        >
        <div class="flex flex-nowrap">
            <div class="flex-auto truncate text-base lg:text-lg font-bold text-gray-700 dark:text-gray-300">{{ note.title ? note.title : $t('No name') }}</div>
            <div v-show="changed" :title="$t('Changed')" class="bg-gray-600 dark:bg-gray-300 rounded-full w-3 h-3 min-w-[0.75rem] min-h-[0.75rem]"></div>
        </div>
        <div v-show="note.text && detailed" class="truncate text-sm lg:text-base text-gray-700 dark:text-gray-300">{{ cutTags(note.text) }}</div>
        <div v-show="detailed && updated" class="truncate text-xs lg:text-sm text-gray-600 dark:text-gray-400">{{ updated }}</div>
        <div v-show="detailed && deleted" class="truncate text-xs lg:text-sm text-gray-600 dark:text-gray-400">{{ deleted }}</div>
    </ItemSidebarComponent>
</template>

<script>
import ItemSidebarComponent from '@/Plugins/Sidebar/Components/Item.vue';
import { cutTags } from '../../../../Classes/helpers';

export default {
    name: 'NoteSidebarPartial', 

    components: {
        ItemSidebarComponent, 
    }, 

    data() {
        return {
            timer: null, 
            updated: '', 
            deleted: '', 
        };
    },

    computed: {
        currentNote() {
            return this.$window.file;
        }, 
        changed() {
            this.setDateAgo();
            return this.note.isDirty;
        }, 
        detailed() {
            return this.$sidebar.isDetailed;
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
        setDateAgo() {
            if (this.note.isTrashed) {
                this.deleted = this.dateDiff(this.note.deleted_at);
            } else {
                this.updated = this.dateDiff(this.note.updated_at);
            }
        }, 
        addTimer() {
            this.timer = setInterval(this.setDateAgo, 60000);
        },
        clearTimer() {
            clearInterval(this.timer);
        },
        dateDiff(date) {
            let diff = new Date() - new Date(date);
            let ago = '';

            diff /= 1000;
            ago = this.$t('seconds', Math.round(diff));

            if (diff > 60) {
                diff /= 60;
                ago = this.$t('minutes', Math.round(diff));

                if (diff > 60) {
                    diff /= 60;
                    ago = this.$t('hours', Math.round(diff));

                    if (diff > 24) {
                        diff /= 24;
                        ago = this.$t('days', Math.round(diff));

                        if (diff > 31) {
                            diff /= 31;
                            ago = this.$t('monthes', Math.round(diff));

                            if (diff > 12) {
                                diff /= 12;
                                ago = this.$t('years', Math.round(diff));
                            }
                        }
                    }
                }
            }

            return ago + ' ' + this.$t('ago');
        }, 
    }, 

    mounted() {
        this.setDateAgo();
        this.addTimer();
    }, 

    unmounted() {
        this.clearTimer();
    }, 
}
</script>

<style scoped>

</style>
