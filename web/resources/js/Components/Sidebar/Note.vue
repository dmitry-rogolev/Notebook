<template>
    <div 
        class="p-2 border-b-2 border-solid border-white dark:border-gray-800 transition duration-200 ease-in-out select-none"
        :class="{'bg-gray-50 dark:bg-gray-700 cursor-pointer hover:opacity-80': !active, 'bg-indigo-200 dark:bg-indigo-800 cursor-default': active}"
        >
        <h5 class="truncate text-sm md:text-base font-bold text-gray-900 dark:text-gray-100">{{ note.title }}</h5>
        <p class="truncate text-xs md:text-sm text-gray-700 dark:text-gray-300">{{ note.text }}</p>
        <p class="truncate text-xs text-gray-600 dark:text-gray-400">{{ note.updated }}</p>
    </div>
</template>

<script>
export default {
    name: 'BarNoteComponent', 

    data() {
        return {

        };
    }, 

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