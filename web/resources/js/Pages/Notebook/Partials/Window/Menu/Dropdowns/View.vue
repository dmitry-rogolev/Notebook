<template>
    <DropdownPartial
        triggerClass=""
        targetClass=""
        >
        <template #trigger>
            View
        </template>
        <template #content>

            <DropdownItemComponent @click="$store.commit('statusbar', ! statusbar)">
                <div class="flex flex-nowrap items-center">
                    <div class="flex items-center">
                        <i v-if="statusbar" class="fa-solid fa-check w-6 text-center mr-2"></i>
                        <div v-else class="w-6 mr-2"></div>
                    </div>
                    <div class="flex-auto">Status bar</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$store.commit('fullscreen', ! fullscreen)">
                <div class="flex flex-nowrap items-center">
                    <div class="flex items-center">
                        <i v-if="fullscreen" class="fa-solid fa-check w-6 text-center mr-2"></i>
                        <div v-else class="w-6 mr-2"></div>
                    </div>
                    <div class="flex-auto">In full screen</div>
                    <div class="text-xs font-bold">Alt + I</div>
                </div>
            </DropdownItemComponent>

        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../Dropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';

export default {
    name: 'WindowMenuToolsDropdownPartial', 

    components: {
        DropdownPartial, 
        DropdownItemComponent, 
    }, 

    computed: {
        statusbar() {
            return this.$store.state.statusbar;
        }, 
        fullscreen() {
            return this.$store.state.fullscreen;
        }, 
    },
}
</script>

<style scoped>

</style>
