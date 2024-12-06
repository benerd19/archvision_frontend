<script setup>
import { ref, reactive } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import About from '@/components/main/About.vue'
import Statistics from '@/components/main/Statistics.vue'
import Team from '@/components/main/Team.vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ElNotification } from 'element-plus'

const projectsBlock = ref()
const commentsBlock = ref()

const isCommentsVisible = ref(false)

const dialogVisible = ref(false)

const isProjectsVisible = ref(false)

useIntersectionObserver(commentsBlock, ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
        isCommentsVisible.value = true
        observerElement.unobserve(commentsBlock.value)
    }
})

useIntersectionObserver(
    projectsBlock,
    ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
            isProjectsVisible.value = true
            observerElement.unobserve(projectsBlock.value)
        }
    },
    { threshold: 0.4 }
)

const form = reactive({
    email: '',
    textarea: '',
})

const linkCarouselToProjects =
    'https://img.freepik.com/free-photo/beautiful-shot-golcuk-puddles-karacasu-turkey_181624-45544.jpg?t=st=1733055141~exp=1733058741~hmac=7de07e69168243e3f93168dabfab49af90ce6f5d4805476ec683ffa53f91ecbc&w=1920'

const carouselProjects = ref([
    {
        id: 1,
        title: 'Project 1',
        image: linkCarouselToProjects,
    },
    {
        id: 2,
        title: 'Project 2',
        image: linkCarouselToProjects,
    },
    {
        id: 3,
        title: 'Project 3',
        image: linkCarouselToProjects,
    },
    {
        id: 4,
        title: 'Project 4',
        image: linkCarouselToProjects,
    },
])

const comments = [
    {
        id: 1,
        text: 'Я искал архитектурное бюро, которое могло бы воплотить мою идею современного дома, и ArchVision превзошли все ожидания. Работать с их командой было легко и приятно. Результат – дом моей мечты!',
        author: 'Алексей Иванов',
    },
    {
        id: 2,
        text: 'ArchVision помогли мне с проектированием офиса. Эстетика, комфорт и эргономика – все на высшем уровне. Спасибо за профессионализм и внимание к деталям!',
        author: 'Марина Кузнецова',
    },
    {
        id: 3,
        text: 'Когда мы задумали строительство загородного дома, мы обратились в ArchVision по рекомендации. Это было лучшее решение! Мы не только получили потрясающий проект, но и полностью реализовали его без изменений.',
        author: 'Сергей Петров',
    },
]

const questions = [
    {
        title: 'С чего начать разработку проекта?',
        text: 'Мы рекомендуем записаться на консультацию с нашим архитектором. На встрече мы обсудим ваши идеи, пожелания и требования, чтобы создать уникальный проект.',
    },
    {
        title: 'Сколько времени занимает разработка проекта?',
        text: 'В среднем разработка архитектурного проекта занимает от 4 до 8 недель, в зависимости от его сложности и масштаба.',
    },
    {
        title: 'Вы помогаете с согласованием проекта?',
        text: 'Да, мы предоставляем полный пакет услуг, включая помощь в согласовании проекта с соответствующими инстанциями.',
    },
    {
        title: 'Могу ли я внести изменения в проект на этапе разработки?',
        text: 'Конечно! Мы всегда открыты для корректировок на этапе проектирования, чтобы результат соответствовал вашим ожиданиям.',
    },
    {
        title: 'Вы занимаетесь только проектированием или реализуете проекты под ключ?',
        text: 'Мы предоставляем как услуги проектирования, так и реализацию проекта под ключ, включая строительство и отделочные работы.',
    },
    {
        title: 'Как рассчитывается стоимость проекта?',
        text: 'Стоимость проекта зависит от его типа, площади и сложности. На консультации мы подробно обсудим все нюансы и предложим оптимальный вариант.',
    },
    {
        title: 'Можете ли вы создать проект в определенном стиле?',
        text: 'Да, наша команда работает с различными архитектурными стилями – от классики до современных минималистичных решений.',
    },
    {
        title: 'Вы работаете только в своем городе или по всей стране?',
        text: 'Мы готовы сотрудничать с клиентами из разных регионов, предлагая как очные, так и дистанционные услуги.',
    },
    {
        title: 'Какой стиль архитектуры вы рекомендуете для загородного дома?',
        text: 'Все зависит от ваших предпочтений и особенностей участка. На консультации мы подберем стиль, который максимально подойдет для вас.',
    },
    {
        title: 'Что входит в комплект проектной документации?',
        text: 'Полный комплект включает архитектурный проект, планировку, чертежи фасадов, спецификации материалов и многое другое.',
    },
]

const accordion = ref([])

