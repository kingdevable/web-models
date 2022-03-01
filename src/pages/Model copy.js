import React from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import "./Model.scss";

const MAX_MASK_POSITION = -30;

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
        this.camera.position.set(0, 16, 70);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor("#202020", 1.0);
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener("resize", this.onWindowResize);

        const controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        controls.target.set(0, 15, -43);
        controls.enableRotate = false;
        controls.zoomSpeed = -1;
        controls.update();
        //========= light ==========
        const ambient_light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
        this.scene.add(ambient_light);

        const pointLight = new THREE.PointLight(0xeeeeee, 0.4);
        pointLight.position.set(0, 20, 20);
        this.scene.add(pointLight);

        const spotLight_pink = new THREE.SpotLight(0xff00ff, 3, 150, 0.18);
        spotLight_pink.position.set(-40, 18, 11);
        const targetObject_pink = new THREE.Object3D();
        targetObject_pink.position.set(-4, 12, 0);
        spotLight_pink.target = targetObject_pink;
        spotLight_pink.castShadow = true;
        this.scene.add(spotLight_pink);
        this.scene.add(targetObject_pink);

        const spotLight_yellow = new THREE.SpotLight(0xffff00, 3, 150, 0.18);
        spotLight_yellow.position.set(40, 18, 10);
        const targetObject_yellow = new THREE.Object3D();
        targetObject_yellow.position.set(4, 12, -1);
        spotLight_yellow.target = targetObject_yellow;
        spotLight_yellow.castShadow = true;
        this.scene.add(spotLight_yellow);
        this.scene.add(targetObject_yellow);

        const spotLight_white = new THREE.SpotLight(0xffffff, 1, 300, 0.5);
        spotLight_white.position.set(0, 60, 10);
        const targetObject_white = new THREE.Object3D();
        targetObject_white.position.set(0, 25, -70);
        spotLight_white.target = targetObject_white;
        spotLight_white.castShadow = true;
        this.scene.add(spotLight_white);
        this.scene.add(targetObject_white);

        //============ ground =======
        const plane_geometry = new THREE.PlaneGeometry(1000, 1000);
        const plane_material = new THREE.MeshBasicMaterial({
            color: 0x202020,
            side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(plane_geometry, plane_material);
        plane.rotateX(-3.141592 / 2);
        plane.position.set(0, -10, 0);

        this.loader = new GLTFLoader();
        // ============= female model=======
        this.loader.load(
            "3d-models/female.glb",
            (gltf) => {
                this.female = gltf.scene.children[0];
                this.female.visible = false;
                this.scene.add(this.female);
                this.female.position.set(4, 0, -1);
                this.female.scale.set(100, 100, 100);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.log(error);
            }
        );

        // ============= male model=======
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("js/libs/draco/");
        const loader_male = new GLTFLoader();
        loader_male.setDRACOLoader(dracoLoader);

        loader_male.load(
            "3d-models/male.glb",
            (gltf) => {
                this.male = gltf.scene.children[0];
                this.male.visible = false;
                this.scene.add(this.male);
                this.male.position.set(-4, 0, 0);
                this.male.scale.set(100, 100, 100);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.log(error);
            }
        );

        this.animate();
    }

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    animate = () => {
        this.animationRequest = requestAnimationFrame(this.animate);
        const { setIsModelOpen } = this.props;
        if (this.male && this.female) {
            if (!this.male.visible && !this.female.visible) {
                this.male.visible = true;
                this.female.visible = true;

                // ============= this.mask model=======
                this.loader.load(
                    "3d-models/red/mask.glb",
                    (gltf) => {
                        this.mask = gltf.scene.children[0];
                        this.mask.scale.set(1, 1, 1);
                        this.mask.position.set(0, -150, -10);
                        this.scene.add(this.mask);
                    },
                    (xhr) => {
                        console.log(
                            (xhr.loaded / xhr.total) * 100 + "% loaded"
                        );
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }

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
