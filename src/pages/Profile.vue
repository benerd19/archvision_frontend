<script setup>
import { reactive, ref } from 'vue'
import Trash from '@/icons/Trash.vue'
import Edit from '@/icons/Edit.vue'
import { ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const tabValue = ref('')
const user = reactive({
    name: 'Иван',
    surname: 'Иванов',
    email: 'eYH8M@example.com',
})

const router = useRouter()

const isEdit = ref(false)
const editValue = reactive({
    name: user.name,
    surname: user.surname,
})

function deleteAccount() {
    ElMessageBox.confirm('Вы действительно хотите удалить аккаунт?', 'Удаление аккаунта', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
        confirmButtonClass: 'el-button--danger',
        cancelButtonClass: 'btn-main',
    })
        .then(() => {
            console.log('Удаление аккаунта')
            router.push('/')
        })
        .catch(() => {
            console.log('Отмена удаления аккаунта')
        })
}

function exitFromProfile() {
    ElMessageBox.confirm('Вы действительно хотите выйти из аккаунта?', 'Выход из аккаунта', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
        confirmButtonClass: 'el-button--danger',
        cancelButtonClass: 'btn-main',
    })
        .then(() => {
            console.log('Выход из аккаунта')
            router.push('/')
        })
        .catch(() => {
            console.log('Отмена выхода из аккаунта')
        })
}

function discardChange() {
    isEdit.value = false
}

function saveChanges() {
    user.name = editValue.name
    user.surname = editValue.surname
    isEdit.value = false
}

function changeToEdit() {
    isEdit.value = true
    editValue.name = user.name
    editValue.surname = user.surname
}
</script>
<template>
    <div class="profile__wrapper">
        <div class="profile">
            <el-tabs tab-position="left" style="height: 200px" class="demo-tabs" v-model="tabValue">
                <el-tab-pane label="Профиль" name="Profile" />
                <el-tab-pane label="Заявки" name="Requests" />
            </el-tabs>
            <div class="profile__content">
                <div class="profile__user-info" v-if="tabValue === 'Profile'">
                    <div class="profile__user-wrapper">
                        <h2 class="profile__user-name">Мой профиль</h2>
                        <h3>Фамилия</h3>
                        <el-input v-if="isEdit" v-model="editValue.surname" placeholder="Фамилия" />
                        <span v-else>{{ user.surname }}</span>
                        <h3>Имя</h3>
                        <el-input v-if="isEdit" v-model="editValue.name" placeholder="Имя" />
                        <span v-else>{{ user.name }}</span>
                        <h3>Почта</h3>
                        <span>{{ user.email }}</span>
                        <div class="profile__user-footer-btn" v-if="isEdit">
                            <el-button class="btn-main" @click="saveChanges">Сохранить</el-button>
                            <el-button @click="discardChange" class="btn-main">Отмена</el-button>
                        </div>
                        <el-button class="profile__user-btn" type="danger" @click="exitFromProfile" v-else>Выйти</el-button>
                    </div>
                    <div class="profile__user-svg-container" v-if="!isEdit">
                        <Edit class="profile__user-edit" @click="changeToEdit" />
                        <Trash class="profile__user-trash" @click="deleteAccount" />
                    </div>
                </div>
                <div class="profile__tasks" v-if="tabValue === 'Requests'">
                    <h2 class="profile__tasks-title">Мои заявки</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.profile {
    width: 100%;
    max-width: 960px;
    display: flex;
    padding-top: 100px;
    font-family: 'Work Sans', sans-serif;
    &__wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    &__content {
        width: 100%;
    }

    &__user-name {
        text-align: center;
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 24px;
        color: var(--main-color);
        margin: 0;
    }

    &__user-info {
        display: flex;
        justify-content: space-between;
    }

    &__user-btn {
        align-self: flex-start;
        margin-top: 24px;
    }

    &__user-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__user-svg-container {
        display: flex;
        gap: 12px;
    }

    &__user-trash,
    &__user-edit {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
}
</style>
