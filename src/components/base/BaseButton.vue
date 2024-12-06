<script setup lang="ts">
const props = defineProps(['text'])
</script>
<template>
    <button class="btn">
        {{ props.text }}
    </button>
</template>
<style scoped lang="scss">
.btn {
    background-color: var(--white);
    font-size: 16px;
    padding: 8px;
    cursor: pointer;
    border: 1px solid var(--main-color);
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
    font-weight: 400;
    font-family: 'Work Sans', sans-serif;

    &:hover {
        background-color: var(--main-color);
        color: var(--white);
    }
}
</style>
