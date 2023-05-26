<template>
    <transition name="selector">
        <section 
            v-if="active"
            tabindex="-1"
            class="absolute top-0 right-0 m-4 flex flex-nowrap z-30 shadow-lg"
            >
            <InputComponent 
                class="flex-auto rounded-r-none"
                type="text" 
                placeholder="Search" 
                />
            <button @click="$emit('close')" type="button" class="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-l-0 border-gray-300 dark:border-gray-600 focus-visible:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 rounded-r-md px-4 transition duration-200 ease-in-out">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </section>
    </transition>
</template>

<script>
import InputComponent from '@/Components/TextInput.vue';

export default {
    name: 'SelectorComponent', 

    components: {
        InputComponent, 
    }, 

    emits: [
        'close', 
    ], 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
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
    }, 
};
</script>

<style scoped>
.selector-enter-active,
.selector-leave-active {
  transition: all 0.5s ease;
}
.selector-enter-from,
.selector-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>