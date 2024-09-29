<template>
    <div class="expandable-section" :class="{'toggled': sectionToggled}" ref="expandableSection">
        <button class="expand-button" @click="toggleSection()">
            {{ title }}
            <div class="expand-icon">
            </div>
        </button>
        <div class="content-container" ref="contentContainer" :style="{ 'height': this.contentHeight + 'px' }">
            <div class="content" ref="content">
                <slot></slot>
            </div>
        </div>

    </div>    
</template>

<script>

export default {
    name: 'ExpandableSection',
    data(){
        return {
            sectionToggled: false,
            contentHeight: 0,
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
    },
    methods: {
        toggleSection() {
            this.sectionToggled = !this.sectionToggled

            if(this.sectionToggled) {
                this.contentHeight = this.$refs.content.offsetHeight;
                this.$refs.expandableSection.scrollIntoView({ behavior: "smooth" });

                window.addEventListener("resize", this.resize);

            } else {
                this.contentHeight = 0;
                window.removeEventListener("resize", this.resize);
            }
        },
        resize() {
            this.contentHeight = this.$refs.content.offsetHeight;
        }
    }
}
</script>

<style lang="scss" scoped>
    .expandable-section {

        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 1rem;
        background-color: var(--exandable-section-bg);
        box-shadow: var(--exandable-section-shadow);
        /* border-radius: 5px; */
    }

    .expand-button {
        display: flex;
        align-items: center;
        position: relative;
        justify-content: space-between;
        text-align: left;
        width: 100%;
        padding: 1rem;
        font-weight: 600;
        font-size: 1.2em;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        color: var(--text-color);
        transition: .2s ease background-color;
        /* border-left: 5px solid var(--link-color); */
        background-color: var(--exandable-section-bg);
/*         border-radius: 5px; */
        z-index: 10;

        &::before {
            content: "";
            display: block;
            position: absolute;
            z-index: 11;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background-color: var(--link-color);
        }

        @media(min-width: 720px) {
            font-size: 1.4em;
        }

        &:hover {
            background-color: var(--exandable-section-bg-hover);
        }

        .expand-icon {
            display: block;
            width: 30px;
            height: 30px;
            position: relative;
            &::before, &::after {
                content: '';
                width: 100%;
                height: 3px;
                background-color: var(--link-color);
                position: absolute;
                top: 50%;
                left: 50%;
                will-change: transform;
                border-radius: 10px;
                transform: translate(-50%,-50%);
            }

            &::after {
                transition: .2s ease transform;
                transform: translate(-50%,-50%) rotate(-90deg);
            }
        }
    }

    .content-container {
        overflow: hidden;
        will-change: height, opacity;
        transition: .3s ease-out height, .3s ease-out opacity;
        opacity: 0;
        height: 0;

        .content {
            padding: 1rem;
        }
    }

    .toggled {
        .expand-button {
            /* border-radius: 5px 5px 0 0; */
            background-color: var(--exandable-section-bg);

            &:hover {
                background-color: var(--exandable-section-bg-hover);
            }
            .expand-icon {
                &::after {
                    transform: translate(-50%,-50%) rotate(0deg);
                }
            }
        }

        .content-container {
            opacity: 1;
        }
    }

</style>
