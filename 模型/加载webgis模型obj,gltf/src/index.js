/**
 * /*
 *
 * @format
 * @Description:
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-03-09 21:19:44
 * @LastEditors: yangsen
 * @LastEditTime: 2022-03-21 19:57:48
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import webgisGLTFOffset from '../public/untitledoffset.glb'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let car, webgis;

// 创建场景
var scene = new THREE.Scene();
// 设置摄像机 OrthographicCamera是正交相机  PerspectiveCamera是透视相机
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50);
// 设置相机的位置
camera.position.x = 50;
camera.position.y = 50
camera.position.z = 50;
camera.speed = {
  z: 0,
  x: 0,
};
camera.lookAt(0, 0, 0);

/* // 添加相机辅助对象
scene.add(new THREE.CameraHelper(camera));
// 做一个更远的相机，来让这个添加辅助的相机能够看到，不然看到的就是相机视椎体的近截面的两条垂直的灰色的线
const camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera1.position.set(20, 20, 20); */
// console.log(scene.position); // scene.position默认位置在{x: 0, y: 0, z: 0}
// 创建渲染器
var renderer = new THREE.WebGLRenderer();
// 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
// Window 接口的devicePixelRatio返回当前显示设备的物理像素分辨率与CSS像素分辨率之比
renderer.setPixelRatio(window.devicePixelRatio);
// 设置canvas画布大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置颜色及其透明度
renderer.setClearColor(new THREE.Color(0x08c924), 1);
// 设置阴影贴图
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 创建坐标轴
const axes = new THREE.AxesHelper(2000);
scene.add(axes);
// 创建地面几何体
const playground = new THREE.PlaneGeometry(50, 50);
// 创建地面材质
const materialGround = new THREE.MeshStandardMaterial({ color: 0xcccccc });
// 创建地面
const ground = new THREE.Mesh(playground, materialGround);
ground.position.set(0, 0, 0);
ground.rotateX(-Math.PI / 2);
// 接收阴影
ground.receiveShadow = true;
// scene.add(ground);

// 创建一个正方体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(40, 0, 3);
cube.castShadow = true;
// cube.translateX(2);
// cube.translateZ(2);
// scene.add(cube);

// renderer.render(scene, camera1);
// mtl加载器 MTL文件是材质描述文件
// const mtlLoader = new MTLLoader();
// mtlLoader.setPath('../assets/'); // 路径 loader上的方法 当你使用import引入静态资源之后，就不能用setPath方法了，否则就会报错出现两个http请求
// 开始从URL中加载，并返回已加载的材质。
/* mtlLoader.load(mtlMap, function (materials) {
  console.log('mtl加载成功');
  // console.log(materials);
  materials.side = THREE.DoubleSide;
  // 材质完成之后再导入obj
  // materials.preload();
  var objLoader = new OBJLoader();
  // 设置由 MTLLoader 载入的材质
  objLoader.setMaterials(materials);
  objLoader.load(
    objMap,
    function (object) {
      car = object;
      console.log('obj加载成功');
      const box3 = new THREE.Box3().setFromObject(car);
      const size = box3.getSize(box3.min, box3.max);
      // car.scale.set(0.1, 0.1, 0.1)
      var mdlen = box3.max.x - box3.min.x;
      var mdwid = box3.max.z - box3.min.z;
      var mdhei = box3.max.y - box3.min.y;
      //var centerpoint = new THREE.Vector3();
      var x1 = box3.min.x + mdlen / 2;
      var y1 = box3.min.y + mdhei / 2;
      var z1 = box3.min.z + mdwid / 2;

      // const box3 = new THREE.Box3().setFromObject(car);
      const center = box3.getCenter(box3.min, box3.max);
      console.log(box3);
      console.log(center);

      car.position.set(-x1, -y1, -z1)

      const boxHelper = new THREE.BoxHelper(car, 0xbd45a0);
      scene.add(boxHelper)

      //返回的是模型对象 基类为Object3D
      object.children.forEach(function (item) {
        // 对象是否被渲染到阴影贴图中。默认值为false。
        item.castShadow = true;
      });

      // 设置物体的旋转
      // car.rotateY((Math.PI * 5) / 4);
      // 对象是否被渲染到阴影贴图中 
      car.castShadow = true;
      scene.add(car);

      // 点光源 光照颜色、光照强度、表示从光源到光照强度为0的位置的距离、沿着光照距离的衰退量
      var pointLight = new THREE.DirectionalLight(0xffffff, 1, 0, 0);
      // 点光源位置
      pointLight.position.set(100, 100, 100);
      // 对象是否被渲染到阴影贴图中。默认值为false。
      pointLight.castShadow = true;
      // 把点光源添加到场景中
      scene.add(pointLight);
    },
    function () {
      console.log('progress');
    },
    function (err) {
      console.log(err);
    }
  );
}); */

// 加载glb模型
const gltfLoader = new GLTFLoader();
// gltfLoader.setPath('');
gltfLoader.load(webgisGLTFOffset, function (gltf) {
  console.log(gltf);
  scene.add(gltf.scene);
  webgis = gltf.scene
  webgis.scale.set(0.01, 0.01, 0.01)
  const boxHelper2 = new THREE.BoxHelper(gltf.scene)
  scene.add(boxHelper2)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(100, 100, 100)
  scene.add(directionalLight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.render(scene, camera);
});

// 一个canvas，渲染器在其上绘制输出。 必须要将渲染器添加到DOM中，否则画面是白的
document.getElementById('webgl-output').appendChild(renderer.domElement);
// 创建controls对象;
var controls = new OrbitControls(camera, renderer.domElement);
// 监听控制器的鼠标事件，执行渲染内容
controls.addEventListener('change', () => {
  // controls.target = webgis;
  renderer.render(scene, camera);
});
