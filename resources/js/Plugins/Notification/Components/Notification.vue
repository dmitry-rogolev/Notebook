<template>
    <div 
        v-if="notification && notification.message" 
        class="flex flex-nowrap min-w-[15rem] h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 rounded-lg select-none shadow-lg z-50 mb-2"
        >
        <div class="flex-auto px-4 py-2">
            <i v-if="notification.success" class="fa-solid fa-check mr-2 text-green-600 font-bold"></i>
            <i v-if="notification.error" class="fa-solid fa-bug mr-2 text-red-600 font-bold"></i>
            <span>{{ notification.message }}</span>
        </div>
        <button 
            @click="$emit('close')" 
            type="button" 
            class="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-l border-gray-300 dark:border-gray-700 rounded-r-lg px-4 transition duration-200 ease-in-out"
            >
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'NotificationComponent', 

    emits: [
        'close', 
    ], 
    
    props: {
        /**
        * @property {Object} notification
        * @property {String} notification.message
        * @property {Boolean} [notification.success]
        * @property {Boolean} [notification.error]
        */
        notification: {
            type: Object, 
            required: true, 
        }, 
    }, 
}
</script>