const projectsOption = ref([
    {
        label: 'Project 1',
        value: 'Project 1',
    },
    {
        label: 'Project 2',
        value: 'Project 2',
    },
])

const formError = ref('')

const applicationForm = reactive({
    project: '',
    description: '',
})

function submitForm() {
    try {
        formError.value = ''
        if (applicationForm.project === '') throw new Error('Выберите проект')
        dialogVisible.value = false
        console.log('submitForm')
        ElNotification({
            title: 'Успешно',
            message: 'Заявка принята',
            type: 'success',
        })
        applicationForm.project = ''
        applicationForm.description = ''
    } catch (e) {
        formError.value = e.message
    }
}

function handleClose(done) {
    applicationForm.project = ''
    applicationForm.description = ''
    formError.value = ''
    done()
}
</script>
<template>
    <Header />
    <main class="main">
        <el-dialog
            v-model="dialogVisible"
            title="Заполните заявку"
            width="500"
            align-center
            center
            modal-class="modal__title"
            :before-close="handleClose"
            class="modal"
        >
            <form action="submit" @submit.prevent="submitForm" class="modal__form">
                <span class="modal__form-label">Выберите проект</span>
                <el-select v-model="applicationForm.project" placeholder="Выберите проект" size="large">
                    <el-option v-for="item in projectsOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span class="modal__form-label">Оставьте краткое описание</span>
                <el-input
                    v-model="applicationForm.description"
                    class="main__questions-textarea"
                    :rows="6"
                    type="textarea"
                    placeholder="Описание..."
                />
                <span v-if="formError" class="modal__form-error">{{ formError }}</span>
                <el-button native-type="submit" class="modal__form-btn">Отправить</el-button>
            </form>
        </el-dialog>
        <el-backtop :bottom="60" class="main__backtop" />
        <h1 class="main__title">ArchVision – создаем пространство, вдохновленное вашими идеями.</h1>
        <el-button class="main__button" @click="dialogVisible = true">Оставить заявку</el-button>
        <img src="../assets/images/main-picture.jpg" alt="main-picture" class="main__picture" />
        <About />
        <div class="main__projects" ref="projectsBlock" :class="{ 'main__projects--visible': isProjectsVisible }">
            <h2 class="main__title">Наши проекты</h2>
            <p class="main__description">
                Каждый проект ArchVision – это уникальная история, где дизайн и функциональность соединяются в гармоничное целое. Мы работаем над
                созданием пространств, которые вдохновляют и меняют жизнь к лучшему. Ознакомьтесь с нашими работами и найдите проект, который станет
                началом вашей собственной архитектурной истории.
            </p>
            <el-carousel
                height="640px"
                :interval="3000"
                arrow="hover"
                class="main__carousel"
                indicator-position="none"
                :autoplay="isProjectsVisible ? true : false"
            >
                <el-carousel-item v-for="item in carouselProjects" :key="item.id">
                    <div class="main__carousel-item">
                        <img :src="item.image" alt="carousel-item" class="main__carousel-picture" />
                        <span class="main__carousel-text">{{ item.title }}</span>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <Statistics />
        <Team />
        <div class="main__comments">
            <h2 class="main__title">Мнение наших клиентов – лучшая рекомендация</h2>
            <div class="main__comments-wrapper" ref="commentsBlock">
                <div class="main__comments-container">
                    <div
                        class="main__comments-card"
                        v-for="item in comments"
                        :key="item.id"
                        :class="{
                            'main__comments-card--up': item.id % 2 === 0,
                            'main__comments-card--down': item.id % 2 === 1,
                            'main__comments-card--visible': isCommentsVisible,
                        }"
                    >
                        <p class="main__comments-description">
                            {{ item.text }}
                        </p>
                        <span class="main__comments-author"> - {{ item.author }}</span>
                    </div>
                </div>
                <p class="main__comments-text" :class="{ 'main__comments-text--visible': isCommentsVisible }">
                    Мы гордимся доверием, которое оказывают нам наши клиенты. Каждый проект для нас – это история, которую мы создаем вместе. Прочтите
                    отзывы тех, кто уже воплотил свои мечты в реальность с помощью ArchVision.
                </p>
            </div>
        </div>

        <h2 class="main__title">Часто задаваемые вопросы</h2>

        <div class="main__accordion">
            <el-collapse v-model="accordion" accordion>
                <el-collapse-item v-for="(item, index) in questions" :key="index" :title="item.title" :name="index" class="main__accordion-header">
                    <p class="main__accordion-text">{{ item.text }}</p>
                </el-collapse-item>
            </el-collapse>
        </div>

        <div class="main__questions">
            <h2 class="main__title main__questions-title">Остались вопросы?</h2>
            <p class="main__questions-text">Оставьте заявку и наш менеджер свяжется с вами</p>
            <el-form :model="form" label-width="auto" class="main__questions-form">
                <el-input v-model="form.email" placeholder="Ваш e-mail" />
                <el-input v-model="form.textarea" class="main__questions-textarea" :rows="2" type="textarea" placeholder="Ваш вопрос..." />
                <el-button class="main__questions-button" round>Отправить</el-button>
            </el-form>
        </div>
        <Footer class="main__footer" />
    </main>
