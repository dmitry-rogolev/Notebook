<template>
    <transition name="find">
        <section v-show="show" tabindex="-1" class="absolute z-50" v-bind="$attrs">
            <div class="flex flex-nowrap">
                <slot name="find"></slot>
            </div>

            <div v-if="showReplace" :class="[dividerClass]"></div>

            <transition name="replace">
                <div class="flex flex-nowrap" v-show="showReplace">
                    <slot name="replace"></slot>
                </div>
            </transition>
        </section>
    </transition>
</template>

<script>
export default {
    name: 'MarkComponent', 

    computed: {
        show() {
            return this.$mark.isShow;
        }, 
        showReplace() {
            return this.$mark.isShowReplace;
        }, 
    },

    props: {
        dividerClass: {
            type: [ Array, String ], 
            default: '',
        }, 
    }, 
}
</script>

<style scoped>
.find-enter-active,
.find-leave-active {
  transition: all 0.2s ease;
}
.find-enter-from,
.find-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.replace-enter-active,
.replace-leave-active {
  transition: all 0.2s ease;
}
.replace-enter-from,
.replace-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
