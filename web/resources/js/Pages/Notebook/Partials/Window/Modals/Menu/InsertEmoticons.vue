<template>
    <InsertEmoticonsModalComponent ref="modal" triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <div class="flex flex-nowrap items-center">
            <div class="flex-auto">
                <i class="fa-solid fa-face-grin-wink w-6 text-center mr-2"></i>
                <span>Emoticons</span>
            </div>
            <div class="text-xs font-bold">Alt + E</div>
        </div>
    </InsertEmoticonsModalComponent>
</template>

<script>
import InsertEmoticonsModalComponent from '../InsertEmoticons.vue';

export default {
    name: 'InsertEmoticonsWindowMenuModalPartial', 

    components: {
        InsertEmoticonsModalComponent, 
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

            // Insert emoticons
            if (e.altKey && e.code == 'KeyE') {
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
