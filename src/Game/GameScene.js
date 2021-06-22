import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useFrame, useThree } from "react-three-fiber";
import { Link } from "react-router-dom";
import { Lights } from "./Lights";
import { Ground } from "./Ground";
import Controls from "../Controls"; 
import { Sky } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Camera } from "three";

export default function ProceduralScene() {
  document.getElementById("main").style.display = "none";

  return (
    <div className="anim">
      <Canvas camera={{ position: [ -10,10,-9.5]}}>
        <gridHelper args={[50, 40, "blue", "hotpink"]}/>
        <fog attach="fog" args={["#041830", 10, 30]} />
        <Suspense
            fallback={<mesh></mesh>}
          ><Sky sunPosition={[0,50,0]} />
            <Ground />
            <Player />
            <directionalLight />
          <Controls />
        </Suspense>
      </Canvas>
      <Link to="/">
            <button id="homeButton" className="ui">Go Back Home</button>
      </Link>
    </div>
  );
}

function Player() {
  const player = useLoader(GLTFLoader, "/RobotExpressive.glb");
  const playerRef = useRef();
  const [running, setRunning] = useState(false);


  let mixer;
  let idle;
  let runningAnim;
  if (player.animations.length) {
      mixer = new THREE.AnimationMixer(player.scene);

      idle = mixer.clipAction(player.animations[4])
      runningAnim = mixer.clipAction(player.animations[6])
  }
console.log(running);
  useEffect(() => {
    //works but his feet dont return
    if(running) {
      idle.stop();
      runningAnim.reset();  
      // runningAnim.setLoop(THREE.LoopOnce, 1);
      runningAnim.clampWhenFinished = true;
      runningAnim.crossFadeFrom(idle, 0.2, true);
      runningAnim.play();
    }else {
      runningAnim.reset();  
      idle.time = 0.0;
      idle.enabled = true;
      idle.setEffectiveTimeScale(3.0);
      idle.setEffectiveWeight(1.0);
      idle.crossFadeFrom(runningAnim, 0.5, true);
      idle.play();
    }
  }, [running]);

  const {camera} = useThree();

  var goal, follow;

  var time = 0;
  var newPosition = new THREE.Vector3();
  var matrix = new THREE.Matrix4();
  
  var stop = 1;
  var DEGTORAD = 0.01745327;
  var temp = new THREE.Vector3;
  var dir = new THREE.Vector3;
  var a = new THREE.Vector3;
  var b = new THREE.Vector3;
  var coronaSafetyDistance = 0.3;
  var velocity = 0.0;
  var speed = 0.0;


  goal = new THREE.Object3D;
  follow = new THREE.Object3D;
  goal.position.z = -coronaSafetyDistance;

  let keys = {
    a: false,
    s: false,
    d: false,
    w: false
  };

  var fired = false;
  document.body.addEventListener( 'keydown', function(e) {
    
    var key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined && !fired)
      fired=true;
      keys[ key ] = true;
      if(key == 'w')
        setRunning(true);
  });
  document.body.addEventListener( 'keyup', function(e) {
    fired = false;
    var key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = false;
      setRunning(false);
  });
 

  useFrame((state, delta) => {
    mixer?.update(delta);
    camera.lookAt( playerRef.current.position );
   
    speed = 0.0;
  
    if ( keys.w ){       
      speed = .03;
    }
    else if ( keys.s )
      speed = -.03;
  
    velocity += ( speed - velocity ) * .3;
    playerRef.current.translateZ( velocity );
  
    if ( keys.a )
      playerRef.current.rotateY(0.05);
    else if ( keys.d )
      playerRef.current.rotateY(-0.05);
    
    a.lerp(playerRef.current.position, 0.4);
    b.copy(goal.position);
    
      dir.copy( a ).sub( b ).normalize();
      const dis = a.distanceTo( b ) - coronaSafetyDistance;
      goal.position.addScaledVector( dir, dis );
      // temp.setFromMatrixPosition(goal.matrixWorld);
      
      // camera.position.lerp(temp, 0.2);
      // camera.translateZ(velocity);

      camera.lookAt( playerRef.current.position );
      

    //console.log(camera.position)
})

  return(<Suspense
    fallback={<mesh></mesh>}
  >
    <primitive position={[0,0,0]} ref={playerRef} object={player.scene}></primitive>
    </Suspense>);
}

// function Camera(props) {
//   const ref = useRef()
//   const set = useThree(state => state.set)
//   // Make the camera known to the system
//   useEffect(() => void set({ camera: ref.current }), [])
//   // Update it every frame
//   useFrame(() => ref.current.updateMatrixWorld())
//   return <perspectiveCamera ref={ref} {...props} />
// }