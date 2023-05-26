<template>
    <div
        :class="[
            !isClear ? defaultClass : '', 
            this.class, 
        ]"
        >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent', 

    data() {
        return {
            defaultClass: [
                'flex', 
                'flex-shrink-0', 
                'items-center', 
                'justify-between', 
                'p-4', 
                'border-b', 
                'border-solid', 
                'border-gray-300', 
                'dark:border-gray-700', 
                'rounded-t-md', 
                'empty:hidden', 
            ], 
            isClear: 'clear' in this.$attrs,
        };
    }, 

    props: {
        class: {
            type: [ Array, String ], 
            default: '', 
        }, 
    }, 
}
</script>