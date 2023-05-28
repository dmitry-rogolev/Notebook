<template>
    <teleport to="body">
        <div :class="{dark: dark}">
            <transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0"
                leave-active-class="transition ease-in duration-200"
                leave-to-class="opacity-0"
                @after-enter="$emit('after-enter')"
                >
                <div
                    v-if="active"
                    class="fixed top-0 left-0 bottom-0 right-0 z-40 overflow-hidden bg-gray-900/10 dark:bg-gray-900/40"
                    @click="$emit('close')"
                    @keyup.esc="$emit('close')"
                    >
                    <section
                        ref="modal"
                        class="fixed top-0 left-0 bottom-0 right-0 z-50 overflow-x-hidden overflow-y-auto flex justify-center items-center"
                        role="dialog"
                        aria-modal="true"
                        tabindex="-1"
                        >
                        <div @click.stop class="relative max-w-[400px] flex-auto text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                            <div class="flex flex-nowrap">
                                <div class="flex-auto">
                                    <slot name="header"></slot>
                                </div>
                                <button @click="$emit('close')" type="button" class="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-tr-lg rounded-bl-lg px-4 py-2 transition duration-200 ease-in-out">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div>
                                <slot name="content"></slot>
                            </div>
                        </div>
                    </section>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'ModalComponent', 

    emits: [
        'close', 
        'after-enter', 
    ], 

    computed: {
        dark() {
            return this.$store.state.dark;
        }, 
    }, 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        },
    }, 
}
</script>