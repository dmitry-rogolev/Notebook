<template>
    <AppLayout title="Notebook">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Notebook
            </h2>
        </template>

        <div class="flex-auto flex">

            <SidebarPartial />

            <WindowPartial />
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout.vue';
import SidebarPartial from '@/Pages/Notebook/Partials/Sidebar.vue';
import WindowPartial from '@/Pages/Notebook/Partials/Window.vue';

export default {
    name: 'NotebookPage', 

    components: {
        AppLayout, 
        SidebarPartial, 
        WindowPartial, 
    }, 
}
</script>
