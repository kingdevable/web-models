import React from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import "./Model.scss";

const MAX_MASK_POSITION = -36;

class Model extends React.Component {
    componentDidMount() {
        // === Creating the Scene, Camera, Renderor ===
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            20000
        );
        this.camera.position.set(0, 16, 150);

        this.renderer = new THREE.WebGLRenderer({ antialias: true } );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor("#202020", 1.0);
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener("resize", this.onWindowResize);

        const controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        controls.target.set(0, 15, -43);
        controls.enableRotate = true;
        controls.zoomSpeed = -1;
        controls.maxDistance = 150;
        controls.update();
        //========= light ==========
        const ambient_light = new THREE.AmbientLight(0xeeeeee, 0.5); // soft white light
        this.scene.add(ambient_light);

        const pointLight = new THREE.PointLight(0xeeeeee, 0.4);
        pointLight.position.set(0, 20, 20);
        this.scene.add(pointLight);

        const spotLight_pink = new THREE.SpotLight(0xdd00dd, 3, 150, 0.18);
        spotLight_pink.position.set(-40, 18, 11);
        const targetObject_pink = new THREE.Object3D();
        targetObject_pink.position.set(-4, 12, 0);
        spotLight_pink.target = targetObject_pink;
        spotLight_pink.castShadow = true;
        this.scene.add(spotLight_pink);
        this.scene.add(targetObject_pink);

        const spotLight_yellow = new THREE.SpotLight(0xdddd00, 3, 150, 0.18);
        spotLight_yellow.position.set(40, 18, 10);
        const targetObject_yellow = new THREE.Object3D();
        targetObject_yellow.position.set(4, 12, -1);
        spotLight_yellow.target = targetObject_yellow;
        spotLight_yellow.castShadow = true;
        this.scene.add(spotLight_yellow);
        this.scene.add(targetObject_yellow);

        const spotLight_white = new THREE.SpotLight(0xdddddd, 1, 300, 0.5);
        spotLight_white.position.set(0, 60, 10);
        const targetObject_white = new THREE.Object3D();
        targetObject_white.position.set(0, 25, -70);
        spotLight_white.target = targetObject_white;
        spotLight_white.castShadow = true;
        this.scene.add(spotLight_white);
        this.scene.add(targetObject_white);
        
