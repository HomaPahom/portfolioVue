<script setup>
import { RouterLink } from 'vue-router'
import ThreeJs from '../components/ThreeJS.vue'
</script>

<template>
  <section>
    <div class="inner-section">
      <ThreeJs />
      <div class="text-404">
        <h1 tabindex="-1" id="welcome">404 - Page not found :(</h1>
        <p>We couldn't find the page you were looking for...</p>
        <p><RouterLink tabindex="0" to="/">Go back to the start page</RouterLink></p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

  .text-404 {
    margin-top: 15rem;

    @media(min-width: 720px) {
      margin-top: 20rem;
    }

  }

</style>