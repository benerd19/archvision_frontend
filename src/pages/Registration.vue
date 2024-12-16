<script setup>
import { ref, reactive } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const server = import.meta.env.VITE_SERVER_IP

const errorMessage = ref('')

const form = reactive({
    email: '',
    password: '',
    name: '',
    surname: '',
})
async function submitForm() {
    try {
        errorMessage.value = ''

        if (!form.email || !form.password || !form.name || !form.surname) {
            throw new Error('Заполните все поля')
        }

        const response = await fetch(`${server}/api/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })

        if (!response.ok) {
            throw new Error('Что-то пошло не так')
        }
        localStorage.setItem('create', true)

        router.push('/authorization')
    } catch (error) {
        errorMessage.value = error.message
    }
}
</script>
<template>
    <div class="registr__wrapper">
        <div class="registr">
            <h2 class="registr__title">Регистрация</h2>
            <form action="submit" @submit.prevent="submitForm" class="registr__form">
                <span class="registr__form-label">Фамилия</span>
                <el-input v-model="form.surname" placeholder="Фамилия" />
                <span class="registr__form-label">Имя</span>
                <el-input v-model="form.name" placeholder="Имя" />
                <span class="registr__form-label">Электронная почта</span>
                <el-input v-model="form.email" placeholder="E-mail" type="email" />
                <span class="registr__form-label">Пароль</span>
                <el-input v-model="form.password" placeholder="Пароль" type="password" />
                <span if="errorMessage" class="registr__form-error">{{ errorMessage }}</span>
                <el-button native-type="submit" class="registr__form-button">Зарегистрироваться</el-button>
            </form>
            <span class="registr__link-wrapper">Уже есть аккаунт? <router-link to="/authorization" class="registr__link">Войдите</router-link></span>
        </div>
    </div>
</template>
<style scoped lang="scss">
.registr {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 280px;
    width: 100%;

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
        width: 100%;
    }

    &__form-button {
        align-self: center;

        &:hover {
            background-color: var(--main-color);
            color: var(--white);
            border-color: var(--main-color);
        }
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
