import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000 // Large far plane to ensure visibility
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambient light
scene.add(ambientLight);

// Load the model
let glb_model = null;
loader.load(
  "./glb/scifi_girl.glb",
  function (gltf) {
    glb_model = gltf.scene;

    // Log model info to understand scale/position
    console.log("Loaded Model:", glb_model);
scene.add(glb_model);

    // Create a bounding box and get center/size
    // const box = new THREE.Box3().setFromObject(glb_model);
    // const center = new THREE.Vector3();
    // const size = new THREE.Vector3();
    // box.getCenter(center);
    // box.getSize(size);

    // console.log("Model Center:", center);
    // console.log("Model Size:", size);

    // // Center the model
    // glb_model.position.sub(center);

    // // Adjust scale (reduce further if needed)
    // glb_model.scale.set(1, 1, 1);

    // // Add model to scene

    // // Adjust camera based on model size and position
    // const maxDim = Math.max(size.x, size.y, size.z);
    // const fov = camera.fov * (Math.PI / 180);
    // const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

    // camera.position.set(0, 0, cameraZ * 1.5); // Move camera accordingly
    // camera.lookAt(0, 0, 0); // Point camera at the model
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Animation function
camera.position.set(0, 1, 2);
function animate() {
  if (glb_model !== null) {

    glb_model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

// Check if WebGL2 is available
if (WebGL.isWebGL2Available()) {
  renderer.setAnimationLoop(animate);
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById("container").appendChild(warning);
}
