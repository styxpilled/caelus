import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
let renderer;

// ! CREATE INITIAL SCENE
const scene = new THREE.Scene()

const light = new THREE.PointLight(0xffffff)
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(50, 2, 1, 1000);
camera.position.set(0, 0, 60);

let woman;

let mixer: THREE.AnimationMixer
let modelReady = false
const animationActions: THREE.AnimationAction[] = []
let activeAction: THREE.AnimationAction
let lastAction: THREE.AnimationAction
const fbxLoader: FBXLoader = new FBXLoader()

fbxLoader.load(
    'models/xbot.fbx',
    (object) => {
        object.scale.set(0.25, 0.25, 0.25);
        object.position.set(0, -25, 0);
        mixer = new THREE.AnimationMixer(object)

        const animationAction = mixer.clipAction(
            (object as THREE.Object3D).animations[0]
        )
        animationActions.push(animationAction)
        animationsFolder.add(animations, 'default')
        activeAction = animationActions[0]

        woman = object;
        scene.add(woman)

        fbxLoader.load(
            'models/standing.fbx',
            (object) => {
                console.log('loaded samba')

                const animationAction = mixer.clipAction(
                    (object as THREE.Object3D).animations[0]
                )
                animationActions.push(animationAction)
                animationsFolder.add(animations, 'standing')
            }
        )
        
        fbxLoader.load(
            'models/drunk.fbx',
            (object) => {
                console.log('loaded goofyrunning');
                (object as THREE.Object3D).animations[0].tracks.shift()
                const animationAction = mixer.clipAction(
                    (object as THREE.Object3D).animations[0]
                )
                animationActions.push(animationAction)
                animationsFolder.add(animations, 'drunk')

                modelReady = true
            }
        )
        fbxLoader.load(
            'models/Angry.fbx',
            (object) => {
                console.log('loaded bellydance')
                const animationAction = mixer.clipAction(
                    (object as THREE.Object3D).animations[0]
                )
                animationActions.push(animationAction)
                animationsFolder.add(animations, 'angry')
            }
        )
    }
)

const stats = Stats()
document.body.appendChild(stats.dom)

const animations = {
    default: function () {
        setAction(animationActions[0])
    },
    standing: function () {
        setAction(animationActions[1])
    },
    angry: function () {
        setAction(animationActions[2])
    },
    drunk: function () {
        setAction(animationActions[3])
    }
}

const setAction = (toAction: THREE.AnimationAction) => {
    if (toAction != activeAction) {
        lastAction = activeAction
        activeAction = toAction
        lastAction.fadeOut(1)
        activeAction.reset()
        activeAction.fadeIn(1)
        activeAction.play()
    }
}

const gui = new GUI()
const animationsFolder = gui.addFolder('Animations')
animationsFolder.open()

const clock = new THREE.Clock()

const animate = () => {
    requestAnimationFrame(animate);
    try {
        woman.rotation.y += 0.005;
    } catch (TypeError) {
        // pass
    }
    if (modelReady) mixer.update(clock.getDelta());

    renderer.render(scene, camera);
    stats.update()
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

export const createScene2 = (el) => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el, alpha: true });
    resize();
    animate();
    return true;
};