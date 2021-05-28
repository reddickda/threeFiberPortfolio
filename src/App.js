import { Suspense } from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import HomeScreen from './HomeScreen';
import ThreeDimensionalScene from './ThreeDimensionalScene';

export default function App() {

  return (
    <div>
      <Switch>
        {/* style the suspense fallback */}
        <Route path="/" exact> <Suspense fallback={<div>Loading...</div>}><HomeScreen/></Suspense></Route>
        <Route path="/three" exact> <ThreeDimensionalScene /></Route>
      </Switch>
    </div>
  );
}

// function HomeScreen() {

//   return (
//       <Canvas camera={{ fov: 75, position: [0, 0, 0] }} pixelRatio={window.devicePixelRatio}> 
//         <SetBackGround />
//         <pointLight position={[5,5,5]} color="0xffffff"/>
//         <ambientLight intensity={0.2}/>
//         {addStars()}
//         <SetBackGround />
//         <SetTextures />
//       </Canvas >
//   );
// }

// // creates 200 stars, adds them to a list and returns them all as a group
// function addStars() {
//   var stars = [];
//   for(var i=0; i < 200;i++) {
//     const [x,y,z] = Array(3).fill().map(() => MathUtils.randFloatSpread(100));
//     stars.push(<mesh position={[x,y,z]} key={i}>
//       <sphereBufferGeometry args={[.25,24,24]}/>
//       <meshStandardMaterial color="white"/>
//     </mesh>);
//   }

//   return (
//     <group>
//       {stars}
//     </group>
//   )
// }

// //sets the scene background
// function SetBackGround() {
//   const loader = new TextureLoader();

//   const backgroundTexture = loader.load('/coolgradient.jpg');
//   const {scene} = useThree();

//   scene.background= backgroundTexture;
//   return null;
// }

// //sets the moon and miles textures in the sphere and cube
// //sets rotation with scrolling on body
// function SetTextures() {
//   const milesRef = useRef();
//   const moonRef = useRef();
//   const { camera } = useThree();

//   // const loader = new TextureLoader();

//   // const milesTexture = loader.load('/miles.jpg');
//   // const moonTexture = loader.load('/moon.jpg');
//   // const normalTexture = loader.load('/normal.jpg');

//    document.body.onscroll = () => {
//     const t = document.body.getBoundingClientRect().top;
//     moonRef.current.rotation.x += 0.05;
//     moonRef.current.rotation.y += 0.075;
//     moonRef.current.rotation.z += 0.05;

//     milesRef.current.rotation.y += .01;
//     milesRef.current.rotation.z += .01;

//     camera.position.z = t * -0.01;
//     camera.position.x = t * -0.0002;
//     camera.rotation.y = t * -0.0002;
//   };

//   return(
//     <>
//     <mesh ref={milesRef} position={[2,0,-10]}>
//       <boxBufferGeometry args={[3,3,3]}/>
//       <meshBasicMaterial map={milesTexture} />
//     </mesh>
//     <mesh ref={moonRef} position={[-10,0,20]}>
//     <sphereBufferGeometry args={[3,32,32]}/>
//     <meshStandardMaterial map={moonTexture} normalMap={normalTexture} />
//   </mesh>
//   </>
//   );
// }
