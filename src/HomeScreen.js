import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { MathUtils, TextureLoader } from 'three';
import { useRef } from 'react';
import {
  useHistory
} from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function HomeScreen() {
  const history = useHistory();
  const milesTexture = useLoader(TextureLoader, '/miles.jpg');
  const moonTexture = useLoader(TextureLoader, '/moon.jpg');
  const normalTexture = useLoader(TextureLoader, '/normal.jpg');
  const donut = useLoader(GLTFLoader, "/doughnut-P2b.glb");

  //sets html to be rendered
  document.getElementById("main").style.display = null;

  //looks for 'three' which is a button and changes the route to change scene
  document.getElementById("three").onclick = () => {
    history.push("/three");
  }
    return (
        <>
        <Canvas camera={{ fov: 75, position: [0, 0, 0] }} pixelRatio={window.devicePixelRatio}> 
          <SetBackGround />
          <pointLight position={[5,5,5]} color="0xffffff"/>
          <ambientLight intensity={0.2}/>
          {addStars()}
          <SetBackGround />
          <SetTextures textures={[milesTexture, moonTexture, normalTexture]}/>
        </Canvas >
        </>
    );
   }
  
  // creates 200 stars, adds them to a list and returns them all as a group
  function addStars() {
    var stars = [];
    for(var i=0; i < 200;i++) {
      const [x,y,z] = Array(3).fill().map(() => MathUtils.randFloatSpread(100));
      stars.push(<mesh position={[x,y,z]} key={i}>
        <sphereBufferGeometry args={[.25,24,24]}/>
        <meshStandardMaterial color="white"/>
      </mesh>);
    }
  
    return (
      <group>
        {stars}
      </group>
    )
  }
  
  //sets the scene background
  function SetBackGround() {
    const loader = new TextureLoader();
  
    const backgroundTexture = loader.load('/coolgradient.jpg');
    const {scene} = useThree();
  
    scene.background= backgroundTexture;
    return null;
  }
  
  //sets the moon and miles textures in the sphere and cube
  //sets rotation with scrolling on body
  function SetTextures({ textures }) {
    const milesRef = useRef();
    const moonRef = useRef();
    const { camera } = useThree();
  
    //maybe put this in a useEffect?
    //https://stackoverflow.com/questions/56541342/react-hooks-why-is-current-null-for-useref-hook
     document.body.onscroll = () => {
      const t = document.body.getBoundingClientRect().top;
      //null checks because on history push the component is re rendered? (check this)
      //and the function is still called ?
      if(moonRef != null && moonRef.current != null){
        moonRef.current.rotation.x += 0.05;
        moonRef.current.rotation.y += 0.075;
        moonRef.current.rotation.z += 0.05;
      }
      if(milesRef != null && milesRef.current != null){
        milesRef.current.rotation.y += .01;
        milesRef.current.rotation.z += .01;
      }
      if(camera != null && camera.position != null){
        camera.position.z = t * -0.01;
        camera.position.x = t * -0.0002;
        camera.rotation.y = t * -0.0002;
      }
    };
  
    return(
      <>
      <mesh ref={milesRef} position={[2,0,-10]}>
        <boxBufferGeometry args={[3,3,3]}/>
        <meshBasicMaterial map={textures[0]} />
      </mesh>
      <mesh ref={moonRef} position={[-10,0,20]}>
      <sphereBufferGeometry args={[3,32,32]}/>
    <meshStandardMaterial map={textures[1]} normalMap={textures[2]} />
    </mesh>
    </>
    );
  }
