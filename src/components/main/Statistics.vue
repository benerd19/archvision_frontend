<script setup>
import { ref, computed, reactive } from 'vue'
import { useTransition, useIntersectionObserver } from '@vueuse/core'

const animatedElement = ref(null)

const isVisible = ref(false)

const statisticsInfo = [
    {
        title: 'Клиентов рекомендуют нас своим знакомым',
        value: 95,
        adding: '%',
        animatedValue: ref(0),
        finishedValue: null,
    },
    {
        title: 'Уникальных проектов, воплощенных в жизнь',
        value: 200,
        adding: '+',
        animatedValue: ref(0),
        finishedValue: null,
    },
    {
        title: 'Опыт работы в архитектуре и дизайне',
        value: 10,
        adding: 'лет',
        animatedValue: ref(0),
        finishedValue: null,
    },
]

useIntersectionObserver(
    animatedElement,
    ([entry]) => {
        if (entry.isIntersecting) {
            isVisible.value = true
            statisticsInfo.forEach((statistic) => {
                statistic.animatedValue.value = statistic.value
            })
        }
    },
    {
        threshold: 0.5,
    }
)

statisticsInfo.forEach((statistic) => {
    statistic.finishedValue = useTransition(statistic.animatedValue, {
        duration: 1500,
    })
})
</script>
<template>
    <div :class="['statistics', { 'statistics--visible': isVisible }]" ref="animatedElement">
        <h2 class="statistics__title">Наши достижения в цифрах</h2>
        <div class="statistics__container">
            <div class="statistics__card" v-for="(item, index) in statisticsInfo" :key="index">
                <span class="statistics__title">{{ Math.round(item.finishedValue.value) }} {{ item.adding }}</span>
                <h3 class="statistics__value">{{ item.title }}</h3>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.statistics {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1440px;
    width: 100%;
    opacity: 0;
    transition: all 1s ease-out;
    transform: translatey(-50px);

    &--visible {
        opacity: 1;
        transform: translatey(0);
    }

    &__title {
        max-width: 480px;
        text-align: center;
        font-size: 32px;
        line-height: 48px;
        color: var(--main-color);
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
    }

    &__container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }

    &__card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title {
        font-size: 32px;
        line-height: 48px;
        color: var(--main-color);
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
    }

    &__value {
        font-size: 24px;
        line-height: 32px;
        color: var(--main-color);
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
        text-align: center;
    }
}
</style>
