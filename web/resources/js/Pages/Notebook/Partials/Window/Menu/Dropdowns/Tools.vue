<template>
    <DropdownPartial
        triggerClass=""
        targetClass=""
        >
        <template #trigger>
            Tools
        </template>
        <template #content>

            <DropdownItemComponent @click="$editable.toggleSpellcheck()">
                <div class="flex flex-nowrap items-center">
                    <div class="flex items-center">
                        <i v-if="spellcheck" class="fa-solid fa-check w-6 text-center mr-2"></i>
                        <div v-else class="w-6 mr-2"></div>
                    </div>
                    <div class="flex-auto">Spellchecking</div>
                </div>
            </DropdownItemComponent>

        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../Dropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';
import { token } from '@/helpers';

export default {
    name: 'WindowMenuToolsDropdownPartial', 

    components: {
        DropdownPartial, 
        DropdownItemComponent, 
    }, 

    computed: {
        spellcheck() {
            return this.$editable.spellcheck;
        }
    },
}
</script>

<style scoped>

</style>
