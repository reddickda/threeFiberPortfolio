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
      <section style={{position:'absolute', left:'50%', top:'0%', zIndex:999, opacity:'1', alignContent:'center'}}>
      <h1 style={{color:'white'}}>Experimenting with noise:</h1>
        <p style={{color:'white'}}>Top: PlaneBufferGeometry Calm water.</p>
        <p style={{color:'white'}}>Second: PlaneBufferGeometry Electric current.</p>
        <p style={{color:'white'}}>Third: PlaneBufferGeometry Rough seas.</p>
        <p style={{color:'white'}}>Last: BoxBufferGeometry.</p>
      </section>
    </div>)
}