<script setup>
defineProps({
  title: String,
  toggled: Boolean,
  toggleOn: String,
  toggleOff: String,
})

defineEmits(['toggle'])


</script>

<template>
    <button @click="$emit('toggle', !toggled)" class="toggle-button" :class="{ 'toggled': toggled }">
        {{ title }}
        <div class="toggle">
            <span v-if="toggleOn" class="toggle-text toggleOn">{{ toggleOn }}</span>
            <span v-if="toggleOff" class="toggle-text toggleOff">{{ toggleOff }}</span>
        </div>
    </button>
</template>

<style scoped lang="scss">

.toggle-button{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    position: relative;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.2em;
    color: var(--link-color);
    fill: var(--link-color);
    outline: none;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;

    .toggle {
        position: relative;
        background: var(--exandable-section-bg);
        outline: none;
        cursor: pointer;
        border: none;
        border-radius: 2rem;
        width: 5rem;
        height: 2.5rem;
        border: 2px solid  var(--link-color);
        box-shadow: var(--box-shadow-dark-theme);

        .toggle-text {
            position: absolute;
            z-index: 1;
            right: .7rem;
            font-size: 1em;
            top: 50%;
            color: var(--link-color);
            transform: translate(0, -50%);
            transition: .2s ease-out opacity;

            &.toggleOn {
                opacity: 0;
                right: initial;
                left: .7rem;
            }
        }

        &::before {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            left: 0;
            height: 1.8rem;
            width: 1.8rem;
            border-radius: 50%;
            background-color: var(--link-color);
            transform: translate(.3rem,-50%);
            transition: .2s ease-out transform;
        }
    }

    @media(min-width: 720px) {
        &:hover {
            color: var(--link-color-hover);

            .toggle {
                border-color: var(--link-color-hover);
                span {
                    color: var(--link-color-hover);
                }
                &::before {
                    background-color: var(--link-color-hover);
                }
            }
        }
    }


    &.toggled {
        .toggle {
            &::before {
                transform: translate(2.6rem,-50%);
            }
        }

        .toggle-text {
            &.toggleOn {
                opacity: 1;
            }

            &.toggleOff {
                opacity: 0;
            }
        }
    }
}

</style>