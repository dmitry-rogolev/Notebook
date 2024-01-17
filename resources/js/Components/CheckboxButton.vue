<template>
    <div class="z-30">
        <input 
            type="checkbox" 
            :id="toggleToken"
            class="peer hidden" 
            v-model="value"
            />
        <label 
            :for="toggleToken"
            class="block h-full px-3 leading-10 bg-white dark:bg-gray-800 peer-checked:bg-gray-100 dark:peer-checked:bg-gray-700 border-gray-300 dark:border-gray-600 border text-gray-700 dark:text-gray-300 focus:text-indigo-500 dark:focus:text-indigo-500 select-none cursor-pointer font-bold focus-visible:outline-none transition duration-200 ease-in-out"
            :class="[this.class]"
            tabindex="0"
            >
            Aa
        </label>
    </div>
</template>

<script>
import { token } from '../Classes/helpers';

export default {
    name: 'CheckboxButtonComponent', 

    emits: [
        'update:modelValue', 
    ],

    data() {
        return {
            toggleToken: token(), 
        };
    }, 

    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }, 

    props: {
        modelValue: {
            type: Boolean, 
            default: false, 
        }, 
        class: {
            type: [ Array, String ], 
            default: '', 
        }, 
    }, 
};
</script>