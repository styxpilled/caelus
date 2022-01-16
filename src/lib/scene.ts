import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
let renderer;

// ! CREATE INITIAL SCENE
const scene = new THREE.Scene()

const light = new THREE.PointLight(0xffffff)
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
camera.position.set(5, 3, 5.0)

const OBJFile = 'models/12221_Cat_v1_l3.obj';
const MTLFile = 'models/12221_Cat_v1_l3.mtl';
const JPGFile = 'models/Cat_diffuse.jpg';
let gato;

new MTLLoader()
    .load(MTLFile, function (materials) {
        materials.preload();
        new OBJLoader()
            .setMaterials(materials)
            .load(OBJFile, function (object) {
                object.scale.set(0.1, 0.1, 0.1);
                object.rotation.x = -90;
                object.position.x += 5;
                const texture = new THREE.TextureLoader().load(JPGFile);

                object.traverse(function (child) {   // aka setTexture
                    if (child instanceof THREE.Mesh) {
                        child.material.map = texture;
                    }
                });
                gato = object;
                scene.add(gato);
            });
    });

const animate = () => {
    requestAnimationFrame(animate);
    try {
        gato.rotation.z += 0.01;
    } catch (TypeError) {
        // pass
    }
    renderer.render(scene, camera);
};

const resize = () => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    if (canvas.width !== width || canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        renderer.setSize(width, height, false);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        // set render target sizes here
    }
    // camera.updateProjectionMatrix();
};

export const createScene = (el) => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el, alpha: true });
    resize();
    animate();
    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true
    // controls.target.set(0, 1, 0)
    return true;
};