<template>
    <div class="relative">
        <button 
            ref="trigger"
            type="button"
            role="button"
            :class="[triggerClass]"
            class="focus:outline-none select-none transition duration-200 ease-in-out"
            v-bind="$attrs"
            >
            <slot name="trigger"></slot>
        </button>
        
        <teleport to="body">
            <div 
                ref="target"
                class="z-40 hidden shadow-lg rounded-lg"
                >
                <div 
                    ref="menu"
                    role="menu"
                    class="overflow-y-auto py-1.5 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border rounded-lg"
                    :class="[targetClass, widthClass, heightClass]"
                    :style="{maxHeight: hasHeightClass ? '' : maxHeight}"
                    >
                    <slot name="content"></slot>
                </div>
            </div>
        </teleport>
    </div>

</template>

<script>
import { Dropdown } from 'flowbite';

export default {
    name: 'DropdownDomponent', 

    emits: [
        'show', 
        'hide', 
    ], 

    data() {
        return {
            dropdown: null, 
            active: false, 
            maxHeight: '', 
            defaultOptions: {
                placement: 'bottom-start', 
                triggerType: 'click', 
                offsetDistance: 4, 
                offsetSkidding: 0, 
                delay: 300, 
                onShow: () => {
                    this.active = true;
                    if (! this.hasHeightClass) {
                        this.defineMaxHeight();
                    }
                    this.$emit('show');
                }, 
                onHide: () => {
                    this.active = false;
                    this.$emit('hide');
                }, 
            }, 
        };
    },

    computed: {
        rem() {
            return parseFloat(getComputedStyle(document.documentElement).fontSize);
        }, 
        hasHeightClass() {
            return !! (this.heightClass || (Array.isArray(this.heightClass) && this.heightClass.length && this.heightClass[0]));
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
        heightClass: {
            type: [ Array, String ],
            default: '', 
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
            return Object.assign({}, this.defaultOptions, this.options);
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
        if (! this.hasHeightClass) {
            this.defineWindowResizeListener();
        }
    }, 

    unmounted() {
        if (! this.hasHeightClass) {
            this.removeWindowResizeListener();
        }
    }, 
}
</script>

<style scoped>

</style>
