<template>
    <div class="relative">
        <button 
            ref="trigger"
            type="button"
            role="button"
            :class="[triggerClass]"
            class="focus:outline-none select-none transition duration-200 ease-in-out"
            v-bind="$attrs"
            :aria-expanded="active"
            >
            <slot name="trigger"></slot>
        </button>
        
        <div 
            ref="target"
            class="z-40 hidden shadow-lg"
            >
            <div 
                ref="menu"
                role="menu"
                class="overflow-y-auto"
                :class="[targetClass, widthClass]"
                :style="{maxHeight: maxHeight}"
                >
                <slot name="content"></slot>
            </div>
        </div>
    </div>

</template>

<script>
import { Dropdown } from 'flowbite';

export default {
    name: 'DropdownDomponent', 

    data() {
        return {
            dropdown: null, 
            active: false, 
            maxHeight: '', 
            defaultOptions: {
                onShow: () => {
                    this.active = true;
                    this.defineMaxHeight();
                }, 
                onHide: () => {
                    this.active = false;
                }, 
                delay: 300, 
            }
        };
    },

    computed: {
        rem() {
            return parseFloat(getComputedStyle(document.documentElement).fontSize);
        }, 
    },

    props: {
        triggerClass: {
            type: [ Array, String ],
            default: '', 
        },
        targetClass: {
            type: [ Array, String ],
            default: '', 
        },
        widthClass: {
            type: [ Array, String ],
            default: 'w-48', 
        },
        options: {
            type: Object, 
            default: {}, 
        }, 
    },

    methods: {
        initDropdown() {
            this.dropdown = new Dropdown(this.$refs.target, this.$refs.trigger, this.getOptions());
        }, 
        getOptions() {
            return Object.assign({}, this.options, this.defaultOptions);
        }, 
        defineMaxHeight() {
            this.maxHeight = document.documentElement.clientHeight - this.$refs.trigger.getBoundingClientRect().bottom - this.rem + 'px';
        }, 
        defineWindowResizeListener() {
            document.addEventListener('resize', this.defineMaxHeight);
        }, 
        removeWindowResizeListener() {
            document.removeEventListener('resize', this.defineMaxHeight);
        }, 
    }, 

    mounted() {
        this.initDropdown();
        this.defineWindowResizeListener();
    }, 

    unmounted() {
        this.removeWindowResizeListener();
    }, 
}
</script>

<style scoped>

</style>
