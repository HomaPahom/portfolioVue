<template>
    <!-- Ссылка с динамическими атрибутами -->
    <a :href="link" :target="target" class="external-link" :rel="rel">
        <!-- Отображение иконки электронной почты, если email равно true -->
        <EmailIcon v-if="email"/>
        <!-- Отображение иконки гиперссылки, если email равно false -->
        <HyperLinkIcon v-else/>
        <!-- Отображение заголовка ссылки -->
        {{ title }}
    </a>
</template>

<script>
// Импорт компонента иконки гиперссылки
import HyperLinkIcon from './icons/HyperLinkIcon.vue';
// Импорт компонента иконки электронной почты
import EmailIcon from './icons/EmailIcon.vue';

export default {
    name: 'ExternalLink', // Имя компонента
    components: {
        HyperLinkIcon, // Регистрация компонента иконки гиперссылки
        EmailIcon // Регистрация компонента иконки электронной почты
    },
    props: {
        link: {
            type: String, // Тип пропса
            // required: true // Если пропс обязателен, раскомментируйте эту строку
        },
        title: {
            type: String // Тип пропса
        },
        email: {
            type: Boolean, // Тип пропса
            default: false // Значение по умолчанию
        },
        rel: {
            type: String, // Тип пропса
            default: null // Значение по умолчанию
        },
        target: {
            type: String, // Тип пропса
            default: '_blank' // Значение по умолчанию
        }
    }
}
</script>
  
  <style lang="scss" scoped>

    .external-link {
        margin-left: 25px;
        svg {
            position: absolute;
            left: -25px;
            width: 20px;
            fill: inherit;
        }
    }  

  </style>
  