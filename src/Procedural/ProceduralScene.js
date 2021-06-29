import React, { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { Lights } from "../Game/Lights";
// import { Terrain } from "./Terrain";
// import Controls from "../Controls"; 
// import { Sky } from "@react-three/drei";

export default function ProceduralScene() {
  document.getElementById("main").style.display = "none";
  return (
    <div className="anim">
      <Canvas camera={{ far: 10000, position: [ 0, 5, - 500]}}>
        <Suspense
          fallback={<div>Loading...</div>}
        >
        <Lights />
        {/* <Terrain /> */}
        {/* <Controls /> */}
        {/* <Sky sunPosition={[7, 5, 1]} /> */}
        </Suspense>
      </Canvas>
      <Link to="/">
            <button id="homeButton" className="homeButton">Go Back Home</button>
      </Link>
    </div>
  );
}