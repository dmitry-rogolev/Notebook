<template>
    <UploadImageModalComponent triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <div class="flex flex-nowrap items-center">
            <div class="flex-auto">
                <i class="fa-solid fa-image w-6 text-center mr-2"></i>
                <span>Image</span>
            </div>
            <div class="text-xs font-bold">Alt + I</div>
        </div>
    </UploadImageModalComponent>
</template>

<script>
import UploadImageModalComponent from '../UploadImage.vue';

export default {
    name: 'UploadImageWindowMenuModalPartial', 

    components: {
        UploadImageModalComponent, 
    }, 

}
</script>

<style scoped>

</style>
