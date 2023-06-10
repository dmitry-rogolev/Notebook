<template>
    <div
        v-if="this.as == 'div'"
        role="menuitem"
        class="select-none transition duration-200 ease-in-out w-full"
        :class="[this.class]"
        >
        <slot></slot>
    </div>
    <button
        v-else-if="this.as == 'button'"
        role="menuitem"
        class="focus-visible:outline-none select-none transition duration-200 ease-in-out w-full"
        :class="[this.class]"
        >
        <slot></slot>
    </button>
    <a
        v-else-if="this.as == 'a'"
        role="menuitem"
        class="select-none transition duration-200 ease-in-out w-full"
        :class="[this.class]"
        >
        <slot></slot>
    </a>
    <Link
        v-else-if="this.as == 'Link'"
        role="menuitem"
        class="select-none transition duration-200 ease-in-out w-full"
        :class="[this.class]"
        >
        <slot></slot>
    </Link>
</template>

<script>
import { Link } from '@inertiajs/vue3';

export default {
    name: 'DropdownItemComponent', 

    components: {
        Link, 
    }, 

    props: {
        as: {
            type: String,
            default: 'button'
        },
        class: {
            type: [ Array, String ], 
            default: '', 
        }, 
    },
}
</script>

<style scoped>

</style>
