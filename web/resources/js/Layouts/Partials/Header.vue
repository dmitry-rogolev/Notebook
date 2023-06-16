<template>
    <ApplicationHeaderComponent class="z-10">
        <template #logo>
            <ApplicationLogoComponent />
        </template>
        <template #nav>
            <NavLink :href="route('notebook')" :active="route().current('notebook')">
                Notebook
            </NavLink>
        </template>
        <template #manager>
            <ManageAccountDropdownPartial />
        </template>
    </ApplicationHeaderComponent>
</template>

<script>
import ManageAccountDropdownPartial from './Dropdowns/ManageAccount.vue';
import ApplicationHeaderComponent from '@/Components/ApplicationHeader.vue';
import ApplicationLogoComponent from '@/Components/ApplicationLogo.vue';
import NavLink from '@/Components/NavLink.vue';

export default {
    name: 'ApplicationHeaderPartial', 

    components: {
        ApplicationHeaderComponent, 
        ApplicationLogoComponent, 
        NavLink, 
        ManageAccountDropdownPartial, 
    }, 
};
</script>