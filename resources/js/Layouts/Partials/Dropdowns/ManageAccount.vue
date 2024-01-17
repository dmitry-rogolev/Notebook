<template>
    <DropdownComponent :options="options" triggerClass="flex text-sm rounded-full transition duration-200 ease-in-out border-0 focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600">
        <template #trigger>
            <img class="h-10 w-10 rounded-full object-cover" :src="$page.props.auth.user.profile_photo_url" :alt="$page.props.auth.user.name">
        </template>
        <template #content>

            <div class="block px-4 py-2 text-xs text-gray-400 select-none">
                Manage Account
            </div>

            <DropdownItemComponent :href="route('profile.show')" as="Link">
                Profile
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600"></div>

            <DropdownItemComponent @click="logout">
                Log Out
            </DropdownItemComponent>

        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';
import { router } from '../../../Classes/helpers';

export default {
    name: 'ManageAccountDropdownPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
    }, 

    data () {
        return {
            options: {
                placement: 'bottom-end', 
            }, 
        };
    },

    methods: {
        logout() {
            router().post(route('logout'));
        }, 
    }, 
}
</script>

<style scoped>

</style>
