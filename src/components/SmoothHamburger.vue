<script setup>
    defineProps({
        toggled: Boolean,
    })

    defineEmits(['toggle'])

</script>

<template>
    <button class="hamburger-button" :class="{ toggled: toggled }" @click="$emit('toggle')" type="button" :aria-label="toggled ? 'Close menu' : 'Open menu'">
        <span class="sr-only">Menu button</span>
        <svg class="hamburger" width="100%" height="100%" viewBox="0 0 71 74" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
            <g transform="matrix(1,0,0,1,-1207.97,-1323.24)">
                <g transform="matrix(1,0,0,1,0.661055,0.220346)">
                    <path class="top-line" d="M1209.28,1352.1L1263.6,1352.1C1263.6,1352.1 1264.09,1352.11 1264.87,1352.14C1267.83,1352.24 1270.62,1353.51 1272.64,1355.68C1274.66,1357.85 1275.73,1360.73 1275.62,1363.69C1275.31,1371.82 1274.95,1381.4 1274.95,1381.4C1274.95,1381.4 1274.93,1381.53 1274.9,1381.75C1274.53,1384.17 1272.83,1386.18 1270.49,1386.94C1268.15,1387.69 1265.6,1387.05 1263.88,1385.29C1260.34,1381.64 1257.1,1378.32 1257.1,1378.32L1220.52,1341.74" style="fill:none;"/>
                </g>
                <g transform="matrix(1,0,0,-1,0.661055,2719.84)">
                    <path class="bottom-line" d="M1209.28,1352.1L1263.6,1352.1C1263.6,1352.1 1264.09,1352.11 1264.87,1352.14C1267.83,1352.24 1270.62,1353.51 1272.64,1355.68C1274.66,1357.85 1275.73,1360.73 1275.62,1363.69C1275.31,1371.82 1274.95,1381.4 1274.95,1381.4C1274.95,1381.4 1274.93,1381.53 1274.9,1381.75C1274.53,1384.17 1272.83,1386.18 1270.49,1386.94C1268.15,1387.69 1265.6,1387.05 1263.88,1385.29C1260.34,1381.64 1257.1,1378.32 1257.1,1378.32L1220.52,1341.74" style="fill:none;"/>
                </g>
            </g>
        </svg>
    </button>
   
</template>

<style scoped lang="scss">
    .hamburger-button {
        position: relative;
        padding: 0;
        width: 50px;
        height: 50px;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        pointer-events: all;
        border-radius: 5px;

        .hamburger {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 90%;
            height: auto;
            transform: translate(-42%,-50%);
            transition: transform .6s cubic-bezier(0.4, 0, 0.2, 1);

            .top-line {
                stroke-dasharray: 55 200;
                stroke-dashoffset: 0;
            }

            .bottom-line {
                stroke-dasharray: 55 200;
                stroke-dashoffset: 0;
            }

            .top-line, .bottom-line {
                stroke-width: 4.5px;
                transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1), .2s ease-out stroke;
            }
        }
        
        @media (min-width: 720px) {
            .hamburger {
                width: 110%;
                .top-line, .bottom-line {
                    stroke: var(--link-color);
                }
            }

            &:hover {
                .hamburger {
                    .top-line, .bottom-line {
                        stroke: var(--link-color-hover);
                    }
                }
            }
        }

        @media (max-width: 720px) {
            background-color: var(--header-mobile-background);
            
            transition: .2s ease-out background-color;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 5px;
                box-shadow: var(--box-shadow);
                opacity: 1;
                transition: .2s ease-out opacity;
            }

            .hamburger {
                .top-line, .bottom-line {
                    stroke: var(--header-link-color);
                }
            }
        }

        &.toggled {
            &::before {
                opacity: 0;
            }

            &:after {
                border: 3px solid var(--header-link-color);
            }

            .hamburger {
                transform: translate(-45%,-50%);

                .top-line, .bottom-line {
                    stroke: var(--header-link-color);
                }

                .top-line {
                    stroke-dasharray: 80 250;
                    stroke-dashoffset: -116;
                }

                .bottom-line {
                    stroke-dasharray: 80 200;
                    stroke-dashoffset: -116;
                }
            }
        }
    }
</style>