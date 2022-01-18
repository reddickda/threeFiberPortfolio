import { useLayoutEffect, useRef, useCallback } from 'react'
import { noise } from "../Game/Perlin"
import { useFrame } from "@react-three/fiber";
import Perlin from './WaterNoise'
import Roboto from '../Fonts/Roboto.json'

import * as THREE from "three"

export default function Water(){
    const plane = useRef();
    const box = useRef();
    let t = 0;
    let f = 0.002;
    let a = 3;
    const graph = useCallback((x, z) => {
        return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
      }, [t, f, a])

    // let g = THREE.Geometry().fromBufferGeometry(box);

    useFrame(() => {
        t+=.01;
        let pa = plane.current.geometry.getAttribute("position").array;
        let geometry = plane.current.geometry;
        const hVerts = geometry.parameters.heightSegments + 1;
        const wVerts = geometry.parameters.widthSegments + 1;
        for (let j = 0; j < hVerts; j++) {
            for (let i = 0; i < wVerts; i++) {
            const ex = 2;
            pa[3 * (j * wVerts + i) + 2] =
                          (noise.perlin3(i / 100, j / 100, t) +
                            noise.perlin3((i + 200) / 50, j / 50, t) * Math.pow(ex, 1) +
                            noise.perlin3((i + 400) / 25, j / 25, t) * Math.pow(ex, 2) +
                            noise.perlin3((i + 600) / 12.5, j / 12.5, t) * Math.pow(ex, 3) +
                            +(noise.perlin3((i + 800) / 6.25, j / 6.25, t) * Math.pow(ex, 3))) /
                          2;
            }
        }
        plane.current.geometry.attributes.position.needsUpdate = true;
       
        // sadly getting the edges to move up and down WITh the top plane wouild be very hard
        let ba = box.current.geometry.getAttribute("position").array;
        let boxgeometry = box.current.geometry;
        const hboxVerts = boxgeometry.parameters.heightSegments + 1;
        const wboxVerts = boxgeometry.parameters.widthSegments + 1;
        for (let j = 0; j < hboxVerts; j++) {
            for (let i = 0; i < wboxVerts; i++) {
            const ex = 1;
            ba[3 * (j * wboxVerts + i) + 727] = 5 + Math.random();
                        //   (noise.perlin3(i / 100, j / 100, t) +
                        //     noise.perlin3((i + 200) , j / 50, t) * Math.pow(ex, 1) +
                        //     noise.perlin3((i + 400) / 25, j / 25, t) * Math.pow(ex, 2) +
                        //     noise.perlin3((i + 600) / 12.5, j / 12.5, t) * Math.pow(ex, 3) +
                        //     +(noise.perlin3((i + 800) / 6.25, j / 6.25, t) * Math.pow(ex, 3))) /
                        //   2;
            }
        }
        //through trial and error found the upper face vertices of the cube
        // ba[727] = 50;
        // ba[730] = 50;
        // ba[751] = 50;
        // ba[754] = 50;
        // ba[787] = 50;
        // ba[790] = 50;
        // ba[793] = 50;
        // ba[796] = 50;
        // ba[799] = 50;
        // ba[802] = 50;
        // ba[805] = 50;
        // ba[808] = 50;
        // ba[811] = 50;
        // ba[814] = 50;
        // ba[817] = 50;

        box.current.geometry.attributes.position.needsUpdate = true;


    })

    return(
    <group><mesh ref={plane} visible
        position={[-40, 0, -10]}
        rotation={[-190, 0, 20]}
      >
        <planeBufferGeometry attach="geometry" args={[50, 50, 24, 24]}/>
        <meshStandardMaterial
          attach="material"
          color="blue"
          roughness={1}
          metalness={0}
          wireframe
          side={THREE.DoubleSide}
        /></mesh>
        <mesh ref={box} position={[-30,-30,-10]}  rotation={[0, -13, 0]}>
            <boxBufferGeometry attach="geometry" args={[50,10,50, 10, 10, 10]}/>
            <meshStandardMaterial color="blue"
          roughness={1}
          metalness={0}side={THREE.DoubleSide} wireframe /></mesh>
          <Water2 />
          <Water3 />
          </group>)
}

function Water2() {
    let plane2 = useRef();

    useFrame(()=> {
        let pa = plane2.current.geometry.getAttribute("position").array;
        for( var i = 0; i <= pa.length; i+=3) {
            pa[i+2] = Math.random();
        }

        plane2.current.geometry.attributes.position.needsUpdate = true;

    })
    return(<mesh ref={plane2} visible
        position={[-30, 25, -10]}
        rotation={[-190, 0, 20]}
      >
        <planeBufferGeometry attach="geometry" args={[50, 50, 24, 24]}/>
        <meshStandardMaterial
          attach="material"
          color="blue"
          roughness={1}
          metalness={0}
          wireframe
          side={THREE.DoubleSide}
          
        /></mesh>)
}

function Water3() {
    let plane2 = useRef();
    let t = 0;
    let perlin = new Perlin();
    useFrame(()=> {
        t+=.002;
        let pa = plane2.current.geometry.getAttribute("position").array;
        for( var i = 0; i <= pa.length; i+=3) {
            pa[i+2] = perlin.noise(pa[i] / 30 + t, pa[i+1]/30)*3;
        }

        plane2.current.geometry.attributes.position.needsUpdate = true;

    })
    return(<mesh ref={plane2} visible
        position={[-30, 45, -10]}
        rotation={[-190, 0, 20]}
      >
        <planeBufferGeometry attach="geometry" args={[50, 50, 24, 24]}/>
        <meshStandardMaterial
          attach="material"
          color="blue"
          roughness={1}
          metalness={0}
          wireframe
          side={THREE.DoubleSide}
          
        /></mesh>)
}

function ThreeDText() {

    const font = new THREE.FontLoader().parse(Roboto);
    // configure font geometry
    const textOptions = {
      font,
      size: 5,
      height: 1
    };
    return (<mesh>
        <textGeometry attach='geometry' args={['three.js', textOptions]} />
        <meshStandardMaterial attach='material' />
      </mesh>)
}