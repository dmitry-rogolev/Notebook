<template>
    <div 
        tabindex="-1"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        v-bind="$attrs"
        >
        <div :class="[widthClass]" class="relative max-h-full w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 border">
            <div class="flex flex-nowrap">
                <div class="flex-auto">
                    <slot name="header"></slot>
                </div>
                <button 
                    @click="$emit('close')" 
                    type="button" 
                    class="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-tr-lg rounded-bl-lg px-4 py-2 transition duration-200 ease-in-out"
                    >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalComponent',

    emits: [
        'close', 
    ], 

    props: {
        widthClass: {
            type: [ Array, String ], 
            default: 'max-w-lg', 
        }, 
    }, 
}
</script>