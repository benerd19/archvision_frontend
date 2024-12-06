<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const team = ref()
const isVisible = ref(false)

useIntersectionObserver(
    team,
    ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
            isVisible.value = true
            observerElement.unobserve(team.value)
        }
    },
    {
        threshold: 0.6,
    }
)

const teamMembers = [
    {
        id: 1,
        name: 'Иван Петров',
        photo: '../../assets/images/architector-man-croped.jpg',
        text: 'Эксперт по проектированию общественных пространств. Обладатель нескольких международных наград за инновационные решения.',
    },
    {
        id: 2,
        name: 'Иван Петров',
        photo: '../../assets/images/architector-man-croped.jpg',
        text: 'Эксперт по проектированию общественных пространств. Обладатель нескольких международных наград за инновационные решения.',
    },
    {
        id: 3,
        name: 'Иван Петров',
        photo: '../../assets/images/architector-man-croped.jpg',
        text: 'Эксперт по проектированию общественных пространств. Обладатель нескольких международных наград за инновационные решения.',
    },
]
</script>
<template>
    <div class="team__wrapper" ref="team">
        <h2 class="team__title">Наша команда – ваша уверенность в результате</h2>
        <el-carousel
            height="480px"
            :interval="3000"
            arrow="never"
            class="team__carousel"
            :class="{ 'team__carousel--visible': isVisible }"
            indicator-position="none"
            type="card"
        >
            <el-carousel-item v-for="item in teamMembers" :key="item.id" style="height: auto">
                <div class="team__card">
                    <img src="../../assets/images/architector-man-croped.jpg" alt="architector-photo" class="team__card-photo" />
                    <div class="team__card-info">
                        <h3 class="team__card-name">Иван Петров</h3>
                        <p class="team__card-text">
                            Эксперт по проектированию общественных пространств. Обладатель нескольких международных наград за инновационные решения.
                        </p>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>

        <p class="team__description" :class="{ 'team__description--visible': isVisible }">
            Мы гордимся нашими архитекторами – это специалисты с богатым опытом, тонким чувством стиля и страстью к созданию уникальных проектов.
            Каждый из них привносит в наши работы свои идеи, превращая ваши мечты в реальность. Познакомьтесь с профессионалами, которые сделают ваш
            проект исключительным.
        </p>
    </div>
</template>
<style scoped lang="scss">
.team {
    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &__photo-wrapper {
        display: flex;
        justify-content: center;
    }
    &__photo {
        max-width: 120px;
        width: 100%;
        border-radius: 24px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    &__card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        gap: 24px;
        padding: 48px 0;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        background-color: white;
        margin: 24px 0;
    }

    &__card-photo {
        max-width: 120px;
        width: 100%;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    &__card-info {
        display: flex;
        flex-direction: column;
        gap: 24px;
        max-width: 280px;
        width: 100%;
    }

    &__card-name {
        text-align: center;
        font-size: 20px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
    }

    &__card-text {
        text-align: center;
        word-wrap: break-word;
        font-size: 16px;
        line-height: 20px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
    }

    &__name {
        text-align: center;
        font-size: 20px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
    }

    &__text {
        text-align: center;
        word-wrap: break-word;
        font-size: 16px;
        line-height: 20px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
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

    &__description {
        max-width: 1440px;
        text-align: center;
        font-size: 20px;
        line-height: 32px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;
        opacity: 0;
        transform: translateY(-50px);

        &::first-letter {
            font-weight: 600;
        }
    }

    &__description--visible {
        opacity: 1;
        transform: translateY(0);
        transition: all 1s ease-in-out;
    }
    &__carousel {
        max-width: 480px;
        width: 100%;
        opacity: 0;
        transform: translateY(-50px);
    }

    &__carousel--visible {
        opacity: 1;
        transition: all 1s ease-in-out;
        transform: translateY(0);
    }
}

.main__carousel {
}
</style>
