<template>
    <transition name="selector" @after-enter="afterEnter">

        <section 
            v-if="active"
            tabindex="-1"
            class="absolute top-0 right-0 m-2 z-30 shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md transition-all duration-300 ease-in-out"
            >

            <div class="flex flex-nowrap">

                <InputComponent 
                    ref="search"
                    @update:modelValue="$emit('update:selectModelValue', $event)"
                    :modelValue="selectModelValue"
                    class="flex-auto rounded-r-none border-0 focus:ring-2 focus:z-40"
                    :class="{'rounded-bl-none': replacerActive}"
                    type="text" 
                    placeholder="Find" 
                    />

                <CheckboxButtonComponent class="border-0" @update:modelValue="$emit('toggle:case')" :modelValue="this.case" />
                
                <button 
                    @click="$emit('close')" 
                    type="button" 
                    class="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-0 focus-visible:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 rounded-r-md px-4 transition duration-200 ease-in-out"
                    :class="{'rounded-br-none': replacerActive}"
                    >
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </div>

            <transition name="replacer">

                <div v-if="replacerActive" class="flex flex-nowrap border-t border-gray-300 dark:border-gray-600">

                    <InputComponent 
                        @update:modelValue="$emit('update:replaceModelValue', $event)"
                        :modelValue="replaceModelValue"
                        class="flex-auto rounded-r-none border-0 rounded-tl-none focus:ring-2 focus:z-40"
                        type="text" 
                        placeholder="Replace" 
                        />

                    <button 
                        @click="$emit('undo')" 
                        type="button" 
                        class="border-0 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus-visible:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 px-4 transition duration-200 ease-in-out"
                        >
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>

                    <button 
                        @click="$emit('replace')" 
                        type="button" 
                        class="border-0 rounded-tr-none bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus-visible:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 rounded-r-md px-4 transition duration-200 ease-in-out"
                        >
                        <i class="fa-solid fa-right-left"></i>
                    </button>

                </div>

            </transition>

        </section>

    </transition>
</template>

<script>
import InputComponent from '@/Components/TextInput.vue';
import CheckboxButtonComponent from '@/Components/CheckboxButton.vue';

export default {
    name: 'SelectorComponent', 

    components: {
        InputComponent, 
        CheckboxButtonComponent, 
    }, 

    emits: [
        'close', 
        'update:selectModelValue', 
        'update:replaceModelValue', 
        'toggle:case', 
        'replace', 
        'undo', 
    ],

    data() {
        return {

        };
    }, 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
        case: {
            type: Boolean, 
            default: true, 
        }, 
        selectModelValue: {
            type: String, 
            default: '', 
        }, 
        replaceModelValue: {
            type: String, 
            default: '', 
        }, 
        replacerActive: false, 
    }, 

    watch: {
        active() {
            if (this.active) {
                this.defineListeners();
            } else {
                this.removeListeners();
            }
        }, 
    }, 

    methods: {
        defineListeners() {
            $(document).on('keyup', this.keyupHandler);
        }, 
        removeListeners() {
            $(document).off('keyup', this.keyupHandler);
        }, 
        keyupHandler(e) {
            e.stopPropagation();
            e.preventDefault();

            if (e.code == 'Escape') {
                this.$emit('close');
            }
        }, 
        afterEnter() {
            this.$refs.search.defineFocus();
        }, 
    }, 
};
</script>

<style scoped>
.selector-enter-active,
.selector-leave-active {
  transition: all 0.3s ease;
}
.selector-enter-from,
.selector-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.replacer-enter-active,
.replacer-leave-active {
  transition: all 0.3s ease;
}
.replacer-enter-from,
.replacer-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>