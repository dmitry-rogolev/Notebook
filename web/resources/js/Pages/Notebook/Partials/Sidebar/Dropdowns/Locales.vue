<template>
    <DropdownComponent 
        v-if="documentWidth <= 768"
        ref="dropdown" 
        :options="{placement: 'top-end', offsetSkidding: -15}" 
        @show="show = true"
        @hide="show = false"
        :title="$t('Language')"
        class="md:w-full" 
        heightClass="h-auto"
        triggerClass="py-3 px-3 text-2xl border-0 block transition duration-300 ease-in-out focus-visible:outline-none w-full"
        >
        <template #trigger>
            <div class="mx-auto transition duration-300 ease-in-out focus:text-indigo-500 dark:focus:text-indigo-600" :class="{'text-indigo-500 dark:text-indigo-600': show, 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300': ! show}">
                <i class="fa-solid fa-globe"></i>
            </div>
        </template>
        <template #content>
            <DropdownItemComponent @click="$store.dispatch('locale', 'en'); dropdown.hide();">
                {{ $t('English') }}
            </DropdownItemComponent>
            <DropdownItemComponent @click="$store.dispatch('locale', 'ru'); dropdown.hide();">
                {{ $t('Russian') }}
            </DropdownItemComponent>
        </template>
    </DropdownComponent>
    <DropdownComponent 
        v-else 
        ref="dropdown" 
        :options="{placement: 'right-end', offsetSkidding: -15}" 
        @show="show = true"
        @hide="show = false"
        :title="$t('Language')"
        class="md:w-full" 
        heightClass="h-auto"
        triggerClass="py-3 px-3 text-2xl border-0 block transition duration-300 ease-in-out focus-visible:outline-none w-full"
        >
        <template #trigger>
            <div class="mx-auto transition duration-300 ease-in-out focus:text-indigo-500 dark:focus:text-indigo-600" :class="{'text-indigo-500 dark:text-indigo-600': show, 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300': ! show}">
                <i class="fa-solid fa-globe"></i>
            </div>
        </template>
        <template #content>
            <DropdownItemComponent @click="$store.dispatch('locale', 'en'); dropdown.hide();">
                {{ $t('English') }}
            </DropdownItemComponent>
            <DropdownItemComponent @click="$store.dispatch('locale', 'ru'); dropdown.hide();">
                {{ $t('Russian') }}
            </DropdownItemComponent>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';

export default {
    name: 'LocalesDropdownSidebarPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
    }, 

    data() {
        return {
            documentWidth: document.documentElement.clientWidth, 
            show: false, 
        };
    },

    computed: {
        dropdown() {
            return this.$refs.dropdown?.dropdown;
        },
    },

    methods: {
        resize() {
            this.documentWidth = document.documentElement.clientWidth;
        }, 
    }, 

    mounted() {
        window.addEventListener('resize', this.resize);
    },

    unmounted() {
        window.removeEventListener('resize', this.resize);
    },
}
</script>

<style scoped>

</style>
