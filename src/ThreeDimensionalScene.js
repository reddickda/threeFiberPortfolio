import './styles.css'
import { Canvas, useLoader, useFrame, useThree, extend  } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { TextureLoader } from 'three';
import { Suspense, useMemo, useCallback, useRef } from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

extend({OrbitControls})

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
        autoRotate
        autoRotateSpeed={-0.2}
      />
    );
  }

function Points() {
    const cicleTexture = useLoader(TextureLoader, '/circle.png');

    const bufferRef = useRef();

    let t = 0;
    let f = 0.002;
    let a = 3;
    const graph = useCallback((x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    }, [t, f, a])

    let count = 100;
    let sep = 3;
    let positions = useMemo(() => {
        let positions = [];

        for(let xi = 0; xi < count; xi++) {
            for(let zi = 0; zi < count; zi++) {
                let x = sep*(xi - count / 2);
                let z = sep*(zi - count / 2);
                let y = graph(x, z);
                positions.push(x, y, z);
            }
        }

        return new Float32Array(positions);
    }, [count, sep]);

    useFrame(() => {
        t += 15
        
        const positions = bufferRef.current.array;
    
        let i = 0;
        for (let xi = 0; xi < count; xi++) {
          for (let zi = 0; zi < count; zi++) {
            let x = sep * (xi - count / 2);
            let z = sep * (zi - count / 2);
    
            positions[i + 1] = graph(x, z);
            i += 3;
          }
        }
    
        bufferRef.current.needsUpdate = true;
      })


    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    ref={bufferRef}
                    attachObject={['attributes', 'position']}
                    array={positions}
                    count={positions.length/3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                map={cicleTexture}
                color={0x00AAFF}
                size={0.5}
                alphaTest={0.5}
            />
        </points>
    )
}

export default function ThreeDimensionalScene() {
    //sets html to not be rendered
    document.getElementById("main").style.display = "none";
    return (
    <div className="anim">
        <Suspense fallback={<div>Loading...</div>}>
            <AnimationCanvas />
        </Suspense>
        <Link to="/">
            <button id="homeButton" className="ui">Go Back Home</button>
        </Link>
    </div>);
}

function AnimationCanvas() {
    return (
      <Canvas
        colorManagement={false}
        camera={{ position: [100, 10, 0], fov: 75 }}
      >
        <Suspense fallback={null}>
          <Points />
        </Suspense>
        <CameraControls/>
      </Canvas>
    );
  }