<template>
    <DropdownComponent 
        ref="dropdown" 
        :options="options" 
        @show="show = true"
        @hide="show = false"
        :title="$t('User')"
        class="w-full" 
        triggerClass="py-3 px-2 text-2xl border-0 block transition duration-300 ease-in-out focus-visible:outline-none"
        >
        <template #trigger>
            <img 
                v-if="$page.props.auth.user"
                class="h-8 w-8 mx-auto rounded-full object-cover border-2 transition duration-300 ease-in-out focus-visible:outline-none focus:border-indigo-500 dark:focus:border-indigo-600 focus-visible:border-indigo-500 dark:focus-visible:border-indigo-600" 
                :class="{'border-indigo-500 dark:border-indigo-600': show, 'border-gray-500 dark:border-gray-400 hover:border-gray-600 dark:hover:border-gray-300': ! show}"
                :src="$page.props.auth.user.profile_photo_url" 
                :alt="$page.props.auth.user.name"
                >
            <div v-else class="fa-solid fa-circle-user text-3xl transition duration-300 ease-in-out focus:text-indigo-500 dark:focus:text-indigo-600" :class="{'text-indigo-500 dark:text-indigo-600': show, 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300': ! show}"></div>
        </template>
        <template #content>
            <template v-if="$page.props.auth.user">
                <div class="block px-4 py-2 text-xs text-gray-400 select-none">
                    {{ $t('Manage Account') }}
                </div>
    
                <DropdownItemComponent :href="route('profile.show')" as="Link">
                    {{ $t('Profile') }}
                </DropdownItemComponent>
    
                <div class="border-t border-gray-300 dark:border-gray-600"></div>
    
                <DropdownItemComponent @click="$notebook.logout(); dropdown.hide();">
                    {{ $t('Log Out') }}
                </DropdownItemComponent>
            </template>
            <template v-else>
                <DropdownItemComponent :href="route('login')" as="Link">
                    {{ $t('Login') }}
                </DropdownItemComponent>
                <DropdownItemComponent :href="route('register')" as="Link">
                    {{ $t('Registration') }}
                </DropdownItemComponent>
            </template>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';

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
