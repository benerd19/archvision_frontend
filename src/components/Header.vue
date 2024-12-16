<script setup>
import { ref, onMounted } from 'vue'
import logosvg from '@/icons/Logo.vue'

const isLoggedIn = ref(localStorage?.getItem('token'))

const shortName = ref()

onMounted(async () => {
    try {
        if (!isLoggedIn.value) return
        const response = await fetch(`${import.meta.env.VITE_SERVER_IP}/api/users/short/info`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        const { name } = await response.json()
        shortName.value = name
    } catch (e) {
        console.log(e)
    }
})
</script>
<template>
    <header class="header">
        <div class="header__logo-container">
            <logosvg class="header__logo" />
            <h2 class="header__title">Archvision</h2>
        </div>
        <div class="header__buttons-wrapper" v-if="!isLoggedIn">
            <el-button @click="$router.push('/authorization')" class="header__button" size="large">Войти</el-button>
        </div>
        <div v-else>
            <span class="header__short-name" @click="$router.push('/profile')">{{ shortName }}</span>
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
        user-select: none;
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

    &__short-name {
        font-size: 16px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        cursor: pointer;
    }
}
</style>
