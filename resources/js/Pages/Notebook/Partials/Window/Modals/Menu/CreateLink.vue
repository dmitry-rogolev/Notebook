<template>
    <CreateLinkModalPartial ref="modal" triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <div class="flex flex-nowrap items-center">
            <div class="flex-auto">
                <i class="fa-solid fa-link w-6 text-center mr-2"></i>
                <span>{{ $t('Link') }}</span>
            </div>
            <div class="text-xs font-bold">Alt + L</div>
        </div>
    </CreateLinkModalPartial>
</template>

<script>
import CreateLinkModalPartial from '../CreateLink.vue';

export default {
    name: 'CreateLinkWindowMenuModalPartial', 

    components: {
        CreateLinkModalPartial, 
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
                // Create link
                if (e.altKey && e.code == 'KeyL') {
                    this.$refs.modal.show();
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
