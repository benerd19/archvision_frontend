<script setup>
import { reactive, ref } from 'vue'
import Trash from '@/icons/Trash.vue'
import Edit from '@/icons/Edit.vue'
import { ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const tabValue = ref('Profile')
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

const isTasksEdit = ref(false)
const taskEditId = ref(null)

const taskValue = reactive({
    type: '',
    description: '',
})

const taskProjects = reactive([
    {
        label: 'Project 1',
        value: 'Project 1',
    },
    {
        label: 'Project 2',
        value: 'Project 2',
    },
    {
        label: 'Project 3',
        value: 'Project 3',
    },
])

const tasks = reactive([
    {
        type: 'Project 1',
        description: 'Описание проекта 1',
        status: 'На рассмотрении',
    },
    {
        type: 'Project 2',
        description: 'Описание проекта 2',
        status: 'На рассмотрении',
    },
    {
        type: 'Project 3',
        description: 'Описание проекта 3',
        status: 'На рассмотрении',
    },
])

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
    if (!editValue.name || !editValue.surname) return
    user.name = editValue.name
    user.surname = editValue.surname
    isEdit.value = false
}

function changeToEdit() {
    isEdit.value = true
    editValue.name = user.name
    editValue.surname = user.surname
}

function deleteTask(id) {
    ElMessageBox.confirm('Вы действительно хотите удалить заявку', 'Удаление заявки', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
        confirmButtonClass: 'el-button--danger',
        cancelButtonClass: 'btn-main',
    })
        .then(() => {
            tasks.splice(id, 1)
            console.log('Удаленаие заявки')
        })
        .catch(() => {
            console.log('Отмена удаления заявки')
        })
}

function editTask(id) {
    taskEditId.value = id
    taskValue.type = tasks[id].type
    taskValue.description = tasks[id].description
    isTasksEdit.value = true
}

function saveTask() {
    tasks[taskEditId.value].type = taskValue.type
    tasks[taskEditId.value].description = taskValue.description
    taskEditId.value = null
    isTasksEdit.value = false
}
function canselTask() {
    taskEditId.value = null
    isTasksEdit.value = false
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
                    <div class="profile__tasks-list" v-for="(task, index) in tasks" :key="index">
                        <div class="profile__tasks-info">
                            <h3 class="profile__tasks-header">Тип проекта</h3>
                            <el-select v-model="taskValue.type" placeholder="Выберите проект" size="large" v-if="isTasksEdit && taskEditId === index">
                                <el-option v-for="(item, index) in taskProjects" :key="index" :label="item.label" :value="item.value" />
                            </el-select>
                            <span v-else>{{ task.type }}</span>
                            <h3 class="profile__tasks-header">Описание</h3>
                            <el-input
                                v-model="taskValue.description"
                                placeholder="Описание"
                                type="textarea"
                                v-if="isTasksEdit && taskEditId === index"
                            />
                            <span v-else>{{ task.description }}</span>
                            <h3 class="profile__tasks-header">Статус</h3>
                            <span>{{ task.status }}</span>
                            <div class="profile__tasks-btns" v-if="isTasksEdit && taskEditId === index">
                                <el-button class="btn-main" @click="saveTask">Сохранить</el-button>
                                <el-button class="btn-main" @click="canselTask">Отмена</el-button>
                            </div>
                        </div>
                        <div class="profile__tasks-svg" v-if="taskEditId !== index">
                            <Edit class="profile__tasks-edit" @click="editTask(index)" />
                            <Trash class="profile__tasks-trash" @click="deleteTask(index)" />
                        </div>
                    </div>
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

    &__user-name,
    &__tasks-title {
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

    &__tasks {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
    }

    &__tasks-list {
        max-width: 640px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 24px;
        gap: 12px;
        border: 1px solid var(--main-color);
        border-radius: 4px;
    }

    &__tasks-info {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__tasks-header {
        margin: 0;
        font-weight: 600;
        color: var(--main-color);
        font-size: 20px;
    }

    &__tasks-edit,
    &__tasks-trash {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    &__tasks-svg {
        display: flex;
        gap: 4px;
    }
}
</style>
