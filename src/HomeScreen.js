import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber';
import { MathUtils, TextureLoader } from 'three';
import { useRef, useEffect, useMemo } from 'react';
import {
  useHistory
} from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default function HomeScreen() {
  //history needs to be highest level component
  const history = useHistory();

  return(
  <Canvas pixelRatio={window.devicePixelRatio} camera={{position:[0,0,50], fov:75} } >
    <Content history={history}/>
  </Canvas>);
}

function Content( { history }) {
  
  const donut = useLoader(GLTFLoader, "/doughnut-P2b.glb");

  const cameraRef = useRef();
  const { set, size } = useThree();

  useEffect(() => {
    set(cameraRef.current)}, [])
  useFrame(() => cameraRef.current.updateMatrixWorld())

  //sets html to be rendered
  document.getElementById("main").style.display = null;

  //looks for 'three' which is a button and changes the route to change scene
  document.getElementById("three").onclick = () => {
    history.push("/three");
  }
    return (
        <>
        <perspectiveCamera 
          ref={cameraRef} 
          aspect={size.width / size.height}
          radius={(size.width + size.height) / 4}
          onUpdate={self => self.updateProjectionMatrix()}/>
        <MainScene />
        <HeadsUpDisplay />
        </>
    );
   }

   function MainScene() {
    const milesTexture = useLoader(TextureLoader, '/miles.jpg');
    const moonTexture = useLoader(TextureLoader, '/moon.jpg');
    const normalTexture = useLoader(TextureLoader, '/normal.jpg');
    // const backgroundTexture = loader.load('/coolgradient.jpg');
    const backgroundTexture = useLoader(TextureLoader, "/coolgradient.jpg")

    const sceneRef = useRef()
    const { camera } = useThree()
    if(sceneRef.current != undefined) {
      // sceneRef.current.background = backgroundTexture;
    }

    useFrame(({ gl }) => void ( gl.render(sceneRef.current, camera)), 100)

     return(
       <scene ref={sceneRef}>
        <pointLight position={[5,5,5]} color="0xffffff"/>
        <ambientLight intensity={0.2}/>
        {addStars()}
        <SetTextures textures={[milesTexture, moonTexture, normalTexture]}/>
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

  function HeadsUpDisplay() {
    const sceneRef = useRef()
    const { camera } = useThree()

    // const sceneMemoized = useMemo(() => {
    //   const scene = new THREE.Scene();
    //   const geometry = new THREE.CircleGeometry(1, 32);
    //   const material = new THREE.MeshBasicMaterial({ color: "red" });
    //   const mesh = new THREE.Mesh(geometry, material);
    //   mesh.position.set(0,0-10);
    //   scene.add(mesh);
    //   return scene;}, []
    // );

    // useEffect(() => {
    //   if (sceneRef.current) {
    //     sceneRef.current.copy(sceneMemoized, true);
    //     sceneRef.current.updateMatrixWorld(true);
    //     console.log(sceneRef.current);
    //   }
    // }, []);
    console.log(sceneRef.current);
    useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(sceneRef.current, camera)), 10)
    return <scene ref={sceneRef} position={[0,0,10]}>
      <mesh position={[0,0,0]}>
        <boxBufferGeometry  attach="geometry" args={[3,3,3]} />
        <meshStandardMaterial color={"orange"}
        />
      </mesh>
      <ambientLight />
    </scene>
  }