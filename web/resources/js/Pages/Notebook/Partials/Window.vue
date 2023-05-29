<template>
    <WindowComponent>
        <template #menu>
            <DropdownComponent role="menuitem" @open="isOpenFile = true" @close="isOpenFile = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenFile">File</WindowMenuButtonComponent>
                </template>
                <template #content>

                    <DropdownLinkComponent @click="$emit('create')" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-file block mr-2 w-6 text-center"></i>
                                <span>New</span>
                            </div>
                            <div class="text-xs font-bold">Alt + N</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="openFile" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-folder-open w-6 text-center mr-2"></i>
                                <span>Open</span>
                            </div>
                            <div class="text-xs font-bold">Alt + O</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="$emit('update', record)" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>
                                <span>Save</span>
                            </div>
                            <div class="text-xs font-bold">Alt + S</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="openFileModal" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>
                                <span>Save as</span>
                            </div>
                            <div class="text-xs font-bold">Alt + A</div>
                        </div>
                    </DropdownLinkComponent>

                    <ModalComponent :active="isOpenFileModal" @close="closeFileModal">
                        <template #header>
                            <div class="px-4 py-2">
                                <h5 class="text-base">Save as</h5>
                            </div>
                        </template>
                        <template #content>
                            <div class="px-4 pb-4 pt-2">
                                <div class="flex flex-nowrap">
                                    <InputComponent @keyup.enter="saveAs(); closeFileModal();" v-model="fileName" type="text" class="rounded-r-none" placeholder="File name" autofocus />
                                    <button @click="saveAs(); closeFileModal();" type="button" class="bg-indigo-600 hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 text-gray-100 dark:text-gray-300 border-0 rounded-r-lg px-4 transition duration-300 ease-in-out">Download</button>
                                </div>
                            </div>
                        </template>
                    </ModalComponent>

                    <DropdownLinkComponent @click="toggleAutosave" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex items-center">
                                <i v-if="autosave" class="fa-solid fa-check w-6 text-center mr-2"></i>
                                <div v-else class="w-6 mr-2"></div>
                            </div>
                            <div class="flex-auto">Auto Save</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="print" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-print w-6 text-center mr-2"></i>
                                <span>Print</span>
                            </div>
                            <div class="text-xs font-bold">Alt + P</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="$emit('exit')" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-door-open w-6 text-center mr-2"></i>
                                <span>Exit</span>
                            </div>
                            <div class="text-xs font-bold">Alt + Q</div>
                        </div>
                    </DropdownLinkComponent>

                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenEdit = true" @close="isOpenEdit = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenEdit">Edit</WindowMenuButtonComponent>
                </template>
                <template #content>

                    <DropdownLinkComponent @click="undo" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-rotate-left w-6 text-center mr-2"></i>
                                <span>Undo</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + Z</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="redo" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-rotate-right w-6 text-center mr-2"></i>
                                <span>Redo</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + Y</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent @click="cut" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-scissors w-6 text-center mr-2"></i>
                                <span>Cut</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + X</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="copy" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-copy w-6 text-center mr-2"></i>
                                <span>Copy</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + C</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="paste" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-paste w-6 text-center mr-2"></i>
                                <span>Paste</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + V</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="this.delete" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-trash w-6 text-center mr-2"></i>
                                <span>Delete</span>
                            </div>
                            <div class="text-xs font-bold">Delete</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="selectAll" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <span>Select all</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + A</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="openSelector" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-magnifying-glass w-6 text-center mr-2"></i>
                                <span>Find</span>
                            </div>
                            <div class="text-xs font-bold">Alt + F</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="openReplacer" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-right-left w-6 text-center mr-2"></i>
                                <span>Replace</span>
                            </div>
                            <div class="text-xs font-bold">Alt + R</div>
                        </div>
                    </DropdownLinkComponent>

                </template>
            </DropdownComponent>

            <DropdownComponent role="menuitem" @open="isOpenInsert = true" @close="isOpenInsert = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenInsert">Insert</WindowMenuButtonComponent>
                </template>
                <template #content>

                    <DropdownLinkComponent @click="openInsertListModal" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-list w-6 text-center mr-2"></i>
                                <span>List</span>
                            </div>
                            <div class="text-xs font-bold">Alt + L</div>
                        </div>
                    </DropdownLinkComponent>

                    <ModalInsertListPartial :active="isOpenInsertListModal" @create:list="insertList" @close="closeInsertListModal" />

                    <DropdownLinkComponent @click="openInsertSymbolsModal" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-at w-6 text-center mr-2"></i>
                                <span>Symbols</span>
                            </div>
                            <div class="text-xs font-bold">Alt + Y</div>
                        </div>
                    </DropdownLinkComponent>

                    <ModalInsertSymbolsPartial 
                        :active="isOpenInsertSymbolsModal" 
                        @create:symbol="insertSymbol" 
                        @close="closeInsertSymbolsModal" 
                        />

                    <DropdownLinkComponent @click="openInsertEmoticonsModal" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-face-grin-wink w-6 text-center mr-2"></i>
                                <span>Emoticons</span>
                            </div>
                            <div class="text-xs font-bold">Alt + E</div>
                        </div>
                    </DropdownLinkComponent>

                    <ModalInsertEmoticonsPartial 
                        :active="isOpenInsertEmoticonsModal" 
                        @create:emoticon="insertSymbol" 
                        @close="closeInsertEmoticonsModal" 
                        />

                </template>
            </DropdownComponent>

            <DropdownComponent role="menuitem" @open="isOpenFormat = true" @close="isOpenFormat = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenFormat">Format</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Word wrap</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Font</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenTools = true" @close="isOpenTools = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenTools">Tools</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Word wrap</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Font</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenView = true" @close="isOpenView = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenView">View</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Status bar</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">In full screen</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenHelp = true" @close="isOpenHelp = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenHelp">Help</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Status bar</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">In full screen</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <div role="menuitem" class="ml-auto">
                <WindowMenuButtonComponent><i class="fa-solid fa-up-right-and-down-left-from-center"></i></WindowMenuButtonComponent>
            </div>
            <div role="menuitem">
                <button role="button" @click="$emit('exit')" type="button" class="trigger px-2 sm:px-3 md:px-4 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 focus-visible:outline-none transition duration-200 ease-in-out select-none">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </template>
        <template #header>
            <div class="flex">
                <input v-model="record.title" type="text" class="flex-auto px-3 sm:px-4 md:px-5 py-2 bg-gray-50 dark:bg-slate-800 border-0 border-b border-r border-gray-300 dark:border-gray-600 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 text-xl focus:ring-0 focus-visible:outline-none" placeholder="Enter the title" />
                <button @click="$emit('delete')" type="button" class="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700 border-b border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 text-gray-700 dark:text-gray-300 select-none focus-visible:outline-none transition duration-200 ease-in-out print:hidden">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <SelectorComponent 
                    @toggle:case="isCase = ! isCase" 
                    @close="closeSelector" 
                    @update:replaceModelValue="replaceValue = $event" 
                    @update:selectModelValue="foundValue = $event" 
                    @replace="replaceFound"
                    @undo="undoReplace"
                    :selectModelValue="foundValue"
                    :replaceModelValue="replaceValue"
                    :active="isOpenSelector" 
                    :replacerActive="isOpenReplacer" 
                    :case="isCase"  
                    />
            </div>
        </template>
        <template #body>
            <div 
                ref="textarea" 
                @input="record.text = $event.target.innerHTML" 
                autofocus 
                class="h-full px-3 sm:px-4 md:px-5 py-3 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-base focus-visible:outline-none whitespace-pre-line overflow-y-auto overflow-x-hidden print:absolute print:z-[1000]" 
                role="textbox" 
                contenteditable="true" 
                aria-multiline="true"
                >

            </div>
        </template>
        <template #footer>
            <div ref="statusbar" class="bg-gray-100 dark:bg-slate-700 h-8 border-gray-300 dark:border-gray-600 border-t text-gray-700 dark:text-gray-300 text-sm ">

            </div>
        </template>
    </WindowComponent>
