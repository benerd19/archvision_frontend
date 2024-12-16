<script setup>
import { reactive, ref, onMounted } from 'vue'
import Trash from '@/icons/Trash.vue'
import Edit from '@/icons/Edit.vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const tabValue = ref('Profile')
const user = reactive({})

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

const taskProjects = reactive([])

const tasks = reactive([])

function deleteAccount() {
    ElMessageBox.confirm('Вы действительно хотите удалить аккаунт?', 'Удаление аккаунта', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
        confirmButtonClass: 'el-button--danger',
        cancelButtonClass: 'btn-main',
    })
        .then(async () => {
            try {
                await fetch(`${import.meta.env.VITE_SERVER_IP}/api/users/delete`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                localStorage.removeItem('token')
                router.push('/')
            } catch (e) {
                console.log(e)
            }
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
            localStorage.removeItem('token')
            router.push('/')
        })
        .catch(() => {
            console.log('Отмена выхода из аккаунта')
        })
}

function discardChange() {
    isEdit.value = false
}

async function saveChanges() {
    try {
        if (!editValue.name || !editValue.surname) return
        user.name = editValue.name
        user.surname = editValue.surname
        isEdit.value = false
        await fetch(`${import.meta.env.VITE_SERVER_IP}/api/users/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                name: user.name,
                surname: user.surname,
            }),
        })
    } catch (error) {
        console.log(error)
    }
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
        .then(async () => {
            console.log(id)
            tasks.splice(id, 1)
            const response = await fetch(`${import.meta.env.VITE_SERVER_IP}/api/orders/cancel`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 8,
                }),
            })
        })
        .catch(() => {
            console.log('Отмена удаления заявки')
        })
}

function editTask(id) {
    console.log(id)
    taskEditId.value = id
    const taskChoose = tasks.find((task) => task.id === id)
    taskValue.type = taskChoose.type
    taskValue.description = taskChoose.description
    isTasksEdit.value = true
}

async function saveTask() {
    try {
        const index = tasks.findIndex((task) => task.id === taskEditId.value)
        const response = await fetch(`${import.meta.env.VITE_SERVER_IP}/api/orders/update`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: taskEditId.value,
                project: taskValue.type,
                description: taskValue.description,
            }),
        })

        if (!response.ok) {
            throw new Error('Что-то пошло не так')
        }

        const { type, description } = await response.json()

        tasks[index].type = type
        tasks[index].description = description

        taskEditId.value = null
        isTasksEdit.value = false
    } catch (e) {
        console.log(e)
    }
}
function canselTask() {
    taskEditId.value = null
    isTasksEdit.value = false
}

onMounted(async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_IP}/api/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        const data = await response.json()
        user.email = data.email
        user.name = data.name
        user.surname = data.surname

        const responseTasks = await fetch(`${import.meta.env.VITE_SERVER_IP}/api/orders/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (!responseTasks.ok) {
            throw new Error('Что-то пошло не так')
        }
        const dataTasks = await responseTasks.json()
        tasks.push(...dataTasks)

        const responseProjects = await fetch(`${import.meta.env.VITE_SERVER_IP}/api/projects/all`)
        const dataProjects = await responseProjects.json()
        taskProjects.push(...dataProjects.map((item) => ({ label: item.name, value: item.id })))
    } catch (e) {
        console.error(e.message)
    }
})
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
                    <h3 v-if="tasks.length === 0">У вас пока нет заявок</h3>
                    <div class="profile__tasks-list" v-for="task in tasks" :key="task.id" v-else>
                        <div class="profile__tasks-info">
                            <h3 class="profile__tasks-header">Тип проекта</h3>
                            <el-select
                                v-model="taskValue.type"
                                placeholder="Выберите проект"
                                size="large"
                                v-if="isTasksEdit && taskEditId === task.id"
                            >
                                <el-option v-for="(item, index) in taskProjects" :key="index" :label="item.label" :value="item.value" />
                            </el-select>
                            <span v-else>{{ task.type }}</span>
                            <h3 class="profile__tasks-header">Описание</h3>
                            <el-input
                                v-model="taskValue.description"
                                placeholder="Описание"
                                type="textarea"
                                v-if="isTasksEdit && taskEditId === task.id"
                            />
                            <span v-else>{{ task.description }}</span>
                            <h3 class="profile__tasks-header">Статус</h3>
                            <span>{{ task.status }}</span>
                            <div class="profile__tasks-btns" v-if="isTasksEdit && taskEditId === task.id">
                                <el-button class="btn-main" @click="saveTask">Сохранить</el-button>
                                <el-button class="btn-main" @click="canselTask">Отмена</el-button>
                            </div>
                        </div>
                        <div class="profile__tasks-svg" v-if="taskEditId !== task.id">
                            <Edit
                                class="profile__tasks-edit"
                                @click="editTask(task.id)"
                                v-if="task.status === 'Создан' || task.status === 'Подтвержден' || task.status === 'В работе'"
                            />
                            <Trash
                                class="profile__tasks-trash"
                                @click="deleteTask(task.id)"
                                v-if="task.status === 'Создан' || task.status === 'Подтвержден' || task.status === 'В работе'"
                            />
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
        width: 100%;
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
