<template>
    <div class="container">
        <div tabindex="-1" ref="skipLink" class="skip-link-wrapper">
            <a :href="scrollId" tabindex="0" class="skip-link">Scroll to Content</a>
        </div>
    </div>
</template>
  
  <script>

  export default {
    name: 'ScrollToContent',
    data() {
        return {
            scrollElement: null
        }
    },
    watch: {
        $route() {
            this.$refs.skipLink.focus()

            this.$nextTick(() => {
                this.scrollElement = document.querySelector('h1')
            });
        }
    },
    computed: {
        scrollId(){
            return '#' + this.scrollElement?.id
        }
    },
  }
  </script>
  
  <style lang="scss" scoped>
    .container {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 1001;
    }

    .skip-link-wrapper {
        width: 100%;
        margin: auto;
        max-width: 1080px;
        outline: none;
    }
    .skip-link {
        display: inline-block;
        padding: 1rem;
        opacity: 0;
        margin: 1rem;

        &:before {
            display: none;
        }

        &:focus-visible {
            opacity: 1;
            pointer-events: all;
        }
    }
  
  </style>
  