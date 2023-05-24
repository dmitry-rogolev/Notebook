<template>
    <div :class="{dark: dark}">
        <Head :title="title" />

        <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <header class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow">
                <nav class="px-4 sm:px-6 lg:px-8 flex justify-between h-16">
                    <div class="flex">
                        
                        <ApplicationLogoComponent />

                        <div class="mx-8 flex">
                            <NavLink :href="route('notebook')" :active="route().current('notebook')">
                                Notebook
                            </NavLink>
                        </div>
                    </div>

                    <div class="flex items-center">
                        <DropdownComponent align="right">
                            <template #trigger>
                                <button class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                    <img class="h-10 w-10 rounded-full object-cover" :src="$page.props.auth.user.profile_photo_url" :alt="$page.props.auth.user.name">
                                </button>
                            </template>

                            <template #content>
                                <div class="block px-4 py-2 text-xs text-gray-400">
                                    Manage Account
                                </div>

                                <DropdownLinkComponent :href="route('profile.show')">
                                    Profile
                                </DropdownLinkComponent>

                                <div class="border-t border-gray-200 dark:border-gray-600"></div>

                                <form @submit.prevent="logout">
                                    <DropdownLinkComponent as="button">
                                        Log Out
                                    </DropdownLinkComponent>
                                </form>
                            </template>
                        </DropdownComponent>
                    </div>
                </nav>
            </header>

            <main class="flex-auto flex flex-col">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script>
import { Head, Link } from '@inertiajs/vue3';
import ApplicationLogoComponent from '@/Components/ApplicationLogo.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';

export default {
    name: 'AppLayout', 

    components: {
        Head, 
        Link, 
        ApplicationLogoComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
        NavLink, 
    }, 

    computed: {
        dark() {
            return this.$store.state.dark;
        }, 
    }, 

    props: {
        title: {
            type: String, 
            default: '', 
        }, 
    }, 

    created() {
        this.$store.dispatch('dark');
    }, 
};
</script>