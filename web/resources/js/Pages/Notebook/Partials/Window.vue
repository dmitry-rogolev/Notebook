<template>
    <WindowComponent>
        <template #menu>

            <WindowMenuPartial 
                class="px-1 sm:px-2"
                @create:note="$emit('create:note', $event)"
                @update:note="$emit('update:note', this.record)"
                @create:notification="$emit('create:notification', $event)"
                @exit="$emit('exit')"
                @open:selector="openSelector"
                @open:replacer="openReplacer"
                @create:list="insertList"
                @create:symbol="insertSymbol"
                @create:emoticon="insertSymbol"
                @update:font="font"
                @toggle:spellchecking="isSpellchecking = ! isSpellchecking"
                @toggle:statusbar="isShowStatusBar = ! isShowStatusBar"
                @toggle:fullscreen="$emit('toggle:fullscreen')"
                :showStatusBar="isShowStatusBar"
                :activeFullScreen="activeFullScreen"
                :spellchecking="isSpellchecking"
                :record="record"
                />

            <WindowToolbarPartial 
                @update:font="font"
                @update:size="fontSize"
                @update:italic="italic"
                @update:bold="bold"
                @update:line-height="lineHeight"
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

            <WindowContentEditablePartial 
                ref="contenteditable"
                @update="record.text = $event"
                :text="record.text"
                :spellcheck="isSpellchecking"
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
import WindowContentEditablePartial from '@/Pages/Notebook/Partials/Window/ContentEditable.vue';
import WindowToolbarPartial from '@/Pages/Notebook/Partials/Window/Toolbar.vue';

export default {
    name: 'WindowPartial', 

    components: {
        WindowComponent, 
        WindowMenuButtonComponent, 
        WindowMenuPartial, 
        WindowHeaderPartial, 
        WindowStatusbarPartial, 
        WindowContentEditablePartial, 
        WindowToolbarPartial, 
    }, 

    emits: [
        'create:note', 
        'create:notification', 
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
            this.$refs.contenteditable.$el.innerHTML = this.record.text;
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
            this.$refs.textarea.innerHTML = this.record.text;
        },  
        insertList($event) {
            this.$refs.contenteditable.insertList($event);
        }, 
        insertSymbol($event) {
            this.$refs.contenteditable.insertSymbol($event);
        }, 
        font($font) {
            this.$refs.contenteditable.font($font);
        }, 
        fontSize($fontSize) {
            this.$refs.contenteditable.fontSize($fontSize);
        }, 
        italic() {
            this.$refs.contenteditable.italic();
        }, 
        bold() {
            this.$refs.contenteditable.bold();
        }, 
        lineHeight($lineHeight) {
            this.$refs.contenteditable.lineHeight($lineHeight);
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