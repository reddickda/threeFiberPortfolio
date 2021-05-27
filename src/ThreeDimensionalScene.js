import { Canvas } from "@react-three/fiber";

export default function ThreeDimensionalScene() {
    //sets html to not be rendered
    document.getElementById("main").style.display = "none";
    return (
    <div>
        <Canvas camera={{ fov: 75, position: [0, 0, 0] }} pixelRatio={window.devicePixelRatio}>
            <ambientLight intensity={0.2}/>
            <mesh position={[2,0,-10]}>
                <boxBufferGeometry args={[3,3,3]}/>
                <meshStandardMaterial />
            </mesh>
        </Canvas>
    </div>);
}