<template>
    <section class="md:max-h-screen md:min-h-screen flex justify-center bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-t md:border-t-0 md:border-r focus-visible:outline-none fixed md:static bottom-0 left-0 right-0">
        <div class="flex flex-nowrap md:flex-col overflow-auto">
            <Link 
                href="/" 
                class="text-center block transition duration-200 ease-in-out focus-visible:outline-none py-3 px-4 text-2xl border-0 text-indigo-500 dark:text-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-500 focus:text-indigo-600 dark:focus:text-indigo-500"
                >
                <i class="fa-solid fa-note-sticky"></i>
            </Link>
            <TriggerSidebarPartial class="mt-auto" @click="toggleDark" :title="dark ? $t('Bright theme') : $t('Dark theme')">
                <i v-if="dark" class="fa-solid fa-sun"></i>
                <i v-else class="fa-solid fa-moon"></i>
            </TriggerSidebarPartial>
            <LocalesPartial />
            <ProfilePartial />
        </div>
    </section>
</template>

<script>
import ProfilePartial from '../../Notebook/Partials/Sidebar/Dropdowns/Profile.vue';
import LocalesPartial from '../../Notebook/Partials/Sidebar/Dropdowns/Locales.vue';
import TriggerSidebarPartial from '../../Notebook/Partials/Sidebar/Trigger.vue';
import { Link } from '@inertiajs/vue3';

export default {
    name: 'SidebarPartial', 

    components: {
        ProfilePartial, 
        LocalesPartial, 
        TriggerSidebarPartial, 
        Link, 
    }, 

    computed: {
        dark() {
            return this.$store.state.dark;
        }, 
    }, 

    methods: {
        toggleDark() {
            this.$store.dispatch('dark', ! this.dark);
        }, 
    }, 
}
</script>

<style scoped>

</style>
