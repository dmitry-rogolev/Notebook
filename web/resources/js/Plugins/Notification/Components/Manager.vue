<template>
    <div class="absolute bottom-0 right-0 p-4">
        <TransitionGroup name="list" tag="div">
            <NotificationComponent 
                v-for="(notification, index) in $notifier.notifications" 
                :key="index" 
                :data-index="index" 
                :notification="notification"
                @close="$notifier.remove(index)"
                >
            </NotificationComponent>
        </TransitionGroup>
    </div>
</template>

<script>
import NotificationComponent from './Notification.vue';

export default {
    name: 'NotificationManagerComponent', 

    components: {
        NotificationComponent, 
    }, 
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