</template>

<script>
import WindowComponent from '@/Components/Window.vue';
import WindowMenuButtonComponent from '@/Components/Window/MenuButton.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';
import ModalComponent from '@/Components/Modal.vue';
import InputComponent from '@/Components/TextInput.vue';
import SelectorComponent from '@/Components/Selector.vue';
import ModalInsertListPartial from '@/Pages/Notebook/Partials/ModalInsertList.vue';
import ModalInsertSymbolsPartial from '@/Pages/Notebook/Partials/ModalInsertSymbols.vue';
import ModalInsertEmoticonsPartial from '@/Pages/Notebook/Partials/ModalInsertEmoticons.vue';
import { escapeHtml, escapeRegex, cutTags } from '@/helpers';

export default {
    name: 'WindowPartial', 

    components: {
        WindowComponent, 
        WindowMenuButtonComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
        ModalComponent, 
        InputComponent, 
        SelectorComponent, 
        ModalInsertListPartial, 
        ModalInsertSymbolsPartial, 
        ModalInsertEmoticonsPartial, 
    }, 

    emits: [
        'create', 
        'update', 
        'delete', 
        'create:notification', 
        'exit', 
    ], 

    data() {
        return {
            isOpenFile: false, 
            isOpenEdit: false, 
            isOpenInsert: false, 
            isOpenView: false, 
            isOpenTools: false, 
            isOpenFormat: false, 
            isOpenHelp: false, 
            isOpenFileModal: false, 
            isOpenSelector: false, 
            isOpenReplacer: false, 
            isOpenInsertListModal: false, 
            isOpenInsertSymbolsModal: false, 
            isOpenInsertEmoticonsModal: false, 
            record: {
                title: this.note.title, 
                text: this.note.text, 
            }, 
            fileName: '', 
            timerAutosave: null, 
            autosaveInterval: 60000, 
            textarea: null, 
            statusbar: null, 
            found: '',
            case: true, 
            replaceValue: '',
        };
    }, 

    computed: {
        autosave() {
            return this.$store.state.autosave;
        }, 
        foundValue: {
            get() {
                return this.found;
            }, 
            set(v) {
                this.found = v;
                if (this.found) {
                    this.selectFound();
                } else {
                    this.clearFound();
                }
            }, 
        }, 
        isCase: {
            get() {
                return this.case;
            }, 
            set(v) {
                this.case = v;
                if (this.found) {
                    this.selectFound();
                }
            }, 
        }, 
    }, 

    props: {
        note: {
            type: Object, 
            required: true, 
        }, 
    }, 

    methods: {
        reset() {
            this.record = {
                title: this.note.title, 
                text: this.note.text, 
            };
            this.fileName = '';
            this.textarea.html(this.record.text);
        },
        defineValues() {
            this.textarea = $(this.$refs.textarea);
            this.statusbar = $(this.$refs.statusbar);
        }, 
        openFile() {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = 'text/*';
            input.onchange = () => {
                if (input.files[0]) {
                    input.files[0].arrayBuffer().then((arrayBuffer) => {
                        this.$emit('create', {
                            title: input.files[0].name, 
                            text: cutTags(new TextDecoder().decode(arrayBuffer)), 
                        });
                    });
                }
            }
            input.click();
        }, 
        openFileModal() {
            this.fileName = (this.record.title ? this.record.title : 'No name') + '.txt';
            this.isOpenFileModal = true;
        }, 
        closeFileModal() {
            this.isOpenFileModal = false;
        }, 
        saveAs() {
            let a = document.createElement('a');
            a.href = 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(this.record.text);
            a.download = this.fileName;
            a.click();
        }, 
        onAutosave() {
            this.timerAutosave = setInterval(() => this.$emit('update', this.record), this.autosaveInterval);
        }, 
        offAutosave() {
            if (this.timerAutosave) {
                clearInterval(this.timerAutosave);
                this.timerAutosave = null;
            }
        }, 
        toggleAutosave() {
            if (this.autosave) {
                this.$store.dispatch('autosave', false);
                this.offAutosave();
                this.$emit('create:notification', {
                    message: 'Auto save mod off',
                    success: true, 
                });
            } else {
                this.$store.dispatch('autosave', true);
                this.onAutosave();
                this.$emit('create:notification', {
                    message: 'Auto save mod on', 
                    success: true, 
                });
            }
        }, 
        print() {
            window.print();
        }, 
        undo() {
            this.textarea.focus();
            document.execCommand('undo');
        }, 
        redo() {
            this.textarea.focus();
            document.execCommand('redo');
        }, 
        cut() {
            this.textarea.focus();
            document.execCommand('cut');
        }, 
        copy() {
            this.textarea.focus();
            document.execCommand('copy');
        }, 
        paste() {
            this.textarea.focus();
            document.execCommand('paste');
        }, 
        delete() {
            this.textarea.focus();
            document.execCommand('delete');
        }, 
        selectAll() {
            this.textarea.focus();
            document.execCommand('selectAll');
        }, 
        openSelector() {
            this.isOpenSelector = true;
        }, 
        closeSelector() {
            this.isOpenSelector = false;
            this.foundValue = '';
            this.closeReplacer();
        }, 
        select(search = '', replace = null, isCase = true) {
            if (search) {
                if (typeof replace == 'boolean') {
                    isCase = replace;
                    replace = null;
                }

                let text = this.record.text, 
                    tagRegexp = new RegExp('<\/?[^>]+>', 'igm'), 
                    searchRegexp = new RegExp('(' + escapeHtml(escapeRegex(search)) + ')', isCase ? 'igm' : 'gm'), 
                    result = '', from = 0, to = 0, found = '', sub = '';

                while (found = tagRegexp.exec(text)) {
                    to = tagRegexp.lastIndex - found[0].length;

                    if (to < 0) {
                        to = 0;
                    }

                    sub = text.slice(from, to);

                    if (sub) {
                        sub = sub.replace(searchRegexp, '<a class="bg-indigo-200 dark:bg-indigo-900">' + (replace ?? '$1') + '</a>');
                    }

                    result = result.concat(sub, found[0]);

                    from = tagRegexp.lastIndex;
                }

                if (from < text.length) {
                    sub = text.slice(from);

                    if (sub) {
                        sub = sub.replace(searchRegexp, '<a class="bg-indigo-200 dark:bg-indigo-900">' + (replace ?? '$1') + '</a>');
                        result = result.concat(sub);
                    }
                }

                this.textarea.html(result);

                if (replace) {
                    this.record.text = cutTags(this.textarea.html());
                }
            }
        }, 
        selectFound() {
            this.select(this.foundValue, this.isCase);
        }, 
        replaceFound() {
            if (this.replaceValue) {
                this.select(this.foundValue, this.replaceValue, this.isCase);
            }
        }, 
        undoReplace() {
            if (this.foundValue) {
                this.select(this.replaceValue, this.foundValue, this.isCase);
            }
        }, 
        clearFound() {
            this.textarea.html(this.record.text);
        }, 
        openReplacer() {
            if (! this.isOpenSelector) {
                this.openSelector();
            }

            this.isOpenReplacer = true;
        }, 
        closeReplacer() {
            this.isOpenReplacer = false;
            this.replaceValue = '';
        }, 
        openInsertListModal() {
            this.isOpenInsertListModal = true;
        }, 
        closeInsertListModal() {
            this.isOpenInsertListModal = false;
        }, 
        insertList($event) {
            let tag, mark;

            switch($event) {
                case 'decimal': tag = 'ol'; mark = 'decimal'; break;
                case 'decimal-leading-zero': tag = 'ol'; mark = '[decimal-leading-zero]'; break;
                case 'upper-roman': tag = 'ol'; mark = '[upper-roman]'; break;
                case 'lower-roman': tag = 'ol'; mark = '[lower-roman]'; break;
                case 'upper-alpha': tag = 'ol'; mark = '[upper-alpha]'; break;
                case 'lower-alpha': tag = 'ol'; mark = '[lower-alpha]'; break;
                case 'lower-greek': tag = 'ol'; mark = '[lower-greek]'; break;
                case 'armenian': tag = 'ol'; mark = '[armenian]'; break;
                case 'georgian': tag = 'ol'; mark = '[georgian]'; break;
                case 'disc': tag = 'ul'; mark = 'disc'; break;
                case 'circle': tag = 'ul'; mark = 'circle'; break;
                case 'square': tag = 'ul'; mark = 'square'; break;
                default: tag = 'ul'; mark = 'disc'; break;
            };

            let selection = window.getSelection(), 
                focus = this.getChildNodeOfTextarea(selection.focusNode), 
                div = $('<div></div>'), 
                list = $('<' + tag + ' class="list-inside list-' + mark + '"></' + tag + '>'), 
                li = $('<li></li>'), 
                br = $('<div><br /></div>');
            
            list.append(li);
            div.append(list);
            focus.after(div);
            div.after(br);

            this.setCursor(li[0]);
        }, 
        setCursor(el, offset = 0) {
            let range = new Range(), 
                selection = window.getSelection();

            range.setStart(el, offset);
            range.collapse(true);

            selection.removeAllRanges();
            selection.addRange(range);
        }, 
        getChildNodeOfTextarea(node) {
            node = $(node);

            if (node.is(this.textarea)) {
                return this.textarea.children().last();
            }

            let parent = node.parent();

            if (parent.is(this.textarea)) {
                return node;
            }

            return this.getChildNodeOfTextarea(parent);
        }, 
        openInsertSymbolsModal() {
            this.isOpenInsertSymbolsModal = true;
        }, 
        openInsertEmoticonsModal() {
            this.isOpenInsertEmoticonsModal = true;
        }, 
        closeInsertSymbolsModal() {
            this.isOpenInsertSymbolsModal = false;
        }, 
        closeInsertEmoticonsModal() {
            this.isOpenInsertEmoticonsModal = false;
        }, 
        insertSymbol($event) {
            let selection = document.getSelection(), 
                focus = $(selection.focusNode), 
                offset = selection.focusOffset;

            if (focus[0].nodeType == 3) {
                let text = focus.text(),
                    nodeBefore = $(document.createTextNode(text.slice(0, offset))),
                    nodeAfter = $(document.createTextNode(text.slice(offset))),
                    span = $('<span></span>');
                    
                span.html($event);
                focus.before(nodeBefore);
                focus.remove();
                nodeBefore.after(span);
                span.after(nodeAfter);
                this.setCursor(span[0], 1);
            } else {
                let text = focus.html();
                focus.html(''.concat(text.slice(0, offset), $event, text.slice(offset)));
                this.setCursor(focus[0], offset + 1);
            }
        }, 
        keyupListener(e) {
            e.preventDefault();
            e.stopPropagation();

            // New
            if (e.altKey && e.code == 'KeyN') {
                this.$emit('create');
            } 

            // Open
            else if (e.altKey && e.code == 'KeyO') {
                this.openFile();
            } 
            
            // Save
            else if (e.altKey && e.code == 'KeyS') {
                this.$emit('update', this.record);
            } 
            
            // Save as
            else if (e.altKey && e.code == 'KeyA') {
                this.openFileModal();
            }

            // Print
            else if (e.altKey && e.code == 'KeyP') {
                this.print();
            }

            // Exit
            else if (e.altKey && e.code == 'KeyQ') {
                this.$emit('exit');
            }

            // Select all
            else if (e.ctrlKey && e.code == 'KeyA') {
                this.selectAll();
            }

            // Find
            else if (e.altKey && e.code == 'KeyF') {
                this.openSelector();
            }

            // Replace
            else if (e.altKey && e.code == 'KeyR') {
                this.openReplacer();
            }

            // Insert list
            else if (e.altKey && e.code == 'KeyL') {
                this.openInsertListModal();
            }

            // Insert symbols
            else if (e.altKey && e.code == 'KeyY') {
                this.openInsertSymbolsModal();
            }

            // Insert emoticons
            else if (e.altKey && e.code == 'KeyE') {
                this.openInsertEmoticonsModal();
            }
        }, 
        defineListeners() {
            $(document).on('keyup', this.keyupListener);
        }, 
        removeListeners() {
            $(document).off('keyup', this.keyupListener);
        }, 
    }, 

    mounted() {
        this.$store.dispatch('autosave');

        this.defineValues();

        this.defineListeners();

        if (this.autosave) {
            this.onAutosave();
        }

        this.reset();
    }, 

    updated() {
        this.reset();
    }, 

    unmounted() {
        this.removeListeners();
        this.offAutosave();
        this.closeSelector();
    }
};
</script>