<script setup lang="ts">
import logosvg from '@/icons/Logo.vue'
</script>
<template>
    <footer class="footer">
        <logosvg class="footer__logo" />
        <h2 class="footer__title">Archvision</h2>
    </footer>
</template>
<style scoped lang="scss">
.footer {
    padding: 36px 0;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    &__logo {
        max-width: 180px;
        width: 100%;
        height: 180px;
    }

    &__title {
        text-align: center;
        font-size: 32px;
        line-height: 48px;
        color: black;
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
        margin: 0;
    }
}
</style>
