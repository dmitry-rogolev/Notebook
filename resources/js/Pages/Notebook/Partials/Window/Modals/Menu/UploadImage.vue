<template>
    <UploadImageModalComponent ref="modal" triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <div class="flex flex-nowrap items-center">
            <div class="flex-auto">
                <i class="fa-solid fa-image w-6 text-center mr-2"></i>
                <span>{{ $t('Image') }}</span>
            </div>
            <div class="text-xs font-bold">Alt + I</div>
        </div>
    </UploadImageModalComponent>
</template>

<script>
import UploadImageModalComponent from '../UploadImage.vue';

export default {
    name: 'UploadImageWindowMenuModalPartial', 

    components: {
        UploadImageModalComponent, 
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
                // Insert image
                if (e.altKey && e.code == 'KeyI') {
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
