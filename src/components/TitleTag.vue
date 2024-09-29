<script setup>
defineProps({
  text: String,
})
</script>

<template>
    <span class="tag">
      <span class="tag-label">{{text}}</span>
      <span class="tag-shadow"></span>
    </span>
</template>

<style scoped lang="scss">
  
  .tag {
    position: relative;
    margin-bottom: 1rem;

    .tag-label {
      position: relative;
      display: inline-block;
      background: var(--tag-bg-color);
      color: var(--tag-text-color);
      box-shadow: var(--box-shadow-dark-theme);
      border: 2px solid var(--tag-text-color);
      padding: .2rem 1rem;
      border-radius: 3rem;
      font-size: 1em;
      font-weight: 700;
      transform: translate(0, 0);
      transition: .2s ease-out transform;
    }
    .tag-shadow {
      display: block;
      position: absolute;
      width: calc(100% + 5px);
      height: calc(100% + 5px);
      width: 100%;
      height: 100%;
      transform-origin: top left;
      border-radius: 3rem;
      top: 0;
      left: 0;
      z-index: -1;
      transition: .2s ease-out transform;
      background: var(--tag-text-color);
    }

    &:hover {
      .tag-label {
        transform: translate(-2px, -2px);
      }

      .tag-shadow {
        transform: scale(1.05, 1.05);
      }
    }
  }
</style>