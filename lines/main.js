import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);
scene.add(line);
renderer.render(scene, camera);

function animate() {
  renderer.render(scene, camera);
}

if (WebGL.isWebGL2Available()) {
  // Initiate function or other initializations here
  renderer.setAnimationLoop(animate);
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById("container").appendChild(warning);
}
