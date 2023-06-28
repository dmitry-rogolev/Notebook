<template>
    <InsertSymbolsModalComponent ref="modal" triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <div class="flex flex-nowrap items-center">
            <div class="flex-auto">
                <i class="fa-solid fa-icons w-6 text-center mr-2"></i>
                <span>Symbols</span>
            </div>
            <div class="text-xs font-bold">Alt + Y</div>
        </div>
    </InsertSymbolsModalComponent>
</template>

<script>
import InsertSymbolsModalComponent from '../InsertSymbols.vue';

export default {
    name: 'InsertSymbolsWindowMenuModalPartial', 

    components: {
        InsertSymbolsModalComponent, 
    }, 

    computed: {
        modal() {
            return this.$refs.modal.modal;
        }
    },

    methods: {
        addKeyUpEventListener() {
            document.addEventListener('keyup', this.keyup);
        }, 
        removeKeyUpEventListener() {
            document.removeEventListener('keyup', this.keyup);
        }, 
        keyup(e) {
            e.preventDefault();
            e.stopPropagation();

            if (this.$window.file.id && ! this.$window.file.isTrashed) {
                // Insert symbols
                if (e.altKey && e.code == 'KeyY') {
                    this.modal.show();
                } 
            }
        }, 
    }, 

    mounted() {
        this.addKeyUpEventListener();
    }, 

    unmounted() {
        this.removeKeyUpEventListener();
    }, 
}
</script>

<style scoped>

</style>
