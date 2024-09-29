<template>
  <header>
    <div class="wrapper">
      <SmoothHamburger :toggled="menuToggled" @toggle="toggleMenu()"/>
    </div>
    <div class="menu" :class="{'visible': menuToggled}">
      <nav>
        <RouterLink tabindex="0" @click="this.menuToggled = false" to="/">Home / Projects</RouterLink>
        <RouterLink tabindex="0" @click="this.menuToggled = false" to="/about">About me</RouterLink>
      </nav>
      <div class="background"></div>
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import SmoothHamburger from './SmoothHamburger.vue'

export default {
  name: 'MainHeader',
  components: {
    RouterLink,
    SmoothHamburger
  },
  data(){
    return {
      menuToggled: false
    }
 },
 methods: {
  toggleMenu() {
    this.menuToggled = !this.menuToggled
  }
 }

}
</script>

<style lang="scss" scoped>
    header {
      position: fixed;
      pointer-events: none;
      z-index: 1000;
      top: 0;
      left: 0;
      width: 100%;

      .wrapper {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        max-width: 1080px;
        margin: auto;
        padding: 1rem;
        z-index: 1000;
        pointer-events: none;
      
        @media(min-width: 720px) {
          padding: 1rem 2rem;
        }
      }
    }

    .menu {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      height: 100vh;
      width: 100%;
      top:0;
      left:0;
      z-index: 100;
      padding: 2rem;
      pointer-events: none;

      .background {
        position: fixed;
        background: var(--header-bg-color);
        border-radius: 50%;
        width: 200vh;
        height: 200vh;
        overflow: hidden;

        @media(min-width: 100vh) {
          width: 150vw;
          height: 150vw;
        }

        transform: scale(0);
        will-change: transform;
        transition: .4s ease-out transform;
        transform-origin: top right;
      }

      nav {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        max-width: 720px;
        width: 100%;
        z-index: 1;
        opacity: 0;
        visibility: hidden;
        transition: .2s ease-out all;
        transition-delay: 0s;

        a {
          color: var(--header-link-color);
          font-size: 2em;

          &:before {
            background-color: var(--header-link-color);
          }

          &:after {
            border: 3px solid var(--header-link-color);
          }

          @media (min-width: 720px) {
            font-size: 4em;
          }
          
        }
      }
      &.visible {
        opacity: 1;
        pointer-events: all;
        nav {
          visibility: visible;
          opacity: 1;
          transition-delay: .2s;
        }
        .background {
          transform: scale(1);
        }
      }
    }


</style>
