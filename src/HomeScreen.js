import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber';
import { Euler, MathUtils, Quaternion, TextureLoader, Vector3 } from 'three';
import { useRef, useEffect, useMemo } from 'react';
import {
  useHistory
} from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

///make element child of the camera and make it forward OR

///todo place it in front of the camera
///get the direction in which the camera is looking

export default function HomeScreen() {
  const history = useHistory();
  

  //sets html to be rendered
  document.getElementById("main").style.display = null;

  //looks for 'three' which is a button and changes the route to change scene
  document.getElementById("three").onclick = () => {
    history.push("/three");
  }
    return (
      <Canvas pixelRatio={window.devicePixelRatio} camera={{position:[0,0,0], fov:75} } >
        <MainScene />
      </Canvas>
    );
   }

   function MainScene() {
    const milesTexture = useLoader(TextureLoader, '/miles.jpg');
    const moonTexture = useLoader(TextureLoader, '/moon.jpg');
    const normalTexture = useLoader(TextureLoader, '/normal.jpg');
    const backgroundTexture = useLoader(TextureLoader, "/coolgradient.jpg")
    const donut = useLoader(GLTFLoader, "/doughnut-P2b.glb");
    const donutRef = useRef();

    const sceneRef = useRef()
    const { camera } = useThree()
    // if(sceneRef.current != undefined) {
    //   sceneRef.current.background = backgroundTexture;
    // }
    //rerenders scene with background --idk which is better
    // useFrame(({ gl }) => void ( gl.render(sceneRef.current, camera)), 100)

   useFrame(({clock}) => {
    if(donutRef!=null && donutRef.current !=null){
      // var dist = 6;
      // var vector = new THREE.Vector3();
      //  camera.getWorldDirection( vector );
      // vector.multiplyScalar(dist);
      //  vector.add(camera.position);
      // boxref.current.position.set(vector.x, vector.y, vector.z)
      // boxref.current.setRotationFromQuaternion(camera.quaternion)
var t = .01;

      donutRef.current.position.copy( camera.position );
      donutRef.current.rotation.copy( camera.rotation );
      donutRef.current.updateMatrix();
      donutRef.current.translateZ( - 4 );
      //will need to deal with screen size
      // donutRef.current.translateX(w/10);
      // donutRef.current.translateY(2/h)
      donutRef.current.rotation.z+=clock.getElapsedTime()*.5;
    }    
   })

     return(
       <scene ref={sceneRef}>

          <pointLight position={[5,5,5]} color="0xffffff"/>
          <ambientLight intensity={0.2}/>
          <SetBackGround />
          {addStars()}
          <SetTextures textures={[milesTexture, moonTexture, normalTexture]}/>
          <primitive position={[7,2,-4]} rotation={[2.5,3,0]} ref={donutRef} object={donut.scene}></primitive>
        </scene>
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
  
  //sets the moon and miles textures in the sphere and cube
  //sets rotation with scrolling on body
  function SetTextures({ textures }) {
    const milesRef = useRef();
    const moonRef = useRef();
    const donutRef = useRef();
    // const [last, setLast] = useState();

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

   //sets the scene background
   function SetBackGround() {
    const loader = new TextureLoader();
  
    const backgroundTexture = loader.load('/coolgradient.jpg');
    const {scene} = useThree();
  
    scene.background= backgroundTexture;
    return null;
  }
