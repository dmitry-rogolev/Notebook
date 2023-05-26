<template>
    <button 
        type="button"
        role="menuitem"
        class="p-2 lg:p-3 border-b border-gray-300 dark:border-gray-600 transition duration-200 ease-in-out select-none w-full text-left focus-visible:outline-none focus:bg-indigo-200 dark:focus:bg-indigo-900"
        :class="{'bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 cursor-pointer dark:hover:bg-slate-700': !active, 'bg-indigo-200 dark:bg-indigo-900 cursor-default': active}"
        >
        <h5 class="truncate text-base lg:text-lg font-bold text-gray-700 dark:text-gray-300">{{ note.title ?? 'No name' }}</h5>
        <p v-if="note.text" class="truncate text-sm lg:text-base text-gray-700 dark:text-gray-300">{{ note.text }}</p>
        <p class="truncate text-xs lg:text-sm text-gray-600 dark:text-gray-400">{{ note.updated }}</p>
    </button>
</template>

<script>
export default {
    name: 'BarNoteComponent', 

    props: {
        note: {
            type: Object, 
            required: true, 
        }, 
        active: {
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
};
</script>