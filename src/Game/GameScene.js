import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { Ground } from "./Ground";
import {Robot} from './RobotExpressive'
import Controls from "../Controls"; 
import { Sky } from "@react-three/drei";

export default function ProceduralScene() {
  document.getElementById("main").style.display = "none";
  const [score, setScore] = useState(0);
  return (
    <div className="anim">
      <Canvas camera={{ position: [ -10,10,-9.5]}}>
        <gridHelper args={[50, 40, "blue", "hotpink"]}/>
        {/* <fog attach="fog" args={["#041830", 10, 30]} /> */}
        <Suspense
            fallback={<mesh></mesh>}
          ><Sky sunPosition={[0,50,0]} />
            <Ground />
            <Boxes />
            <Robot score={score} setScore={setScore}/>
            <directionalLight />
          <Controls />
        </Suspense>
      </Canvas>
      <Link to="/">
            <button id="homeButton" className="ui">Go Back Home</button>
      </Link>
        <button className="hudF" id="forward">Forward</button>
        <button className="hudL" id="left">Left</button>
        <button className="hudR" id="right">Right</button>
        <p className="score" id="score">Score: {score}</p>
    </div>
  );
}

function Boxes(){
  return(<group>
    <mesh scale={[2,2,2]} position={[13,.5,1]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'red'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[-15,.5,11]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'purple'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[5,.5,18]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'orange'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[1,.5,5]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'hotpink'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[18,.5,-18]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'green'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[1,.5,-5]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'blue'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[-12,.5,-15]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'yellow'}/>
    </mesh>
  </group>);
}