<template>
    <div>
        <TriggerComponent v-bind="$attrs" @click="modal.show()" :class="[triggerClass]">
            <slot></slot>
        </TriggerComponent>
        <teleport to="body">
            <ModalComponent ref="modal" @close="modal.hide()">
                <template #header>
                    <div class="px-4 py-2">
                        {{ $t('Add image') }}
                    </div>
                </template>
                <template #content>
                    <TabsComponent 
                        triggersContainerClass="border-gray-300 dark:border-gray-600 border-b px-4"
                        activeClasses="border-indigo-500 dark:border-indigo-600 text-indigo-500 dark:text-indigo-600 cursor-default pointer-events-none"
                        inactiveClasses="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-gray-200 focus:border-indigo-500 dark:focus:border-indigo-600 focus:text-indigo-500 dark:focus:text-indigo-600"
                        >
                        <template #triggers>
                            <TabComponent class="px-3 py-2 mr-2 border-b-2">
                                <div class="flex flex-nowrap items-center">
                                    <i class="fa-solid fa-link mr-2 block"></i>
                                    <div class="flex-auto">{{ $t('Link') }}</div>
                                </div>
                            </TabComponent>
                            <!-- <TabComponent class="px-3 py-2 border-b-2">
                                <div class="flex flex-nowrap items-center">
                                    <i class="fa-solid fa-file mr-2 block"></i>
                                    <div class="flex-auto">{{ $t('File') }}</div>
                                </div>
                            </TabComponent> -->
                        </template>
                        <template #targets>
                            <TargetComponent>
                                <div class="px-4 py-4 flex flex-nowrap">
                                    <InputComponent 
                                        ref="input"
                                        v-model="link" 
                                        type="text" 
                                        class="rounded-r-none border-r-0 block flex-auto w-full" 
                                        placeholder="https://" 
                                        autofocus
                                        />
                                    <button 
                                        @click="add"
                                        type="button" 
                                        class="block px-6 py-2 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 border-indigo-500 dark:border-indigo-600 border text-gray-100 transition duration-200 ease-in-out rounded-r-md focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                                        >
                                        {{ $t('Add') }}
                                    </button>
                                </div>
                            </TargetComponent>
                            <!-- <TargetComponent v-if="$page.props.auth.user">
                                <div class="px-4 py-4 flex">
                                    <form 
                                        :id="dropzoneToken"
                                        class="dropzone w-full h-52 px-4 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 border-2 border-dashed text-gray-600 dark:text-gray-400 rounded-lg flex items-center justify-center"
                                        ></form>
                                </div>
                            </TargetComponent> -->
                        </template>
                    </TabsComponent>
                </template>
            </ModalComponent>
        </teleport>
    </div>
</template>

<script>
import ModalComponent from '@/Components/Modal/Modal.vue';
import TriggerComponent from '@/Components/Modal/Trigger.vue';
import TabsComponent from '@/Components/Tabs/Tabs.vue';
import TabComponent from '@/Components/Tabs/Trigger.vue';
import TargetComponent from '@/Components/Tabs/Target.vue';
import InputComponent from '@/Components/TextInput.vue';

import { Modal } from 'flowbite';
import { token } from '@/helpers';
import Dropzone from "dropzone";

export default {
    name: 'UploadImageWindowModalPartial', 

    components: {
        ModalComponent, 
        TriggerComponent, 
        TabsComponent, 
        TabComponent, 
        TargetComponent, 
        InputComponent, 
    }, 

    data() {
        return {
            dropzoneToken: token(), 
            dropzone: null, 
            modal: null, 
            link: '', 
            range: null, 
        };
    },

    computed: {
        basePath() {
            return window.location.protocol + '//' + window.location.host;
        }, 
    },

    props: {
        triggerClass: {
            type: [ Array, String ],
            default: '', 
        },
    },

    methods: {
        initModal() {
            this.modal = new Modal(this.$refs.modal.$el, {
                placement: 'center-center', 
                backdrop: 'dynamic', 
                closable: true, 
                onShow: () => {
                    this.saveRange();
                    this.$refs.input.$el.focus();
                }, 
                onHide: () => {
                    if (this.dropzone) {
                        this.dropzone.removeAllFiles();
                    }
                }, 
            });
        }, 
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

            axios.post('/api/notes/' + this.$window.file.id + '/images', data, {
                cache: false,
                contentType: false,
                processData: false,
            }).then(response => {
                this.$editable.editableElement.focus();
                this.$editable.execCommand('insertImage', this.basePath + '/api/notes/' + this.$window.file.id + '/images/' + response.data.image.name);
                this.modal.hide();
            });
        }, 
        add() {
            this.modal.hide();

            this.defineFocus();

            if (this.link) {
                this.$editable.execCommand('insertImage', this.link);
                this.link = '';
            }
        }, 
        saveRange() {
            if (window.getSelection().rangeCount) {
                this.range = window.getSelection().getRangeAt(0);
            }
        }, 
        defineFocus() {
            this.$editable.editableElement.focus();

            if (this.range) {
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(this.range);
                this.range = null;
            }
        }, 
    }, 

    mounted() {
        this.initModal();
        // this.createDropzone();
    }, 

    unmounted() {
        // this.dropzone = null;
    }, 
}
</script>

