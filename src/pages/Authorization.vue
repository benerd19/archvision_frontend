<script setup>
import { ref, reactive } from 'vue'

const errorMessage = ref('')

const form = reactive({
    email: '',
    password: '',
})
async function submitForm() {
    try {
        if (!form.email || !form.password) {
            throw new Error('Заполните все поля')
        }
    } catch (error) {
        errorMessage.value = error.message
    }
}
</script>
<template>
    <div class="auth__wrapper">
        <div class="auth">
            <h2 class="auth__title">Войти</h2>
            <form action="submit" @submit.prevent="submitForm" class="auth__form">
                <span class="auth__form-label">Электронная почта</span>
                <el-input v-model="form.email" placeholder="E-mail" type="email" />
                <span class="auth__form-label">Пароль</span>
                <el-input v-model="form.password" placeholder="Пароль" type="password" />
                <span if="errorMessage" class="auth__form-error">{{ errorMessage }}</span>
                <el-button native-type="submit" class="auth__form-button">Войти</el-button>
            </form>
            <span class="auth__link-wrapper">Нет аккаунта? <router-link to="/registration" class="auth__link">Зарегистрируйтесь</router-link></span>
        </div>
    </div>
</template>
<style scoped lang="scss">
.auth {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
        text-align: center;
        font-size: 32px;
        line-height: 48px;
        color: var(--main-color);
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
    }

    &__wrapper {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__form-button {
        align-self: center;
    }

    &__link-wrapper {
        margin-top: 24px;
        font-size: 16px;
        line-height: 24px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
    }

    &__link {
        text-decoration: none;
        color: var(--main-color);
        font-weight: 600;
    }

    &__form-label {
        font-size: 16px;
        line-height: 24px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
    }

    &__form-error {
        align-self: center;
        font-size: 12px;
        line-height: 24px;
        color: red;
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
    }
}
</style>
