<template>
    <DropdownComponent 
        ref="dropdown" 
        :options="options" 
        @show="show = true"
        @hide="show = false"
        class="mt-auto w-full" 
        triggerClass="py-3 px-3 text-2xl border-0 block transition duration-300 ease-in-out focus-visible:outline-none"
        >
        <template #trigger>
            <div tabindex="0" v-if="$page.props.auth.user" class="mx-auto rounded-full border-2 transition duration-300 ease-in-out focus-visible:outline-none focus:border-indigo-500 dark:focus:border-indigo-600 focus-visible:border-indigo-500 dark:focus-visible:border-indigo-600" :class="{'border-indigo-500 dark:border-indigo-600': show, 'border-gray-500 dark:border-gray-400 hover:border-gray-600 dark:hover:border-gray-300': ! show}">
                <img class="h-8 w-8 rounded-full object-cover" :src="$page.props.auth.user.profile_photo_url" :alt="$page.props.auth.user.name">
            </div>
            <div tabindex="0" v-else class="mx-auto transition duration-300 ease-in-out focus:text-indigo-500 dark:focus:text-indigo-600" :class="{'text-indigo-500 dark:text-indigo-600': show, 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300': ! show}">
                <i class="fa-solid fa-circle-user text-3xl"></i>
            </div>
        </template>
        <template #content>
            <template v-if="$page.props.auth.user">
                <div class="block px-4 py-2 text-xs text-gray-400 select-none">
                    Manage Account
                </div>
    
                <DropdownItemComponent :href="route('profile.show')" as="Link">
                    Profile
                </DropdownItemComponent>
    
                <div class="border-t border-gray-300 dark:border-gray-600"></div>
    
                <DropdownItemComponent @click="$notebook.logout(); dropdown.hide();">
                    Log Out
                </DropdownItemComponent>
            </template>
            <template v-else>
                <DropdownItemComponent :href="route('login')" as="Link">
                    Login
                </DropdownItemComponent>
                <DropdownItemComponent :href="route('register')" as="Link">
                    Register
                </DropdownItemComponent>
            </template>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';
import { router } from '@inertiajs/vue3';

export default {
    name: 'ProfileDropdownSidebarPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
    }, 

    data() {
        return {
            options: {
                placement: 'right-end', 
                offsetSkidding: -10, 
            }, 
            show: false, 
        };
    },

    computed: {
        dropdown() {
            return this.$refs.dropdown?.dropdown;
        }, 
    },
}
</script>

<style scoped>

</style>
