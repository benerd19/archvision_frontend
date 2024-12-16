<script setup lang="ts">
import logosvg from '@/icons/Logo.vue'
</script>
<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__list-contacts">
                <h2 class="footer__list-title">Контактная информация:</h2>
                <p class="footer__list-item">Телефон: +7 (123) 456-78-90</p>
                <p class="footer__list-item">Email: info@archvision.com</p>
                <p class="footer__list-item">Адрес: г. Волгоград, ул. Архитекторов, д. 10</p>
            </div>
            <div class="footer__list-additional">
                <h2 class="footer__list-title">Дополнительная информация:</h2>
                <p class="footer__list-item">Политика конфиденциальности</p>
                <p class="footer__list-item">Условия использования</p>
            </div>
            <div class="footer__logo-container">
                <logosvg class="footer__logo" />
                <h2 class="footer__logo-title">ArchVision – архитектура вашего будущего.</h2>
                <h3 class="footer__logo-copyright">ArchVision © 2024</h3>
            </div>
        </div>
    </footer>
</template>
<style scoped lang="scss">
.footer {
    padding: 36px 0;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    gap: 8px;
    display: flex;
    justify-content: center;

    &__logo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 240px;
    }

    &__logo {
        max-width: 96px;
        width: 100%;
        height: 96px;
    }

    &__logo-title {
        text-align: center;
        font-size: 20px;
        color: var(--main-color);
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
        margin: 0;
        margin-top: 12px;
    }

    &__container {
        max-width: 1440px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    &__list-title {
        margin: 0;
        font-size: 24px;
        line-height: 36px;
        color: var(--main-color);
        font-weight: 600;
        font-family: 'Raleway', sans-serif;
    }

    &__list-item {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
    }

    &__list-contacts,
    &__list-additional {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__logo-copyright {
        margin: 0;
        margin-top: 12px;
        font-size: 16px;
        line-height: 24px;
        color: var(--main-color);
        font-weight: 400;
        font-family: 'Work Sans', sans-serif;
    }
}
</style>
