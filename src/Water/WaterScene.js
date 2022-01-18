import Water from "./Water"
import { Canvas } from "@react-three/fiber";
import Controls from "../Controls"; 
import { Link } from "react-router-dom";

export default function WaterScene() {
    document.getElementById("main").style.display = "none";
    return(
    <div className="anim">
    <Canvas camera={{  position: [60, 60, 60], fov: 75 }}>
        <Water />
        <ambientLight />
        <directionalLight />
        <Controls/>
        </Canvas>
        <Link to="/">
            <button id="homeButton" className="homeButton">Go Back Home</button>
      </Link>
      <section style={{position:'absolute', left:'0%', top:'75%', zIndex:999, opacity:'1', alignContent:'center'}}>
      <h1 style={{color:'white'}}>Experimenting with noise:</h1>
        <p style={{color:'white'}}>Top: PlaneBufferGeometry updating z vertices using Perlin noise, Calm water.</p>
        <p style={{color:'white'}}>Second: PlaneBufferGeometry updating z vertices using math.random, Electric current.</p>
        <p style={{color:'white'}}>Third: PlaneBufferGeometry updating z vertices using different Perlin noise. More Like rough seas.</p>
        <p style={{color:'white'}}>Last: BoxBufferGeometry updating top face z veterices using Random function. This one was tricky because the vertices are in a long 1D array and it took trial and error to find the correct vertice range to update to only affect the top face.</p>
      </section>
    </div>)
}