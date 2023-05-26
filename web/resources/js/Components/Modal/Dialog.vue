<template>
    <div
        :class="[
            !isClear ? defaultClass : '', 
            isCentered && !centeredClass ? defaultCenteredClass : '', 
            isCentered && centeredClass ? centeredClass : '', 
            isScrollable && !scrollableClass ? defaultScrollableClass : '', 
            isScrollable && scrollableClass ? scrollableClass : '', 
            isResponsive && !responsiveClass ? defaultResponsiveClass : '', 
            isResponsive && responsiveClass ? responsiveClass : '', 
            this.class, 
        ]"
        >
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'DialogComponent', 

    data() {
        return {
            defaultClass: [
                'relative', 
                'w-auto', 
                'max-w-[500px]', 
                'mx-auto', 
                'm-7', 
                'pointer-events-none', 
            ], 
            defaultCenteredClass: [
                'flex', 
                'items-center', 
                'min-h-[calc(100%-1.75rem*2)]', 
            ], 
            defaultScrollableClass: [
                'h-[calc(100%-1.75rem*2)]', 
            ], 
            defaultResponsiveClass: [
                'sm:max-w-[300px]', 
                'md:max-w-[500px]', 
                'lg:max-w-[800px]', 
                'xl:max-w-[1140px]', 
            ], 
            isClear: 'clear' in this.$attrs,
            isCentered: 'centered' in this.$attrs || this.centered, 
            isScrollable: 'scrollable' in this.$attrs || this.scrollable, 
            isResponsive: 'responsive' in this.$attrs || this.responsive, 
        };
    }, 

    props: {
        class: {
            type: [ Array, String ], 
            default: '', 
        }, 
        centeredClass: {
            type: [ Array, String ], 
            default: '', 
        }, 
        scrollableClass: {
            type: [ Array, String ], 
            default: '', 
        }, 
        responsiveClass: {
            type: [ Array, String ], 
            default: '', 
        }, 
        centered: {
            type: Boolean, 
            default: false, 
        }, 
        scrollable: {
            type: Boolean, 
            default: false, 
        }, 
        responsive: {
            type: Boolean, 
            default: false, 
        }, 
    }, 
}
</script>