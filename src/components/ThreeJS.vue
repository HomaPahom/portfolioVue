<template>
  <div class="container" ref="container" :class="[{'loaded': loaded}]"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const container = ref(null)
const loaded = ref(false)


const darkTheme = ref(false)

let scene, model, camera, renderer, controls

const meshPath =  '/camera.glb'

function initateRenderer() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer( { antialias: true, logarithmicDepthBuffer: true, alpha: true } )
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}


function addLights() {
  const ambientLight = new THREE.AmbientLight( 0xffffff, .3 );
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight( 0xffffff, .5 );
  scene.add( directionalLight )

  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.x = 20
  pointLight.position.y = 50
  pointLight.position.z = -10
  scene.add(pointLight)

  const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, .5 );
  scene.add( light );

  if(darkTheme.value) {
    scene.fog = new THREE.FogExp2( 0x262B44, .06 );
  } else {
    scene.fog = new THREE.FogExp2( 0xffffff, .06 );
  }
}

async function loadModel() {
  const loader = new GLTFLoader();

  await new Promise((resolve) => { 
    loader.load( meshPath, function ( gltf ) {
      model = gltf.scene
      scene.add( model );
      loaded.value = true
      return resolve()

    }, undefined, function ( ) {
      return
    });
  })

  model.position.y = 1
}

let requestId;

function animate() {
  requestId = requestAnimationFrame(function () {
    animate()
  })

  controls.update()

  renderer.render(scene, camera)
}

onMounted(async () => {
  const savedTheme = JSON.parse(localStorage.getItem("dark-theme"));
  darkTheme.value = savedTheme

  initateRenderer()
  addLights()
  await loadModel()

  controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance  = 4
  controls.maxDistance = 50
  controls.autoRotate = true

  camera.position.z = -4
  camera.position.x = -2
  camera.position.y = 2
  controls.update();

  animate()
})

onUnmounted(()=> {
  cancelAnimationFrame(requestId);
  scene.clear()
}) 

</script>

<style scoped lang="scss">

  .container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    cursor: grab;
    opacity: 0;
    transition: 1s ease-out opacity;

    &.loaded {
      opacity: 1;
    }
  }

  .container:active {
    cursor: grabbing;
  }

</style>
