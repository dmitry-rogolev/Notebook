<template>
    <div class="flex">

        <input 
            @input="$emit('update:modelValue', $event.target.value)" 
            :value="modelValue" 
            type="text" 
            class="flex-auto px-3 sm:px-4 md:px-5 py-2 bg-gray-50 dark:bg-slate-800 border-0 border-b border-r border-gray-300 dark:border-gray-600 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 text-xl focus:ring-0 focus-visible:outline-none" 
            placeholder="Enter the title" 
            />
        
        <button 
            @click="$emit('delete:note')" 
            type="button" 
            class="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700 border-b border-r border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 text-gray-700 dark:text-gray-300 select-none focus-visible:outline-none transition duration-200 ease-in-out print:hidden"
            >
            <i class="fa-solid fa-trash"></i>
        </button>

        <SelectorComponent 
            @toggle:case="isCase = ! isCase" 
            @close="$emit('close:selector')" 
            @update:replaceModelValue="replaceValue = $event" 
            @update:selectModelValue="foundValue = $event" 
            @replace="replaceFound"
            @undo="undoReplace"
            :selectModelValue="foundValue"
            :replaceModelValue="replaceValue"
            :active="activeSelector" 
            :replacerActive="activeReplacer" 
            :case="isCase"
            />

    </div>
</template>

<script>
import SelectorComponent from '@/Components/Selector.vue';
import { escapeHtml, escapeRegex, cutTags } from '@/helpers';

export default {
    name: 'WindowHeaderPartial', 

    components: {
        SelectorComponent
    }, 

    emits: [
        'update:modelValue', 
        'delete:note', 
        'close:selector', 
        'clear:found', 
        'update:recordText', 
    ], 

    data () {
        return {
            case: true, 
            found: '',
            replaceValue: '',
        };
    },

    computed: {
        foundValue: {
            get() {
                return this.found;
            }, 
            set(v) {
                this.found = v;
                if (this.found) {
                    this.selectFound();
                } else {
                    this.clearFound();
                }
            }, 
        }, 
        isCase: {
            get() {
                return this.case;
            }, 
            set(v) {
                this.case = v;
                if (this.found) {
                    this.selectFound();
                }
            }, 
        }, 
    }, 

    props: {
        record: {
            type: Object,
            required: true, 
        },
        modelValue: {
            type: String, 
            default: '', 
        }, 
        activeSelector: {
            type: Boolean, 
            default: false, 
        }, 
        activeReplacer: {
            type: Boolean, 
            default: false, 
        },
    },

    methods: {
        closeSelector() {
            this.foundValue = '';
        }, 
        closeReplacer() {
            this.replaceValue = '';
        },  
        select(search = '', replace = null, isCase = true) {
            if (search) {
                if (typeof replace == 'boolean') {
                    isCase = replace;
                    replace = null;
                }

                let text = this.record.text, 
                    tagRegexp = new RegExp('<\/?[^>]+>', 'igm'), 
                    searchRegexp = new RegExp('(' + escapeHtml(escapeRegex(search)) + ')', isCase ? 'igm' : 'gm'), 
                    result = '', from = 0, to = 0, found = '', sub = '';

                while (found = tagRegexp.exec(text)) {
                    to = tagRegexp.lastIndex - found[0].length;

                    if (to < 0) {
                        to = 0;
                    }

                    sub = text.slice(from, to);

                    if (sub) {
                        sub = sub.replace(searchRegexp, '<a class="bg-indigo-200 dark:bg-indigo-900">' + (replace ?? '$1') + '</a>');
                    }

                    result = result.concat(sub, found[0]);

                    from = tagRegexp.lastIndex;
                }

                if (from < text.length) {
                    sub = text.slice(from);

                    if (sub) {
                        sub = sub.replace(searchRegexp, '<a class="bg-indigo-200 dark:bg-indigo-900">' + (replace ?? '$1') + '</a>');
                        result = result.concat(sub);
                    }
                }

                this.$parent.$parent.$refs.contenteditable.$el.innerHTML = result;

                if (replace) {
                    this.$emit('update:recordText', cutTags(this.$parent.$parent.$refs.contenteditable.$el.innerHTML));
                }
            }
        }, 
        selectFound() {
            this.select(this.foundValue, this.isCase);
        }, 
        replaceFound() {
            if (this.replaceValue) {
                this.select(this.foundValue, this.replaceValue, this.isCase);
            }
        }, 
        undoReplace() {
            if (this.foundValue) {
                this.select(this.replaceValue, this.foundValue, this.isCase);
            }
        }, 
        clearFound() {
            this.$emit('clear:found');
        }, 
    }, 
}
</script>

<style scoped>

</style>
