import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { Ground } from "./Ground";
import {Robot} from './RobotExpressive'
import { Sky } from "@react-three/drei";
import { Boxes } from './Boxes';
import { MainMenu } from "./MainMenu";
import { useStore, nonReactCallbackResetScore, nonReactCallbackResetBoxes } from './GameStore';
// import Controls from "../Controls"; 

export default function GameScene() {
  document.getElementById("main").style.display = "none";
  const score = useStore(state => state.score);
  const [gameStart, setGameStart] = useState(true);
  
  useEffect(() => {
    if(score === 7) {
      setGameStart(true);
      nonReactCallbackResetScore();
      nonReactCallbackResetBoxes();
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
            <Boxes />
            <Robot gameStart={gameStart}/>
            <directionalLight />
        </Suspense>
      </Canvas>
      <Link to="/">
            <button id="homeButton" className="homeButton">Go Back Home</button>
      </Link>
        <button className="hudF" id="forward">Forward</button>
        <button className="hudL" id="left">Left</button>
        <button className="hudR" id="right">Right</button>
        <p className="score" id="score">Score: {score}</p>
        <MainMenu gameStart={gameStart} setGameStart={setGameStart}/>
    </div>
  );
}