        this.clock = new THREE.Clock();
        // manager
        const manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
            console.log( item, loaded, total );
        };
        // texture

        function onProgress( xhr ) {
            if ( xhr.lengthComputable ) {
                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete ) + '% downloaded' );
            }
        }

        function onError(e) {
            console.log( e );
        }
        

        this.loader = new GLTFLoader(manager);

        // ============= this.mask model=======
        this.loader.load(
            "3d-models/white/white_mask.glb",
            (gltf) => {
                this.mask = gltf.scene.children[0];
                this.mask.scale.set(100, 100, 100);
                this.mask.position.set(0, -150, -40);
                this.scene.add(this.mask);
            },
            onProgress, onError 
        );

        const textureLoader = new THREE.TextureLoader( manager );
        
        //============ ground =======
        const plane_geometry = new THREE.PlaneGeometry(1000, 500);
        textureLoader.load('https://rawgit.com/marcobiedermann/playground/master/three.js/smoke-particles/dist/assets/images/background.jpg', texture => {
            const plane_material = new THREE.MeshLambertMaterial({ blending: THREE.AdditiveBlending, color: 0xffffff, map: texture, opacity: 1,transparent: true });
            plane_material.map.minFilter = THREE.LinearFilter;
            const plane = new THREE.Mesh(plane_geometry, plane_material);
            plane.position.z = -400;
            this.scene.add(plane);
        })

        const texture1 = textureLoader.load( 'images/text1.png' );
        const texture2 = textureLoader.load( 'images/text2.png' );
        const texture3 = textureLoader.load( 'images/text3.png' );
        const createMaterial = (_texture) => {            
            return new THREE.ShaderMaterial({
                uniforms: {uTexture: {value: _texture},uOffset: {value: new THREE.Vector2(0.0, 0.0)},uAlpha: {value: 1.0}},
                vertexShader: `
                uniform vec2 uOffset;
                varying vec2 vUv;    
                vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
                    float M_PI = 3.1415926535897932384626433832795;
                    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
                    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
                    return position;
                }
        
                void main() {
                    vUv = uv;
                    vec3 newPosition = position;
                    newPosition = deformationCurve(position,uv,uOffset);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
                }`,
                fragmentShader: `
                uniform sampler2D uTexture;   
                varying vec2 vUv;      
        
                vec4 rgbShift(sampler2D rgbTexture, vec2 uv) {
                    float r = texture2D(rgbTexture,vUv).r;
                    float g = texture2D(rgbTexture,vUv).y;
                    float b = texture2D(rgbTexture,vUv).z;
                    float alpha = r*g*b;
                    return vec4(r, g, b, alpha);
                }
        
                void main() {
                    vec4 color = rgbShift(uTexture,vUv);
                    gl_FragColor = color;
                }`,
                transparent: true
            })
        }
        const geometry = new THREE.PlaneGeometry(35.4, 20, 1, 1)
        const material1=createMaterial(texture1)
        const material2=createMaterial(texture2)
        const material3=createMaterial(texture3)
        const plane1 = new THREE.Mesh(geometry, material1)
        const plane2 = new THREE.Mesh(geometry, material2)
        const plane3 = new THREE.Mesh(geometry, material3)
        plane3.position.set(0,16.5,0)
        plane2.position.set(0,16.5,20)
        plane1.position.set(0,16.5,40)
        this.scene.add(plane1)
        this.scene.add(plane2)
        this.scene.add(plane3)
        
        this.smokeParticles = [];
        textureLoader.load('images/clouds.png', _texture => {
            const smokeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: _texture, transparent: true, alphaMap:_texture, opacity:0.5 });
            // const smokeMaterial = createMaterial(_texture);
            smokeMaterial.map.minFilter = THREE.LinearFilter;
            const smokeGeometry = new THREE.PlaneBufferGeometry(100, 100);
            const smokeMeshes = [];
            let limit = 150;
            while (limit--) {
                smokeMeshes[limit] = new THREE.Mesh(smokeGeometry, smokeMaterial);
                smokeMeshes[limit].position.set(Math.random() * 150 - 75, Math.random() * 80 - 30, Math.random() * 200 - 200);
                // smokeMeshes[limit].rotation.z = Math.random() * 360;
                this.smokeParticles.push(smokeMeshes[limit]);
                this.scene.add(smokeMeshes[limit]);
            }
        });
        

        this.animate();
    }

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    evolveSmoke = (delta) =>{            
        let smokeParticlesLength = this.smokeParticles.length;
        while (smokeParticlesLength--) {
            this.smokeParticles[smokeParticlesLength].rotation.z += delta * 0.1;
        }
    }
    animate = () => {
        this.animationRequest = requestAnimationFrame(this.animate);
        const { setIsModelOpen } = this.props;
        this.evolveSmoke(this.clock.getDelta())
        if (this.camera.position.z < MAX_MASK_POSITION) {
            cancelAnimationFrame(this.animationRequest);
            delete this.animationRequest;
            setIsModelOpen(false);
            const y = 30;
            const p = this.mask.position;
            p.y = y + this.camera.position.z * 0.5;
            this.mask.position.copy(p);
            console.log(
                this.mask.position.y + ":::::" + this.camera.position.z
            );
        }
        this.renderer.render(this.scene, this.camera);
    };

    componentDidUpdate(prevProps) {
        const { isModelOpen } = this.props;
        document.getElementsByTagName("canvas")[0].style.display = isModelOpen
            ? "block"
            : "none";
        if (isModelOpen && !this.animationRequest) {
            const { x, y, z } = this.camera.position;
            this.camera.position.set(x, y, z + 10);
            this.animate();
        }
    }

    render() {
        const { isModelOpen } = this.props;
        return (
            <div
                style={{ display: isModelOpen ? "block" : "none" }}
                ref={(ref) => (this.mount = ref)}
            />
        );
    }
}

export default Model;
