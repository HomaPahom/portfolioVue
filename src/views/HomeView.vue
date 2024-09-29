<script setup>
// Импорт необходимых компонентов для использования на странице
import ExternalLink from '../components/ExternalLink.vue'
import SlideShow from '../components/SlideShow.vue'
import TitleTag from '../components/TitleTag.vue'
import ContactForm from '../components/ContactForm.vue'
import { RouterLink } from 'vue-router'

// Функция для плавного прокручивания страницы вверх
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Указывает на плавное движение
  })
}
</script>

<template>
  <section class="main-section large-margin divider">
    <div class="inner-section">
      <h1 tabindex="-1" id="welcome">Hi, welcome to my&nbsp;site!</h1> <!-- Заголовок сайта -->
      <h2 class="h4">
        I'm a frontend developer currently living in Tashkent, Uzbekistan. This is just a site
        for&nbsp;fun.
      </h2>
      <p>
        The website is still a work in progress but I will use it for gathering links to hobby
        projects I've been working on.
      </p>
      <p>
        <RouterLink tabindex="0" to="/about">Read more about me</RouterLink> or scroll down to see
        my hobby projects. <!-- Ссылка на страницу "О себе" -->
      </p>
      <SlideShow v-if="false" /> <!-- Слайд-шоу (временно отключено) -->
    </div>
  </section>
  <section class="large-margin">
    <div class="inner-section">
      <h2 id="projects">Here are a few selected hobby&nbsp;projects.</h2> <!-- Заголовок секции проектов -->
      <p>
        Since I started working as a web developer, I haven't had much time for side projects.
        However, I am looking forward to diving back into my hobbies and bringing new ideas to life
        in the future. I hope to find a balance between my studies and hobbies soon!
      </p>
      <div class="link-container">
        <TitleTag text="2024" /> <!-- Компонент для отображения тега с годом -->
        <div class="link-group">
          <button class="link-button" tabindex="0" @click="scrollToTop()">This website</button> <!-- Кнопка для возврата к началу страницы -->
          <ExternalLink title="XX Company" link="https://homapahom.github.io/xx/" /> <!-- Внешняя ссылка на проект -->
          <ExternalLink title="Sark" link="https://homapahom.github.io/sark/" /> <!-- Внешняя ссылка на проект -->
        </div>
      </div>
    </div>
  </section>
  <ContactForm /> <!-- Компонент формы для связи -->
</template>

<style lang="scss" scoped>
.link-container {
  display: flex; /* Используется для выстраивания ссылок в колонку */
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 2rem; /* Отступ сверху */
}

.link-group {
  display: flex; /* Используется для выстраивания элементов в ряд */
  flex-wrap: wrap; /* Элементы могут переноситься на новую строку */
  justify-content: flex-start;
  gap: 1rem; /* Пробел между элементами */
  margin-bottom: 2rem; /* Отступ снизу */

  &:last-child {
    margin-bottom: 0; /* Убираем отступ для последнего элемента */
  }

  @media (min-width: 720px) {
    gap: 2rem; /* Увеличиваем пробел для больших экранов */
    margin-bottom: 1rem; /* Уменьшаем отступ снизу для больших экранов */
  }
}

.large-margin {
  margin-top: 4rem; /* Отступ сверху */
  margin-bottom: 4rem; /* Отступ снизу */

  &:last-child {
    margin-bottom: 0; /* Убираем отступ для последнего элемента */
  }
}

.main-section {
  display: flex; /* Используется для вертикального выравнивания контента */
  flex-direction: column;
  justify-content: center;
  padding-top: 6rem; /* Отступ сверху */

  @media (min-width: 720px) {
    margin-top: 8rem; /* Увеличиваем отступ для больших экранов */
    margin-bottom: 8rem; /* Увеличиваем отступ для больших экранов */
  }
}

.divider {
  position: relative; /* Позиционирование для псевдоэлементов */
  padding-bottom: 8rem; /* Отступ снизу */
  margin-bottom: 8rem; /* Отступ снизу */

  &::before,
  &::after {
    content: ''; /* Создание псевдоэлементов */
    position: absolute;
    display: block;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
  }

  &::before {
    border: 2px solid var(--link-color); /* Рамка для верхнего псевдоэлемента */
    height: 2.3rem;
    width: 1.5rem;
    border-radius: 2rem; /* Закругление углов */
  }

  &::after {
    height: 0.7rem; /* Высота нижнего псевдоэлемента */
    width: 0.4rem; /* Ширина нижнего псевдоэлемента */
    border-radius: 1rem; /* Закругление углов */
    background-color: var(--link-color); /* Цвет фона */
    animation: scroll infinite 1s ease-in alternate; /* Анимация для эффекта прокрутки */

    @keyframes scroll {
      from {
        transform: translate(-50%, 20%); /* Начальная позиция */
      }

      to {
        transform: translate(-50%, 80%); /* Конечная позиция */
      }
    }
  }
}
</style>
