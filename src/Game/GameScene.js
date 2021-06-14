import React, { Suspense } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { Link } from "react-router-dom";
import { Lights } from "./Lights";
import { Terrain } from "./Terrain";
import Controls from "../Controls"; 
import { Sky } from "@react-three/drei";

export default function ProceduralScene() {
  document.getElementById("main").style.display = "none";
  return (
    <div className="anim">
      <Canvas camera={{ position: [ 75, 20, 0]}}>
        <Suspense
          fallback={<div>Loading...</div>}
        >
          <directionalLight />
        </Suspense>
      </Canvas>
      <Link to="/">
            <button id="homeButton" className="ui">Go Back Home</button>
      </Link>
    </div>
  );
}