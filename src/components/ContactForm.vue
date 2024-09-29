<script setup>
// Импорт компонента SuccessConfetti
import SuccessConfetti from './SuccessConfetti.vue';
// Импорт необходимых функций из Vue
import { computed, ref, onMounted } from 'vue'

// Реактивное свойство для отображения формы
let showForm = ref(true)

// Реактивные свойства для хранения данных формы
let email = ref("")
let name = ref("")
let message = ref("")

// Реактивные свойства для хранения ошибок валидации
let emailError = ref(false)
let nameError = ref(false)
let messageError = ref(false)

// Реактивные свойства для хранения состояния отправки email
let emailSent = ref(false)
let errorSending = ref(false)

// Реактивное свойство для отображения конфетти
let showConfetti = ref(false)

// Хук жизненного цикла, вызываемый при монтировании компонента
onMounted(() => {
    // Получение сохраненного состояния отправки email из sessionStorage
    emailSent.value = JSON.parse(sessionStorage.getItem("emailSent"));
})

// Функция для очистки ошибок валидации
function clearError(field) {
    // Сброс ошибок отправки
    errorSending.value = false

    // Сброс ошибок для конкретного поля
    if(field === 'email') {
        emailError.value = false
    }

    if(field === 'name') {
        nameError.value = false
    }

    if(field === 'message') {
        messageError.value = false
    }
}

// Реактивное свойство для хранения состояния отправки
let sending = ref(false)

// Асинхронная функция для отправки email
async function sendEmail(event) {
    // Предотвращение стандартного поведения формы
    event.preventDefault()

    // Флаг для отслеживания ошибок валидации
    let error = false

    // Валидация полей формы
    if(!email.value) {
        emailError.value = true
        error = true
    }

    if(!name.value) {
        nameError.value = true
        error = true
    }

    if(!message.value) {
        messageError.value = true
        error = true
    }

    // Если есть ошибки, прекратить выполнение функции
    if(error) {
        return
    }

    // Предотвращение повторной отправки формы
    if(sending.value) {
        return
    }

    // Установка состояния отправки
    sending.value = true

    // Данные для отправки
    const data = {
        email: email.value,
        name: name.value,
        message: message.value
    }

    // Отправка данных на сервер
    await fetch('https://jacobduvander.se/.netlify/functions/sendEmail', {
        method: "POST", // Метод запроса
        mode: "cors", // Режим CORS
        cache: "no-cache", // Кэширование
        credentials: "same-origin", // Политика отправки учетных данных
        headers: {
            "Content-Type": "application/json", // Тип содержимого
        },
        redirect: "follow", // Политика перенаправления
        referrerPolicy: "no-referrer", // Политика реферера
        body: JSON.stringify(data), // Тело запроса
    }).then((response)=>{
        // Успешная отправка email
        emailSent.value = true
        showConfetti.value = true
        sessionStorage.setItem("emailSent", true);
    }).catch((error)=>{
        // Обработка ошибки отправки
        if(window.location.hostname === 'localhost') {
            showConfetti.value = true
        }
        errorSending.value = true
    })

    // Сброс состояния отправки
    sending.value = false
}

// Функция для скрытия конфетти
function hideConfetti () {
    showConfetti.value = false
}
</script>

