/*
 * @Description: 目的：从Blender中导出一个以米为单位的立方体，判断在three.js和Blender中坐标是否一致，一致则代表three.js和Blender中默认的1米是一样的坐标长度。从结果看是一致的，在Blender中2m在three.js中坐标长度也是2m.
 * @Author: yangsen
 * @Date: 2023-01-06 20:32:49
 * @LastEditors: yangsen
 * @LastEditTime: 2023-01-10 15:01:17
 */
import * as THREE from "../three.js/build/three.module.js";
import { OrbitControls } from "../three.js/examples/jsm/controls/OrbitControls.js";
let camera, scene, renderer;

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

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, 0);
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xdd7694 });
const mesh = new THREE.Mesh(geometry, material);
const group = new THREE.Group();
/* NOTE: 通过add方法添加的对象是添加到children属性下 */
group.add(mesh);
console.log(group);

/* NOTE: group在scene的children属性下面 */
scene.add(group);
console.log(scene);
