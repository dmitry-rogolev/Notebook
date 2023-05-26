<template>
    <ApplicationHeaderComponent>
        <template #logo>
            <ApplicationLogoComponent />
        </template>
        <template #nav>
            <NavLink :href="route('notebook')" :active="route().current('notebook')">
                Notebook
            </NavLink>
        </template>
        <template #manager>
            <DropdownComponent @open="isOpenManager = true" @close="isOpenManager = false" align="right">
                <template #trigger>
                    <button 
                        role="button"
                        class="trigger flex text-sm rounded-full transition duration-200 ease-in-out border-0 focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                        aria-haspopup="menu"
                        :aria-expanded="isOpenManager"
                        >
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

                    <div class="border-t border-gray-300 dark:border-gray-600"></div>

                    <DropdownLinkComponent as="button" @click="logout">
                        Log Out
                    </DropdownLinkComponent>
                </template>
            </DropdownComponent>
        </template>
    </ApplicationHeaderComponent>
</template>

<script>
import { router } from '@inertiajs/vue3';
import ApplicationHeaderComponent from '@/Components/ApplicationHeader.vue';
import ApplicationLogoComponent from '@/Components/ApplicationLogo.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';

export default {
    name: 'ApplicationHeaderPartial', 

    components: {
        ApplicationHeaderComponent, 
        ApplicationLogoComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
        NavLink, 
    }, 

    data() {
        return {
            isOpenManager: false, 
        };
    }, 

    methods: {
        logout() {
            router.post(route('logout'));
        }, 
    }, 
};
</script>