<template>
    <WindowComponent>
        <template #menu>
            <DropdownComponent role="menuitem" @show="isOpenFile = true" @close="isOpenFile = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenFile">File</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">New</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Open</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Save</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Save as</DropdownLinkComponent>
                    <div class="border-t border-gray-200 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent as="button">Print</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @show="isOpenEdit = true" @close="isOpenEdit = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenEdit">Edit</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Cancel</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Repeat</DropdownLinkComponent>
                    <div class="border-t border-gray-200 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent as="button">Cut</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Copy</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Delete</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Select all</DropdownLinkComponent>
                    <div class="border-t border-gray-200 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent as="button">Find and replace</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @show="isOpenInsert = true" @close="isOpenInsert = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenInsert">Insert</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Date/Time</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Symbols</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Smilies</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @show="isOpenFormat = true" @close="isOpenFormat = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenFormat">Format</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Word wrap</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Font</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @show="isOpenTools = true" @close="isOpenTools = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenTools">Tools</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Word wrap</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Font</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @show="isOpenView = true" @close="isOpenView = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenView">View</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Status bar</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">In full screen</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @show="isOpenHelp = true" @close="isOpenHelp = false" contentClass="-mt-1">
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
        </template>
        <template #header>
            <div class="flex">
                <input type="text" class="flex-auto text-xl px-4 py-2 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 focus:border-gray-100 dark:focus:border-gray-700 border-solid border-b border-r shadow focus:ring-0 focus:outline-none text-gray-900 dark:text-gray-100" />
                <button type="button" class="px-4 py-2 border-b border-solid border-gray-100 dark:border-gray-800 shadow bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </template>
        <template #body>
            <textarea autofocus class="h-full w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base px-6 py-6 border-gray-100 dark:border-gray-700 shadow focus:border-gray-100 dark:focus:border-gray-700 border-solid border-b focus:ring-0 focus:outline-none resize-none"></textarea>
        </template>
        <template #footer>
            <div class="bg-gray-100 dark:bg-gray-800 h-8 border-gray-200 dark:border-gray-700 shadow border-t text-gray-700 dark:text-gray-300 text-sm">

            </div>
        </template>
    </WindowComponent>
</template>

<script>
import WindowComponent from '@/Components/Window.vue';
import WindowMenuButtonComponent from '@/Components/Window/MenuButton.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';

export default {
    name: 'WindowPartial', 

    components: {
        WindowComponent, 
        WindowMenuButtonComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
    }, 

    data() {
        return {
            isOpenFile: false, 
            isOpenEdit: false, 
            isOpenInsert: false, 
            isOpenView: false, 
            isOpenTools: false, 
            isOpenFormat: false, 
            isOpenHelp: false, 
        };
    }, 
};
</script>