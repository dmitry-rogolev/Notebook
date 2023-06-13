<template>
    <CreateLinkModalComponent triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <div class="flex flex-nowrap items-center">
            <div class="flex-auto">
                <i class="fa-solid fa-link w-6 text-center mr-2"></i>
                <span>Link</span>
            </div>
            <div class="text-xs font-bold">Alt + L</div>
        </div>
    </CreateLinkModalComponent>
</template>

<script>
import CreateLinkModalComponent from '../CreateLink.vue';

export default {
    name: 'CreateLinkWindowMenuModalPartial', 

    components: {
        CreateLinkModalComponent, 
    }, 
}
</script>

<style scoped>

</style>