</template>
<style scoped lang="scss">
.main {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    &__picture {
        max-width: 1660px;
        width: 100%;
        border-radius: 24px;
    }

    &__content {
        max-width: 1440px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__title {
        margin-top: 100px;
        max-width: 480px;
        text-align: center;
        font-size: 32px;
        line-height: 48px;
        color: var(--main-color);
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
        margin-bottom: 60px;
    }

    &__carousel-picture {
        top: 0;
        position: absolute;
        width: 100%;
    }

    &__carousel-item {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
    }

    &__carousel-text {
        position: absolute;
        bottom: 44px;
        font-size: 32px;
        line-height: 48px;
        color: var(--white);
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
    }

    &__carousel {
        max-width: 960px;
        width: 100%;
        margin-bottom: 100px;
    }

    &__button {
        background-color: transparent;
        font-size: 16px;
        padding: 16px 48px;
        cursor: pointer;
        border: 1px solid var(--main-color);
        border-radius: 48px;
        transition: all 0.2s ease-in-out;
        font-weight: 400;
        margin-bottom: 100px;

        &:hover {
            background-color: var(--main-color);
            color: var(--white);
        }
    }

    &__backtop {
        color: var(--main-color);
        width: 48px;
        height: 48px;
        border: 1px solid var(--main-color);
        background-color: transparent;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &__comments {
        max-width: 1440px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__comments-text {
        max-width: 1440px;
        text-align: center;
        font-size: 20px;
        line-height: 32px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
        opacity: 0;
        transform: translateX(-50px);

        &::first-letter {
            font-weight: 600;
        }
    }

    &__comments-text--visible {
        opacity: 1;
        transition: all 1s ease-in-out;
        transform: translateX(0);
    }

    &__comments-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 24px;
    }

    &__comments-card {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 30px;
        margin: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
        background-color: white;
        max-width: 360px;
        width: 100%;
        opacity: 0;
    }

    &__comments-card--up {
        transform: translateY(-50px);
    }

    &__comments-card--down {
        transform: translateY(50px);
    }

    &__comments-card--visible {
        opacity: 1;
        transition: all 1s ease-in-out;
        transform: translateY(0);
    }

    &__comments-description {
        text-align: center;
        word-wrap: break-word;
        font-size: 16px;
        line-height: 20px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
    }

    &__comments-author {
        align-self: end;
        font-size: 16px;
        line-height: 20px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
    }

    &__comments-carousel {
        max-width: 960px;
        width: 100%;
    }

    &__comments-item {
        height: auto;
    }

    &__description {
        font-size: 20px;
        line-height: 32px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
        margin-bottom: 40px;

        &::first-letter {
            font-weight: 600;
        }
    }

    &__projects {
        max-width: 1440px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        transform: translateX(-50px);
    }

    &__projects--visible {
        opacity: 1;
        transition: all 1s ease-in-out;
        transform: translateX(0);
    }

    &__accordion {
        max-width: 1200px;
        width: 100%;
    }

    &__accordion-header {
        font-size: 32px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
    }

    &__accordion-text {
        word-wrap: break-word;
        font-size: 16px;
        line-height: 20px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
    }

    &__questions {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
        margin-top: 100px;
    }

    &__questions-text {
        font-size: 20px;
        line-height: 32px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
    }

    &__questions-form {
        max-width: 480px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        font-family: 'Work Sans', sans-serif;
    }

    &__questions-textarea {
        max-width: 480px;
        width: 100%;
    }

    &__questions-button {
        align-self: center;
        padding: 12px 32px;
    }

    &__questions-title {
        margin: 0;
    }

    &__footer {
        margin-top: 100px;
    }
}

.modal {
    padding: 100px;

    &__form {
        margin-top: 28px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        font-family: 'Work Sans', sans-serif;
    }

    &__form-label {
        font-size: 16px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
    }

    &__form-btn {
        align-self: center;
    }

    &__form-error {
        color: red;
        align-self: center;
        margin: 0;
        font-size: 12px;
        font-family: 'Work Sans', sans-serif;
    }
}
</style>
