<template>
    <ModalComponent :active="active" @close="$emit('close')">
        <template #header>
            <div class="px-4 py-2 text-base">
                Add image
            </div>
        </template>
        <template #content>
            <div class="px-4 py-3">
                <div class="px-4 py-2 h-40 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-4 border-dashed rounded-lg flex justify-center items-center flex-col">
                    <div class="text-sm text-center mb-2 text-gray-700 dark:text-gray-300">
                        Drag an image to this area or select from the list of your files by clicking on the button.
                    </div>
                    <label 
                        :for="uploadImageToken"
                        tabindex="0"
                        class="px-8 py-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 border rounded-md focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 text-gray-700 dark:text-indigo-300 shadow-md cursor-pointer"
                        @drop="drop"
                        >
                        Select
                    </label>
                    <input type="file" :id="uploadImageToken" class="hidden" />
                </div>
            </div>
        </template>
    </ModalComponent>
</template>

<script>
import ModalComponent from '@/Components/Modal.vue';
import { token } from '@/helpers';

export default {
    name: 'UploadImageModalPartial', 

    components: {
        ModalComponent, 
    }, 

    emits: [
        'close', 
    ], 

    data() {
        return {
            isOpenImageModal: false, 
            uploadImageToken: token(), 
        };
    },

    props: {
        active: {
            type: Boolean,
            default: false, 
        },
    },

    methods: {
        drop($event) {
            console.log($event);
            
            $event.preventDefault();

            if ($event.dataTransfer.items) {
                console.log($event.dataTransfer.items);
            }
        }, 
    }, 
}
</script>

<style scoped>

</style>
