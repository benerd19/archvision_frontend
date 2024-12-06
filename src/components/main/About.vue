<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const animatedElement = ref(null)

const isVisible = ref(false)

useIntersectionObserver(
    animatedElement,
    ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
            isVisible.value = true
            observerElement.unobserve(animatedElement.value)
        }
    },
    { threshold: 0.4 }
)
</script>
<template>
    <div class="about__wrapper">
        <div class="about" ref="animatedElement">
            <h2 class="about__title">ArchVision – там, где дизайн встречается с будущим.</h2>
            <div class="about__container">
                <p class="about__text about--left" :class="{ 'about--visible': isVisible }">
                    ArchVision – это архитектурное бюро, которое специализируется на создании уникальных проектов, объединяющих эстетику,
                    функциональность и современные технологии. Наша команда архитекторов и дизайнеров с многолетним опытом помогает воплощать самые
                    смелые идеи, будь то частные дома, коммерческие пространства или масштабные общественные проекты.
                </p>
                <img
                    src="../../assets/images/main-home-1.jpg"
                    alt="home"
                    class="about__picture about--right"
                    :class="{ 'about--visible': isVisible }"
                />
                <img
                    src="../../assets/images/main-home-2.jpg"
                    alt="home"
                    class="about__picture about--left"
                    :class="{ 'about--visible': isVisible }"
                />
                <p class="about__text about--right" :class="{ 'about--visible': isVisible }">
                    Мы верим, что архитектура – это искусство, которое отражает индивидуальность каждого клиента. Поэтому мы подходим к каждому
                    проекту с вниманием к деталям и стремлением превзойти ожидания.
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.about {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 60px;
    max-width: 1440px;
    width: 100%;
    margin-bottom: 60px;

    &__container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        row-gap: 48px;
        column-gap: 24px;
    }

    &__text {
        font-size: 20px;
        line-height: 32px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
        margin: 0;

        &::first-letter {
            font-weight: 600;
        }
    }

    &__picture {
        max-width: 1440px;
        width: 100%;
        border-radius: 20px;
    }

    &__title {
        font-size: 32px;
        line-height: 48px;
        color: var(--main-color);
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
        margin-bottom: 60px;
        text-align: center;
    }

    &__wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    &--right {
        transform: translateX(30px);
        opacity: 0;
        transition: all 1s ease-out;
    }

    &--left {
        transform: translateX(-30px);
        opacity: 0;
        transition: all 1s ease-out;
    }

    &--visible {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
