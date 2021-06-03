import './styles.css'
import { Canvas, extend, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { Suspense, useRef, useEffect, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

extend({OrbitControls})

// useLoader(GLTFLoader, url, (loader) => {
//     const dracoLoader = new DRACOLoader()
//     dracoLoader.setDecoderPath('/draco-gltf/')
//     loader.setDRACOLoader(dracoLoader)
//   })

function Model() {
  const collada = useLoader(ColladaLoader, "/Sawmill_Phase1_Layout_option_2_chad_caruso_design.dae", (loader) => {
    const colladaLoader = new ColladaLoader();
    colladaLoader.crossOrigin = '';
    colladaLoader.setCrossOrigin('');
  });
  return  (
    <primitive
      object={collada.scene}
    />
  );
}

function CameraControls(){
    const {
      camera,
      gl: {domElement}
    } = useThree();
  
    const controlsRef = useRef();
    useFrame(() => controlsRef.current.update())
  
    return (
      <orbitControls
        ref={controlsRef}
        args={[camera, domElement]}
      />
    );
  }

export default function Skatepark () {
    
    //sets html to not be rendered
    document.getElementById("main").style.display = "none";

    return (
        <div className="anim">
            <Suspense fallback={<div>Loading...</div>}>
                <SkateCanvas />
            </Suspense>
            <Link to="/">
                <button id="homeButton" className="ui">Go Back Home</button>
            </Link>
        </div>);
}

function SkateCanvas() {
    return (
        <Canvas
          colorManagement={false}
        >
            <directionalLight intensity={0.8} position={[0, 30, 30]} />
            <ambientLight intensity={0.2}/>
        <Suspense fallback={null}>
            <Model />
        </Suspense>
          <CameraControls/>
        </Canvas>
      );
}