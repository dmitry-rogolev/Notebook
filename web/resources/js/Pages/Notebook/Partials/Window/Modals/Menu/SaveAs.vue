<template>
    <SaveAsModalComponent ref="modal" triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <div class="flex flex-nowrap items-center">
            <div class="flex-auto">
                <i class="fa-solid fa-file-arrow-down w-6 text-center mr-2"></i>
                <span>Save as</span>
            </div>
            <div class="text-xs font-bold">Alt + A</div>
        </div>
    </SaveAsModalComponent>
</template>

<script>
import SaveAsModalComponent from '../SaveAs.vue';

export default {
    name: 'SaveAsMenuModalWindowPartial', 

    components: {
        SaveAsModalComponent, 
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

            // Save as
            if (e.altKey && e.code == 'KeyA') {
                this.modal.show();
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