<style>
@keyframes passing-through {
    0% {
        opacity: 0;
        transform: translateY(40px);
    }
    30%, 70% {
        opacity: 1;
        transform: translateY(0px);
    }
    100% {
        opacity: 0;
        transform: translateY(-40px);
    }
}
@keyframes slide-in {
    0% {
        opacity: 0;
        transform: translateY(40px);
    }
    30% {
        opacity: 1;
        transform: translateY(0px);
    }
}
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    10% {
        transform: scale(1.1);
    }
    20% {
        transform: scale(1);
    }
}
.dropzone.dz-clickable {
    cursor: pointer;
}
.dropzone.dz-clickable * {
    cursor: default;
}
.dropzone.dz-clickable .dz-message, .dropzone.dz-clickable .dz-message * {
    cursor: pointer;
}
.dropzone.dz-started .dz-message {
    display: none;
}
.dropzone.dz-drag-hover {
    border-style: solid;
}
.dropzone.dz-drag-hover .dz-message {
    opacity: .5;
}
.dropzone .dz-message {
    text-align: center;
    margin: 3em 0;
}
.dropzone .dz-message .dz-button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}
.dropzone .dz-preview {
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin: 16px;
    min-height: 100px;
}
.dropzone .dz-preview:hover {
    z-index: 1000;
}
.dropzone .dz-preview:hover .dz-details {
    opacity: 1;
}
.dropzone .dz-preview.dz-file-preview .dz-image {
    border-radius: 20px;
    background: #999;
    background: linear-gradient(to bottom,  #eee,  #ddd);
}
.dropzone .dz-preview.dz-file-preview .dz-details {
    opacity: 1;
}
.dropzone .dz-preview.dz-image-preview {
    background: #fff;
}
.dropzone .dz-preview.dz-image-preview .dz-details {
    transition: opacity .2s linear;
}
.dropzone .dz-preview .dz-remove {
    font-size: 14px;
    text-align: center;
    display: block;
    cursor: pointer;
    border: none;
}
.dropzone .dz-preview .dz-remove:hover {
    text-decoration: underline;
}
.dropzone .dz-preview:hover .dz-details {
    opacity: 1;
}
.dropzone .dz-preview .dz-details {
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    font-size: 13px;
    min-width: 100%;
    max-width: 100%;
    padding: 2em 1em;
    text-align: center;
    color: rgba(0, 0, 0, .9);
    line-height: 150%}
.dropzone .dz-preview .dz-details .dz-size {
    margin-bottom: 1em;
    font-size: 16px;
}
.dropzone .dz-preview .dz-details .dz-filename {
    white-space: nowrap;
}
.dropzone .dz-preview .dz-details .dz-filename:hover span {
    border: 1px solid rgba(200, 200, 200, .8);
    background-color: rgba(255, 255, 255, .8);
}
.dropzone .dz-preview .dz-details .dz-filename:not(:hover) {
    overflow: hidden;
    text-overflow: ellipsis;
}
.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
    border: 1px solid transparent;
}
.dropzone .dz-preview .dz-details .dz-filename span, .dropzone .dz-preview .dz-details .dz-size span {
    background-color: rgba(255, 255, 255, .4);
    padding: 0 .4em;
    border-radius: 3px;
}
.dropzone .dz-preview:hover .dz-image img {
    transform: scale(1.05,  1.05);
    filter: blur(8px);
}
.dropzone .dz-preview .dz-image {
    border-radius: 20px;
    overflow: hidden;
    width: 120px;
    height: 120px;
    position: relative;
    display: block;
    z-index: 10;
}
.dropzone .dz-preview .dz-image img {
    display: block;
}
.dropzone .dz-preview.dz-success .dz-success-mark {
    animation: passing-through 3s cubic-bezier(0.77,  0,  0.175,  1);
}
.dropzone .dz-preview.dz-error .dz-error-mark {
    opacity: 1;
    animation: slide-in 3s cubic-bezier(0.77,  0,  0.175,  1);
}
.dropzone .dz-preview .dz-success-mark, .dropzone .dz-preview .dz-error-mark {
    pointer-events: none;
    opacity: 0;
    z-index: 500;
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    margin-left: -27px;
    margin-top: -27px;
    background: rgba(0, 0, 0, .8);
    border-radius: 50%}
.dropzone .dz-preview .dz-success-mark svg, .dropzone .dz-preview .dz-error-mark svg {
    display: block;
    width: 54px;
    height: 54px;
    fill: #fff;
}
.dropzone .dz-preview.dz-processing .dz-progress {
    opacity: 1;
    transition: all .2s linear;
}
.dropzone .dz-preview.dz-complete .dz-progress {
    opacity: 0;
    transition: opacity .4s ease-in;
}
.dropzone .dz-preview:not(.dz-processing) .dz-progress {
    animation: pulse 6s ease infinite;
}
.dropzone .dz-preview .dz-progress {
    opacity: 1;
    z-index: 1000;
    pointer-events: none;
    position: absolute;
    height: 20px;
    top: 50%;
    margin-top: -10px;
    left: 15%;
    right: 15%;
    border: 3px solid rgba(0, 0, 0, .8);
    background: rgba(0, 0, 0, .8);
    border-radius: 10px;
    overflow: hidden;
}
.dropzone .dz-preview .dz-progress .dz-upload {
    background: #fff;
    display: block;
    position: relative;
    height: 100%;
    width: 0;
    transition: width 300ms ease-in-out;
    border-radius: 17px;
}
.dropzone .dz-preview.dz-error .dz-error-message {
    display: block;
}
.dropzone .dz-preview.dz-error:hover .dz-error-message {
    opacity: 1;
    pointer-events: auto;
}
.dropzone .dz-preview .dz-error-message {
    pointer-events: none;
    z-index: 1000;
    position: absolute;
    display: block;
    display: none;
    opacity: 0;
    transition: opacity .3s ease;
    border-radius: 8px;
    font-size: 13px;
    top: 130px;
    left: -10px;
    width: 140px;
    background: #b10606;
    padding: .5em 1em;
    color: #fff;
}
.dropzone .dz-preview .dz-error-message:after {
    content: "";
    position: absolute;
    top: -6px;
    left: 64px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #b10606;
}
</style>
