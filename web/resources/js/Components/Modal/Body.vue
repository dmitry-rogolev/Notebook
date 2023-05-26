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
    name: 'BodyComponent', 

    data() {
        return {
            defaultClass: [
                'relative', 
                'flex-auto', 
                'p-4', 
                'text-gray-700',
                'dark:text-gray-300', 
                'empty:hidden',  
            ], 
            defaultScrollableClass: [
                'overflow-y-auto', 
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