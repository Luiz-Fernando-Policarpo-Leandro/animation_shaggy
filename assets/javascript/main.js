import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// ======================================================
// ELEMENTOS DOM
// ======================================================

const ui = {
  toggleAnimation: document.querySelector(".toggleAnimation"),
  controlAnimation: document.querySelector(".controlAnimation"),
  resetAnimation: document.querySelector(".resetAnimation"),
  easteregg: document.getElementById("easteregg"),
};

// ======================================================
// THREE.JS CORE
// ======================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.4,
  1000,
);

camera.position.set(-4, 3.5, 4);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// ======================================================
// CONTROLS
// ======================================================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

// ======================================================
// LIGHTS
// ======================================================

scene.add(new THREE.AmbientLight(0xffffff, 1));

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

directionalLight.position.set(5, 10, 5);

scene.add(directionalLight);

// ======================================================
// ANIMATION STATE
// ======================================================

const clock = new THREE.Clock();

let mixer = null;
let action = null;

const state = {
  isActive: false,
};

// ======================================================
// MODEL LOADING
// ======================================================

const loader = new GLTFLoader();

loader.load(
  "./assets/models/shaggy_macarena_dance.glb",

  ({ scene: model, animations }) => {
    scene.add(model);

    if (!animations.length) return;

    mixer = new THREE.AnimationMixer(model);

    action = mixer.clipAction(animations[0]);
  },

  ({ loaded, total }) => {
    console.log(`Carregando: ${((loaded / total) * 100).toFixed(2)}%`);
  },

  (error) => {
    console.error("Erro ao carregar modelo:", error);
  },
);

// ======================================================
// ANIMATION HELPERS
// ======================================================

function startAnimation() {
  if (!action) return;

  action.reset();

  action.play();

  action.paused = false;

  state.isActive = true;

  ui.toggleAnimation.textContent = "Dance";
}

function stopAnimation() {
  if (!action) return;

  action.stop();

  state.isActive = false;

  ui.toggleAnimation.textContent = "Idle";

  ui.controlAnimation.textContent = "Play";
}

function toggleAnimation() {
  if (state.isActive) {
    stopAnimation();

    return;
  }

  startAnimation();
}

function controlAnimation() {
  if (!action || !state.isActive) return;

  action.paused = !action.paused;

  ui.controlAnimation.textContent = action.paused ? "Pause": "Play";
}

function resetAnimation() {
  if (!action || !state.isActive) return;

  const wasPaused = action.paused;

  action.reset();

  action.play();

  action.paused = wasPaused;
}

// ======================================================
// UI EVENTS
// ======================================================

ui.toggleAnimation.addEventListener("click", toggleAnimation);

ui.controlAnimation.addEventListener("click", controlAnimation);

ui.resetAnimation.addEventListener("click", resetAnimation);

// ======================================================
// KEYBOARD EVENTS
// ======================================================

const pressedKeys = new Set();

function updateeastereggVisibility() {
  const shouldShow = pressedKeys.has("Enter") && pressedKeys.has("Shift");

  ui.easteregg.style.display = shouldShow ? "block" : "none";
}

document.addEventListener("keydown", ({ key }) => {
  pressedKeys.add(key);

  updateeastereggVisibility();
});

document.addEventListener("keyup", ({ key }) => {
  pressedKeys.delete(key);

  updateeastereggVisibility();
});

// ======================================================
// RESIZE
// ======================================================

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", handleResize);

// ======================================================
// RENDER LOOP
// ======================================================

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  mixer?.update(delta);

  controls.update();

  renderer.render(scene, camera);
}

animate();
