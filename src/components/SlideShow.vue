<template>
    <div class="container">
        <div class="slide-container" ref="slideContainer">
            <div class="slide" :class="{ active: index === activeSlide }" v-for="(slide, index) in slides" :key="index">
                <div class="content">
                    <img :src="slide.src" />
                </div>
            </div>
        </div>
        <div class="button-container">
            <button class="button previous" @click="previousSlide">
                Previous
            </button>
            <button class="button next" @click="nextSlide">
                Next
            </button>
        </div>
    </div>
</template>
  
  <script>

  export default {
    name: 'SlideShow',
    data() {
        return {
            activeSlide: 0,
            slides: [
                {
                    src: 'slide-1.jpg',
                    text: '1'
                },
                {
                    src: 'slide-4.jpg',
                    text: '2'
                },
                {
                    src: 'slide-3.jpg',
                    text: '3'
                },
            ]
        }
    },
    computed: {
        scrollId(){
            return '#' + this.scrollElement?.id
        }
    },
    methods: {
        nextSlide() {
            this.$refs.slideContainer.classList.remove('reverse')

            if(this.activeSlide < this.slides.length - 1)
                this.activeSlide += 1
            else
                this.activeSlide = 0;
        },
        previousSlide() {
            this.$refs.slideContainer.classList.add('reverse')

            if(this.activeSlide === 0)
                this.activeSlide = this.slides.length - 1
            else
                this.activeSlide -= 1;
        }
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .slide-container {
        position: relative;
        width: 100%;
        padding-top: 62%;
        .slide {
            position:absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #f2f2f2;
            border-radius: .3rem;
            overflow: hidden;
            box-shadow: 0px 5px 20px -10px rgba(0, 0, 0, 0.55);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.2);
            will-change: transform, opacity;
            transform: translate(-100%,0) scale(0.8);
            opacity: 0;
            animation: backward 0.5s;
            animation-fill-mode: forwards;

            &.active {
                transform: translate(0,0);
                opacity: 1;

                animation: forward 0.5s;
                animation-fill-mode: forwards;
            }

            @keyframes forward {
                0%{
                    opacity: 0;
                    transform: translate(100%,0) scale(0.8);
                }
                100%{
                    opacity: 1;
                    transform: translate(0,0);
                }
            }

            @keyframes backward {
                0%{
                    opacity: 1;
                    transform: translate(0,0);
                }
                100%{
                    opacity: 0;
                    transform: translate(-100%,0) scale(0.8);
                }
            }
        }

        &.reverse {
            .slide {
                animation: backward-reverse 0.5s;
                animation-fill-mode: forwards;
                &.active {
                    transform: translate(0,0);
                    opacity: 1;

                    animation: forward-reverse 0.5s;
                    animation-fill-mode: forwards;
                }

                @keyframes forward-reverse {
                    0%{
                        opacity: 0;
                        transform: translate(-100%,0) scale(0.8);
                    }
                    100%{
                        opacity: 1;
                        transform: translate(0,0);
                    }
                }

                @keyframes backward-reverse {
                    0%{
                        opacity: 1;
                        transform: translate(0,0);
                    }
                    100%{
                        opacity: 0;
                        transform: translate(100%,0) scale(0.8);
                    }
                }
            }
        }
    }

    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%,-50%);

        img {
            width: 100%;
        }
    }
    .button-container {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        width: 100%;
        justify-content: space-between;
    }

  </style>
  