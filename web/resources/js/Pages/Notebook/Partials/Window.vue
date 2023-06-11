<template>
    <WindowComponent>
        <template #menu>

            <WindowMenuPartial 
                class="px-1 sm:px-2"
                @create:note="$emit('create:note', $event)"
                @update:note="$emit('update:note', this.record)"
                @exit="$emit('exit')"
                @open:selector="openSelector"
                @open:replacer="openReplacer"
                @toggle:spellchecking="isSpellchecking = ! isSpellchecking"
                @toggle:statusbar="isShowStatusBar = ! isShowStatusBar"
                @toggle:fullscreen="$emit('toggle:fullscreen')"
                :showStatusBar="isShowStatusBar"
                :activeFullScreen="activeFullScreen"
                :spellchecking="isSpellchecking"
                :record="record"
                />

            <WindowToolbarPartial 
                :note="note"
                @execCommand="execCommand"
                />

        </template>
        <template #header>

            <WindowHeaderPartial
                ref="header"
                v-model="record.title"
                @delete:note="$emit('delete:note')"
                @close:selector="closeSelector"
                @clear:found="clearFound"
                @update:recordText="record.text = $event"
                :activeSelector="isOpenSelector"
                :activeReplacer="isOpenReplacer"
                :record="record"
                />

        </template>
        <template #body>

            <EditableComponent 
                class="h-full px-3 sm:px-4 md:px-5 py-3 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-base focus-visible:outline-none whitespace-pre-wrap overflow-auto" 
                :style="{tabSize: 4}"
                autofocus
                v-model="record.text"
                />

        </template>
        <template #footer>

            <WindowStatusbarPartial 
                v-show="isShowStatusBar" 
                :text="record.text"
                />

        </template>
    </WindowComponent>
</template>

<script>
import WindowComponent from '@/Components/Window.vue';
import WindowMenuButtonComponent from '@/Components/Window/MenuButton.vue';
import WindowMenuPartial from '@/Pages/Notebook/Partials/Window/Menu.vue';
import WindowHeaderPartial from '@/Pages/Notebook/Partials/Window/Header.vue';
import WindowStatusbarPartial from '@/Pages/Notebook/Partials/Window/Statusbar.vue';
import WindowToolbarPartial from '@/Pages/Notebook/Partials/Window/Toolbar.vue';
import EditableComponent from '@/Plugins/Editable/Components/Editable.vue';

export default {
    name: 'WindowPartial', 

    components: {
        WindowComponent, 
        WindowMenuButtonComponent, 
        WindowMenuPartial, 
        WindowHeaderPartial, 
        WindowStatusbarPartial, 
        WindowToolbarPartial, 
        EditableComponent, 
    }, 

    emits: [
        'create:note', 
        'update:note', 
        'delete:note', 
        'exit', 
        'toggle:fullscreen', 
    ], 

    data() {
        return {
            isOpenSelector: false, 
            isOpenReplacer: false, 
            isOpenFontModal: false, 
            isSpellchecking: true, 
            isShowStatusBar: true, 
            record: {
                title: this.note.title, 
                text: this.note.text, 
            }, 
        };
    }, 

    props: {
        note: {
            type: Object, 
            required: true, 
        }, 
        activeFullScreen: {
            type: Boolean, 
            default: false, 
        }, 
    }, 

    methods: {
        reset() {
            this.record = {
                title: this.note.title, 
                text: this.note.text, 
            };
        },
        openSelector() {
            this.isOpenSelector = true;
        }, 
        closeSelector() {
            this.isOpenSelector = false;
            this.$refs.header.closeSelector();
            this.closeReplacer();
        }, 
        openReplacer() {
            this.isOpenSelector = true;
            this.isOpenReplacer = true;
        }, 
        closeReplacer() {
            this.isOpenReplacer = false;
            this.$refs.header.closeReplacer();
        }, 
        clearFound() {
            this.$refs.contenteditable.innerHTML = this.record.text;
        },  
        execCommand($command) {
            if (typeof $command == 'object') {
                let name = '';
                let value = null;
                let options = {};

                if ('name' in $command) {
                    name = $command.name;
                }

                if ('value' in $command) {
                    value = $command.value;
                }

                if ('options' in $command && typeof $command.options == 'object') {
                    options = $command.options;
                }

                if (name) {
                    this.$refs.contenteditable.execCommand(name, value, options);
                }
            } else {
                this.$refs.contenteditable.execCommand($command);
            }
        }, 
        font($font) {
            this.$refs.contenteditable.font($font);
            this.$refs.contenteditable.execCommand('justifyFull');
        },
        format($tag) {
            this.$refs.contenteditable.format($tag);
        },
        fontSize($size) {
            this.$refs.contenteditable.fontSize($size);
        },
        foreColor($color) {
            this.$refs.contenteditable.foreColor($color);
        },
        hiliteColor($color) {
            this.$refs.contenteditable.hiliteColor($color);
        },
        insertImage($path) {
            this.$refs.contenteditable.insertImage($path);
        },
        createLink($link) {
            this.$refs.contenteditable.createLink($link);
        },
        unlink() {
            this.$refs.contenteditable.execCommand('unlink');
        },
    }, 

    mounted() {
        this.reset();
    }, 

    updated() {
        this.reset();
    }, 
};
</script>

<style scoped>

</style>