<template>
    <div class="img">
        <div class="img-wrapper" :class="{'loaded': revealImg}">
          <img :src="imageLink" :alt="altText"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RoundPicture",
        props: {
            imageLink: {
                type: String
            },
            altText: {
              type: String,
              default: ""
            }
        },
        data() {
          return {
            revealImg: false
          }
        },
        mounted() {
          const img = new Image()
          img.src = this.imageLink

          img.onload = ()=>{
            this.revealImg = true
          }

        }
    }

</script>

  <style lang="scss" scoped>
    
    .img {
      width: 100%;
      max-width: 200px;
      
      .img-wrapper {
        position: relative;
        border-radius: 50%;
        height: 0;
        padding-top: 100%;
        width: 100%;
  
        overflow: hidden;
        box-shadow: 0 5px 10px 0 rgba(0,0,0,.15);

        opacity: 0;
        transform: scale(.8) translateY(10%);
        will-change: transform, opacity;
        transition: .2s ease-out opacity, .5s ease-out transform;

        &.loaded{
          opacity: 1;
          transform: scale(1) translateY(0);
        }

  
        img {
          position: absolute;
          top:0;
          left:0;
          width: 100%;
        }
      }
    }
  
  
  </style>
  