<template>
    <!-- Компонент для отображения конфетти -->
    <SuccessConfetti v-if="showConfetti" @confettiVisible="hideConfetti" />
    <!-- Пустой шаблон, если форма не отображается -->
    <template v-if="!showForm"></template>
    <!-- Основной раздел с формой -->
    <section v-else>
        <div class="inner-section">
            <!-- Заголовок раздела -->
            <h2>Send me a message ✉️</h2>
            <!-- Описание раздела -->
            <p>Feel free to send me a message, I'll reply as soon as possible.</p>
            <!-- Форма для отправки сообщения -->
            <form @submit.prevent="sendEmail" class="form" :class="{'sending': sending, 'emailSent': emailSent}">
                <!-- Поле ввода для имени -->
                <div class="input-field" :class="{'error': nameError}">
                    <label for="name">Name</label>
                    <input type="text" :disabled="emailSent" maxlength="40" id="name" name="name" placeholder="ex. Suleymanov Ilhoma" v-model="name" @input="clearError('name')"/>
                </div>
                <!-- Поле ввода для email -->
                <div class="input-field" :class="{'error': emailError}">
                    <label for="email">Your email</label>
                    <input type="email" :disabled="emailSent" maxlength="50" id="email" name="email" placeholder="ex. pahom6091@gmail.com" v-model="email" @input="clearError('email')"/>
                </div>
                <!-- Поле ввода для сообщения -->
                <div class="input-field" :class="{'error': messageError}">
                    <label for="message">Message</label>
                    <textarea :disabled="emailSent" type="text" maxlength="400" id="message" name="message" placeholder="ex. Hello!" v-model="message" @input="clearError('message')"/>
                </div>
                <!-- Контейнер для кнопки отправки и статуса сообщения -->
                <div class="button-container">
                    <!-- Кнопка отправки сообщения -->
                    <button type="submit" class="button button--ripple" :class="{'loading': sending}"  :disabled="sending || emailSent">
                        Send message
                        <span class="button--ripple__pulse"></span>
                    </button>
                    <!-- Сообщение о успешной отправке -->
                    <div v-if="emailSent" class="message-status success">
                        <span>Message sent!</span>
                    </div>
                    <!-- Сообщение об ошибке отправки -->
                    <div v-else-if="errorSending" class="message-status">
                        <span>Something went wrong :(</span>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped lang="scss">
section {
    margin-top: 8rem;

    h2, p {
        text-align: center;
        margin-bottom: 2rem;
    }
}

.form {
    display: flex;
    flex-direction: column;
    max-width: 380px;
    width: 100%;
    margin: auto;
    align-items: flex-start;
}

.button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;

    .message-status {
        span{
            display: flex;
            align-items: center;
            font-weight: 600;
            color: var(--text-color);
        }

        &.success {
            span {
                &::after {
                    content: "🎉";
                    font-size: 2rem;
                    margin-left: 1rem;
                }
            }
        }
    }

    @media(min-width: 500px) {
        flex-direction: row;
    }
}

input, textarea {
    padding: .5rem;
    border-radius: 10px;
    color: var(--input-text-color);
    background-color: var(--input-background);
    border: 3px solid var(--link-color);
    box-shadow: var(--box-shadow-dark-theme);
    font-family: 'Figtree', sans-serif;
    font-size: 1.2em;
    width: 100%;

    &::placeholder {
        color: var(--input-text-color);
        opacity: 0.6;
    }
}

textarea {
    min-width: 100%;
    min-height: 100px;
    max-width: 100%;
    max-height: 300px;
}

.input-field {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;

    label {
        display: inline-block;
        font-weight: 600;
        margin-bottom: .5rem;
        color: var(--input-label-color);
    }

    &.error {
        input, textarea {
            border-color: var(--input-error-color);
            animation: error .3s ease-in-out 1;
        }

        @keyframes error {
            0% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-20px);
            }
            25% {
                transform: translateX(20px);
            }
            75% {
                transform: translateX(-20px);
            }
            100% {
                transform: translateX(0);
            }
        }
    }

    input:focus, textarea:focus {
        border-color: var(--link-color);
        border-color: var(--input-focus-color);
        outline: 3px solid var(--input-focus-color-border);
    }

    input:focus + label, textarea:focus + label {
        transform: translate(0,-1.5rem) scale(0.9);
    }

    input:not(:placeholder-shown) + label, textarea:not(:placeholder-shown) + label {
        transform: translate(0,-1.5rem) scale(0.9);
    }
}

.form {
    &.sending, &.emailSent {
        textarea, input, .button {
            pointer-events: none;
            opacity: 0.5;
        }
    }
}
</style>
