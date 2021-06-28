import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { Ground } from "./Ground";
import {Robot} from './RobotExpressive'
import { Sky } from "@react-three/drei";
import { MathUtils, TextureLoader  } from 'three';
// import Controls from "../Controls"; 
const PoissonDiskSampling = require('poisson-disk-sampling/src/implementations/fixed-density');

export default function GameScene() {
  document.getElementById("main").style.display = "none";
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  let pds = new PoissonDiskSampling({shape:[45,45],minDistance: 10});
  var boxes = pds.fill()
  useEffect(() => {
    if(score === 7) {
      setGameStart(true);
      setScore(0);
    }
  });
  return (
    <div className="anim">
      <Canvas camera={{ position: [20,25,-30]}}>
        {/* <gridHelper args={[50, 40, "blue", "hotpink"]}/> */}
        {/* <fog attach="fog" args={["#041830", 10, 30]} /> */}
        <Suspense
            fallback={<mesh></mesh>}
          ><Sky sunPosition={[0,50,0]} />
            <Ground />
            {/* <Controls /> */}
            <Boxes boxes={boxes}/>
            <Robot boxes={boxes} score={score} setScore={setScore} gameStart={gameStart}/>
            <directionalLight />
        </Suspense>
      </Canvas>
      <Link to="/">
            <button id="homeButton" className="ui">Go Back Home</button>
      </Link>
        <button className="hudF" id="forward">Forward</button>
        <button className="hudL" id="left">Left</button>
        <button className="hudR" id="right">Right</button>
        <p className="score" id="score">Score: {score}</p>
        <MainMenu gameStart={gameStart} setGameStart={setGameStart}/>
    </div>
  );
}

//50 by 50 grid
//randomly space out uniformly
//moving place to positive only
//using poisson dist alg
function Boxes({ boxes }){  

  return(<group>
    <mesh scale={[2,2,2]} position={[boxes[0][0],1,boxes[0][1]]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'red'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[boxes[1][0],1,boxes[1][1]]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'purple'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[boxes[2][0],1,boxes[2][1]]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'orange'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[boxes[3][0],1,boxes[3][1]]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'hotpink'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[boxes[4][0],1,boxes[4][1]]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'green'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[boxes[5][0],1,boxes[5][1]]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'blue'}/>
    </mesh>
    <mesh scale={[2,2,2]} position={[boxes[6][0],1,boxes[6][1]]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={'yellow'}/>
    </mesh>
  </group>);
}

function MainMenu( { gameStart, setGameStart } ) {

  useEffect(() => {
   let button = document.getElementById("startButton");

    button.onclick = () => {
      setGameStart(false);
    }
  });
    
  //once game is started - disable menu css
    let display = null; 
    if(!gameStart) {
      display = "none";
    }
    return(
    <header style={{position:'absolute', left:'20%', top:'40%', zIndex:999, display:display, opacity:'1', alignContent:'center'}}>
      <h1>Help Akkrusky get to the boxes!</h1>
      <p>Get to each box, careful, they shift every time you get to one!</p>
      <button id="startButton" style={{position:'relative', left:'40'}}>Click to start level</button>
    </header>);
}