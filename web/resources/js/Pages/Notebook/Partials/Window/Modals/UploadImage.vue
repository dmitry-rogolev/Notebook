<template>
    <ModalComponent :active="active" @close="$emit('close')" @after-enter="createDropzone">
        <template #header>
            <div class="px-4 py-2 text-base">
                Add image
            </div>
        </template>
        <template #content>
            <div class="px-4 py-3">
                <form 
                    :id="dropzoneToken"
                    class="dropzone h-52 px-4 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 border-2 border-dashed text-gray-600 dark:text-gray-400 rounded-lg shadow-md flex items-center justify-center"
                    >

                </form>
            </div>
        </template>
    </ModalComponent>
</template>

<script>
import ModalComponent from '@/Components/Modal.vue';
import { token } from '@/helpers';
import Dropzone from "dropzone";

export default {
    name: 'UploadImageModalPartial', 

    components: {
        ModalComponent, 
    }, 

    emits: [
        'close', 
        'created:image', 
    ], 

    data() {
        return {
            isOpenImageModal: false, 
            uploadImageToken: token(), 
            dropzoneToken: token(), 
            dropzone: null, 
        };
    },

    props: {
        active: {
            type: Boolean,
            default: false, 
        },
        note: {
            type: Object, 
            required: true, 
        }, 
    },

    watch: {
        active() {
            if (! this.active) {
                this.dropzone = null;
            }
        }, 
    }, 

    methods: {
        createDropzone() {
            this.dropzone = new Dropzone('#' + this.dropzoneToken, {
                maxFilesize: 4194304, 
                paramName: 'image', 
                maxFiles: 1, 
                url: '/', 
                autoProcessQueue: false, 
                acceptedFiles: 'image/png,image/jpg,image/jpeg,image/gif', 
            });
            this.dropzone.on('addedfile', file => {
                this.store(file);
            });
        }, 
        store(file) {
            let data = new FormData();
            data.append('image', file);

            axios.post('/api/notes/' + this.note.id + '/images', data, {
                cache: false,
                contentType: false,
                processData: false,
            }).then(response => {
                this.$emit('created:image', '/api/notes/' + this.note.id + '/images/' + response.data.image.name);
                this.$emit('close');
            });
        }, 
    }, 
}
</script>

<style scoped>

</style>
