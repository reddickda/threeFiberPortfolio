import * as THREE from 'three'
import { Canvas, useThree, useLoader, useFrame } from 'react-three-fiber';
import { MathUtils, TextureLoader } from 'three';
import { Suspense, useEffect } from 'react';

export default function App() {



  return (
      <Canvas camera={{ fov: 75, position: [-3, 0, 30] }} pixelRatio={window.devicePixelRatio}> 
        <SetBackGround />
        <pointLight position={[5,5,5]} color="0xffffff"/>
        <ambientLight intensity={0.2}/>
        {addStars()}
        <SetBackGround />
        <SetMilesTexture />
        <SetMoonTexture />
      </Canvas >
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

  const backgroundTexture = loader.load('/gridmountain.jpg');
  const {scene} = useThree();

  scene.background= backgroundTexture;
  return null;
}

function SetMilesTexture() {
  const loader = new TextureLoader();

  const milesTexture = loader.load('/miles.jpg');

  return(
    <mesh position={[2,0,-5]}>
      <boxBufferGeometry args={[3,3,3]}/>
      <meshBasicMaterial map={milesTexture} />
    </mesh>
  );
}

function SetMoonTexture() {
  const loader = new TextureLoader();

  const moonTexture = loader.load('/moon.jpg');
  const normalTexture = loader.load('/normal.jpg');

  return(
    <mesh position={[-10,0,20]}>
      <sphereBufferGeometry args={[3,32,32]}/>
      <meshStandardMaterial map={moonTexture} normalMap={normalTexture} />
    </mesh>
  )
}