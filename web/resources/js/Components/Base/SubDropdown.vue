<template>
    <div>
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
            role="menu"
            :class="[targetClass, widthClass]"
            class="z-50 hidden shadow-lg"
            @click="dropdown.hide()"
            :style="{maxHeight: maxHeight}"
            >
            <slot name="content"></slot>
        </div>
    </div>

</template>

<script>
import { Dropdown } from 'flowbite';

export default {
    name: 'SubDropdownComponent', 

    data() {
        return {
            dropdown: null, 
            maxHeight: '', 
            active: false, 
            defaultOptions: {
                onShow: () => {
                    this.active = true;
                }, 
                onHide: () => {
                    this.active = false;
                }, 
            }
        };
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
    }, 

    mounted() {
        this.initDropdown();
    }, 
}
</script>

<style scoped>

</style>
