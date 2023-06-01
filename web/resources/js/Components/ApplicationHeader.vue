<template>
    <header class="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 print:hidden select-none">
        <nav class="px-4 sm:px-6 lg:px-8 flex justify-between h-16">

            <div class="flex">
                <div class="flex">
                    <slot name="logo"></slot>
                </div>
                <div class="mx-8 flex">
                    <slot name="nav"></slot>
                </div>
            </div>

            <div class="flex items-center">
                <slot name="manager"></slot>
            </div>

        </nav>
    </header>
</template>

<script>
export default {
    name: 'ApplicationHeaderComponent', 
};
</script>