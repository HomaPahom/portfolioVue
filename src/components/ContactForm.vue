<script setup>

    import SuccessConfetti from './SuccessConfetti.vue';
    import { computed, ref, onMounted } from 'vue'

    let showForm = ref(true)

    let email = ref("")
    let name = ref("")
    let message = ref("")

    let emailError = ref(false)
    let nameError = ref(false)
    let messageError = ref(false)

    let emailSent = ref(false)
    let errorSending = ref(false)

    let showConfetti = ref(false)

    onMounted(() => {
        emailSent.value = JSON.parse(sessionStorage.getItem("emailSent"));
    })

    function clearError(field) {
        // emailSent.value = false
        errorSending.value = false

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

    let sending = ref(false)

    async function sendEmail(event) {
        event.preventDefault()


        let error = false

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

        if(error) {
            return
        }

        if(sending.value) { // prevent spamming send button
            return
        }
        
        sending.value = true

        const data = {
            email: email.value,
            name: name.value,
            message: message.value
        }

        await fetch('https://jacobduvander.se/.netlify/functions/sendEmail', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then((response)=>{
            // console.log(response)
            emailSent.value = true
            showConfetti.value = true
            sessionStorage.setItem("emailSent", true);
        }).catch((error)=>{
            if(window.location.hostname === 'localhost') {
                showConfetti.value = true
            }
            errorSending.value = true
        })


        sending.value = false

    }


    function hideConfetti () {
        showConfetti.value = false
    }

</script>

<template>
    <SuccessConfetti v-if="showConfetti" @confettiVisible="hideConfetti" />
    <template v-if="!showForm"></template>
    <section v-else>
        <div class="inner-section">
            <h2>Send me a message ✉️</h2>
            <p>Feel free to send me a message, I'll reply as soon as possible.</p>
            <form @submit.prevent="sendEmail" class="form" :class="{'sending': sending, 'emailSent': emailSent}">
                <div class="input-field" :class="{'error': nameError}">
                    <label for="name">Name</label>
                    <input type="text" :disabled="emailSent" maxlength="40" id="name" name="name" placeholder="ex. Suleymanov Ilhoma" v-model="name" @input="clearError('name')"/>
                </div>
                <div class="input-field" :class="{'error': emailError}">
                    <label for="email">Your email</label>
                    <input type="email" :disabled="emailSent" maxlength="50" id="email" name="email" placeholder="ex. pahom6091@gmail.com" v-model="email" @input="clearError('email')"/>
                </div>
                <div class="input-field" :class="{'error': messageError}">
                    <label for="message">Message</label>
                    <textarea :disabled="emailSent" type="text" maxlength="400" id="message" name="message" placeholder="ex. Hello!" v-model="message" @input="clearError('message')"/>
                </div>
                <div class="button-container">
                    <button type="submit" class="button button--ripple" :class="{'loading': sending}"  :disabled="sending || emailSent">
                        Send message
                        <span class="button--ripple__pulse"></span>
                    </button>
                    <div v-if="emailSent" class="message-status success">
                        <span>Message sent!</span>
                    </div>
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
        // transition: .2s ease-out border-color;
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