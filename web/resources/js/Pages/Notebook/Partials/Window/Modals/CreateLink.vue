<template>
    <ModalComponent :active="active" @close="$emit('close')" @after-enter="afterEnter" @after-leave="afterLeave">

        <template #header>
            <div class="px-4 py-2">
                Insert link
            </div>
        </template>

        <template #content>

            <div class="px-4 py-2 flex flex-nowrap">
                <InputComponent 
                    ref="input"
                    v-model="link" 
                    type="text" 
                    class="rounded-r-none border-r-0 block flex-auto" 
                    placeholder="Enter your link..." 
                    />
                <button 
                    @click="add"
                    type="button" 
                    class="block px-3 py-2 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 border-indigo-500 dark:border-indigo-600 border text-gray-300 transition duration-200 ease-in-out rounded-r-md focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600">
                    Add
                </button>
            </div>

        </template>

    </ModalComponent>
</template>

<script>
import ModalComponent from '@/Components/Modal.vue';
import InputComponent from '@/Components/TextInput.vue';

export default {
    name: 'ModalCreateLinkPartial', 

    components: {
        ModalComponent, 
        InputComponent, 
    }, 

    emits: [
        'added:link', 
        'close', 
    ], 

    data() {
        return {
            link: '', 
            range: null, 
            added: false, 
        };
    },

    props: {
        active: {
            type: Boolean,
            default: false, 
        },
    },

    methods: {
        afterEnter() {
            this.range = window.getSelection().getRangeAt(0);
            this.defineFocus();
        }, 
        afterLeave() {
            if (this.added) {
                let selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(this.range);
                this.$emit('added:link', this.link); 
                this.added = false;
            }
        }, 
        defineFocus() {
            this.$refs.input.$el.focus();
        }, 
        add() {
            this.added = true;
            this.$emit('close');
        }, 
    }
}
</script>

<style scoped>

</style>
