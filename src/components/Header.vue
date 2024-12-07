<script setup>
import logosvg from '@/icons/Logo.vue'
</script>
<template>
    <header class="header">
        <div class="header__logo-container">
            <logosvg class="header__logo" />
            <h2 class="header__title">Archvision</h2>
        </div>
        <div class="header__buttons-wrapper">
            <el-button @click="$router.push('/authorization')" class="header__button" size="large">Войти</el-button>
        </div>
    </header>
</template>
<style scoped lang="scss">
::v-deep(.el-button.plain) {
    background-color: white;
}

.header {
    box-sizing: border-box;
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    width: 100%;
    background-color: var(--white);
    z-index: 100;

    &__logo-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    &__logo {
        width: 48px;
        height: 48px;
        color: red;
    }

    &__title {
        margin: 0;
        font-size: 36px;
        font-weight: 400;
        color: var(--main-color);
        font-family: 'Poppins', sans-serif;
    }

    &__buttons-wrapper {
        display: flex;
        gap: 8px;
    }

    &__button:hover {
        background-color: var(--main-color);
        color: var(--white);
        border-color: var(--main-color);
    }
}
</style>
