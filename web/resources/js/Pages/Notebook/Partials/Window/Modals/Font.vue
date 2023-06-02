<template>
    <ModalComponent :active="active" @close="$emit('close')">

        <template #header>
            <div class="px-4 py-2">
                <h5 class="text-base">Font</h5>
            </div>
        </template>

        <template #content>

            <div class="px-4 pb-4 pt-2">

                <ul role="menubar" class="flex flex-nowrap border-b border-gray-300 dark:border-gray-600 mb-3">
                    
                    <li role="menuitem" class="mr-4">
                        <TabLinkComponent @click="isOpenFont = true" :active="isOpenFont" :aria-controls="fontToken" class="px-3 py-2">
                            <i class="fa-solid fa-font w-6 text-center"></i>
                        </TabLinkComponent>
                    </li>

                </ul>

                <div ref="menu">

                    <transition name="font" mode="out-in">

                        <FontPartial v-if="isOpenFont" :id="fontToken" @update:font="$emit('update:font', $event); $emit('close');" />

                    </transition>

                </div>

            </div>

        </template>

    </ModalComponent>
</template>

<script>
import ModalComponent from '@/Components/Modal.vue';
import TabLinkComponent from '@/Components/TabLink.vue';
import FontPartial from '@/Pages/Notebook/Partials/Window/Modals/Font/Font.vue';
import { token } from '@/helpers';

export default {
    name: 'ModalFontPartial', 

    components: {
        ModalComponent, 
        TabLinkComponent, 
        FontPartial, 
    }, 

    emits: [
        'close', 
        'update:font', 
    ], 

    data() {
        return {
            fontToken: token(), 
            isOpenFont: false, 
        };
    }, 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
    }, 

    watch: {
        active() {
            if (this.active) {
                this.isOpenFont = true;
            }
        }, 
    }, 
};
</script>

<style scoped>
.font-enter-active,
.font-leave-active {
  transition: all 0.3s ease;
}
.font-enter-from,
.font-leave-to {
  opacity: 0;
}
</style>