<template>
    <a :href="link" :target="target" class="external-link" :rel="rel">
        <EmailIcon v-if="email"/>
        <HyperLinkIcon v-else/>
        {{ title }}
    </a>
</template>
  
  <script>
  import HyperLinkIcon from './icons/HyperLinkIcon.vue';
  import EmailIcon from './icons/EmailIcon.vue';

  export default {
    name: 'ExternalLink',
    components: {
        HyperLinkIcon,
        EmailIcon
    },
    props: {
        link: {
            type: String,
        },
        title: {
            type: String
        },
        email: {
            type: Boolean,
            default: false
        },
        rel: {
            type: String,
            default: null
        },
        target: {
            type: String,
            default: '_blank'
        }
    }

  }
  </script>
  
  <style lang="scss" scoped>

    .external-link {
        margin-left: 25px;
        svg {
            position: absolute;
            left: -25px;
            width: 20px;
            fill: inherit;
        }
    }  

  </style>
  