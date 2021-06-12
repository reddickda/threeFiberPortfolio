import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Link } from "react-router-dom";
import { Lights } from "./Lights";
import { Terrain } from "./Terrain";
import Controls from "../Controls"; 
import { Sky } from "@react-three/drei";

export default function GameScene() {
  document.getElementById("main").style.display = "none";
  return (
    <div className="anim">
      <Canvas camera={{ zoom: 40, position: [0, 0, 500] }}>
        <Suspense
          fallback={<div>Loading...</div>}
        >
        <Lights />
        <Terrain />
        <Controls />
        <Sky sunPosition={[7, 5, 1]} />
        </Suspense>
      </Canvas>
      <Link to="/">
            <button id="homeButton" className="ui">Go Back Home</button>
      </Link>
    </div>
  );
}