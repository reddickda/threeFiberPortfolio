import { Canvas, useLoader, useFrame, useThree, extend  } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { TextureLoader } from 'three';
import { Suspense, useMemo, useCallback, useRef } from 'react';
import Controls from "../Controls"; 

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
    let sep = 2;
    let positions = useMemo(() => {
      console.log("here")
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
    }, [count, sep, graph]);

    useFrame(() => {
        t += 1
        
        const positionBuffer = bufferRef.current.array;
    
        let i = 0;
        for (let xi = 0; xi < count; xi++) {
          for (let zi = 0; zi < count; zi++) {
            let x = sep * (xi - count / 2);
            let z = sep * (zi - count / 2);
    
            positionBuffer[i + 1] = graph(x, z);
            //every 3rd item aka y
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
            <button id="homeButton" className="homeButton">Go Back Home</button>
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
        <Controls/>
      </Canvas>
    );
  }