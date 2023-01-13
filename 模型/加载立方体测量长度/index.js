/*
 * @Description: 目的：从Blender中导出一个以米为单位的立方体，判断在three.js和Blender中坐标是否一致，一致则代表three.js和Blender中默认的1米是一样的坐标长度。从结果看是一致的，在Blender中2m在three.js中坐标长度也是2m.
 * @Author: yangsen
 * @Date: 2023-01-06 20:32:49
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-13 11:40:42
 */
import * as THREE from "./three.js/build/three.module.js";
import { OrbitControls } from "./three.js/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./three.js/examples/jsm/loaders/GLTFLoader.js";
let camera, scene, renderer, model, position;

init();
render();

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.2,
    500
  );
  camera.position.set(3, 3, 3);
  scene = new THREE.Scene();
  // 添加光源
  const pointLight = new THREE.PointLight(0xecd452, 10);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);
  const axesHelper = new THREE.AxesHelper(20);
  scene.add(axesHelper);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xb1d5c8, 1);
  container.appendChild(renderer.domElement);
  render();
  const loader = new GLTFLoader().setPath("./");
  loader.load(
    "2mcube.glb",
    function (gltf) {
      gltf.name = "model";
      scene.add(gltf.scene);
      render();

      model = gltf.scene;
    },
    function (param) {
      console.log(param);
    },
    function (error) {
      console.log(error);
    }
  );
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, 0);
  controls.update();
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

/* 碰撞检测 */
const raycast = (event) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  const pointer = new THREE.Vector2();
  pointer.x = x;
  pointer.y = y;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointer, camera);

  const raycastArr = raycaster.intersectObject(model, true);
  if (raycastArr.length > 0) {
    const point = raycastArr[0].point;
    position = point;
    /* 显示点坐标 */
    const containerX = document.getElementById("X");
    const containerY = document.getElementById("Y");
    const containerZ = document.getElementById("Z");
    containerX.innerHTML = position.x;
    containerY.innerHTML = position.y;
    containerZ.innerHTML = position.z;
  }
};

document.addEventListener("click", raycast);
