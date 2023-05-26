<template>
    <div
        :class="[
            !isClear ? defaultClass : '', 
            isScrollable && !scrollableClass ? defaultScrollableClass : '', 
            isScrollable && scrollableClass ? scrollableClass : '', 
            this.class, 
        ]"
        >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ContentComponent', 

    data() {
        return {
            defaultClass: [
                'relative', 
                'flex', 
                'flex-col', 
                'w-full', 
                'text-gray-900', 
                'dark:text-gray-100', 
                'pointer-events-auto', 
                'bg-gray-200', 
                'dark:bg-gray-800', 
                'bg-clip-padding', 
                'border', 
                'border-solid', 
                'border-gray-300', 
                'dark:border-gray-700', 
                'rounded-md',
                'shadow-lg', 
                'outline-0',  
            ], 
            defaultScrollableClass: [
                'max-h-full', 
                'overflow-hidden', 
            ], 
            isClear: 'clear' in this.$attrs,
            isScrollable: 'scrollable' in this.$attrs || this.scrollable, 
        };
    }, 

    props: {
        class: {
            type: [ Array, String ], 
            default: '', 
        }, 
        scrollableClass: {
            type: [ Array, String ], 
            default: '', 
        }, 
        scrollable: {
            type: Boolean, 
            default: false, 
        }, 
    }, 
}
</script>