<template>
  <!-- Компонент для прокрутки к содержимому -->
  <ScrollToContent />
  <!-- Основной заголовок страницы -->
  <MainHeader />
  <main>
    <!-- Основное содержимое страницы, рендерится с помощью RouterView -->
    <RouterView />
  </main>
  <footer>
    <!-- Кнопка для переключения темы (светлая/темная) -->
    <ToggleButton @toggle="changeTheme()" :toggled="darkTheme" title="Dark mode" toggleOn="On" toggleOff="Off"/>
    <!-- Текст с информацией о копирайте и случайным эмодзи -->
    Copyright © {{ new Date().getFullYear()}} Homa {{ emoji }}
  </footer>
</template>

<style scoped lang="scss">
  main {
    /* Минимальная высота основного контента */
    min-height: calc(100vh - 157px);
    width: 100%;
  }

  footer {
    /* Стили для футера */
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    padding-top: 8rem;
    text-align: center;
    color: var(--text-color);
  }
</style>

<script setup>
import { computed, ref, onMounted } from 'vue' // Импорт необходимых функций из Vue
import { RouterView } from 'vue-router' // Импорт RouterView для рендеринга маршрутов
import MainHeader from './components/MainHeader.vue' // Импорт компонента MainHeader
import ScrollToContent from './components/ScrollToContent.vue' // Импорт компонента ScrollToContent
import ToggleButton from './components/ToggleButton.vue' // Импорт компонента ToggleButton

// Вычисляемое свойство для генерации случайного эмодзи
const emoji = computed(() => {
  const emojis = ['🔐', '💻', '🎮'] // Массив эмодзи
  return emojis[Math.floor(Math.random()*emojis.length)] // Возвращает случайный эмодзи из массива
})

// Реактивное свойство для хранения состояния темной темы
let darkTheme = ref(false)

// Хук жизненного цикла, вызываемый при монтировании компонента
onMounted(() => {
  // Получение сохраненной темы из localStorage
  const savedTheme = JSON.parse(localStorage.getItem("dark-theme"));

  // Установка темы при монтировании
  changeTheme(savedTheme, true)
})

// Функция для изменения темы
function changeTheme(savedTheme = null, initial = false) {
  /* Установка темной темы в зависимости от настроек устройства */
  if(initial && typeof savedTheme !== 'boolean' && !!window?.matchMedia) {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    darkTheme.value = isDarkMode
  } else {
    if(typeof savedTheme === 'boolean') {
      darkTheme.value = savedTheme
    } else {
      darkTheme.value = !darkTheme.value
    }
  }

  // Добавление или удаление класса темной темы на body
  if(darkTheme.value) {
    document.querySelector('body').classList.add('dark-theme')
    localStorage.setItem("dark-theme", true)
  } else {
    document.querySelector('body').classList.remove('dark-theme')
    localStorage.setItem("dark-theme", false)
  }
}
</script>
