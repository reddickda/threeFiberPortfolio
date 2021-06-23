/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three'

const baseHandFeet = [0, 2.37, -0.02];
let boxPositions = [
  {pos:[13,.5,1], hit:false},
  {pos:[-15,.5,11],hit: false}, 
  {pos:[5,.5,18], hit: false},
  {pos:[1,.5,5], hit: false}, 
  {pos:[18,.5,-18], hit: false},
  {pos:[1,.5,-5], hit: false}, 
  {pos:[-12,.5,-15], hit: false}]

export function Robot(props) {
  const group = useRef()
  const [running, setRunning] = useState(false);
  const { nodes, materials, animations } = useGLTF('/RobotExpressive.glb')
  //Dance, Death Idle, Jump, No, Punch, Running, Sitting, Standing, Thumbsup
  const { actions } = useAnimations(animations, group)
  const {camera} = useThree();
  document.getElementById("forward").onclick = () => {
    if(running){
      keys['w'] = false;
      setRunning(false);
    }else{
      keys['w'] = true;
      setRunning(true)
    }
  }

  document.getElementById("left").onclick = () => {
    group.current.rotateY(.7)
  }

  document.getElementById("right").onclick = () => {
    group.current.rotateY(-.7)
  }

  const { setScore, score } = props;

  useEffect(() => {
    if(!running){
      actions.Running.stop();
      actions.Idle.time = 0.0;
      actions.Idle.enabled = true;
      actions.Idle.setEffectiveTimeScale(1.0);
      actions.Idle.setEffectiveWeight(1.0);
      // actions.Idle.crossFadeFrom(actions.Running, 0.5, true);
      actions.Idle.play();
    }else if(running){
      actions.Idle.stop();
      actions.Running.play();
    }

    let currPos = group.current.position;
    boxPositions.forEach(element => {
      if(distance(currPos, element.pos) < 3 && element.hit == false){
        console.log("hit");
        let newScore = score + 1;
        setScore(newScore);
        element.hit = true;
      }
    });
  }, [running]);

  var goal, follow;

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
    w: false,
    space: false
  };

  document.body.addEventListener( 'keydown', function(e) {
    if (e.repeat) { return }
    var key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined){
      if(key=='w'){
        setRunning(true)  
      }
      keys[ key ] = true;
    }
  });
  document.body.addEventListener( 'keyup', function(e) {
    // fired = false;
    if (e.repeat) { return }
    var key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = false;
      if(key == 'w'){
        setRunning(false);
      }
  });
  console.log(running)

  useFrame((state, delta) => {
    // mixer?.update(delta);
    camera.lookAt( group.current.position );
    
    speed = 0.0;
  
    if ( keys.w || running){  
      speed = .03;
    }
    // else if ( keys.s)
    //   speed = -.03;
   
    velocity += ( speed - velocity ) * .3;
    group.current.translateZ( velocity );
  
    if ( keys.a ){
      group.current.rotateY(0.05);
    }
    else if ( keys.d ){
      group.current.rotateY(-0.05);
    }
    if( keys.space) {
    }
    
    a.lerp(group.current.position, 0.4);
    b.copy(goal.position);
    
      dir.copy( a ).sub( b ).normalize();
      const dis = a.distanceTo( b ) - coronaSafetyDistance;
      goal.position.addScaledVector( dir, dis );
      // temp.setFromMatrixPosition(goal.matrixWorld);
      
      // camera.position.lerp(temp, 0.2);
      // camera.translateZ(velocity);

      camera.lookAt( group.current.position );
      // console.log(group.current.position)
     
    //console.log(camera.position)
})

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <primitive object={nodes.Bone} />
      </group>
      <group position={[0, 2.37, -0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <skinnedMesh
          geometry={nodes.HandR_1.geometry}
          material={nodes.HandR_1.material}
          skeleton={nodes.HandR_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.HandR_2.geometry}
          material={nodes.HandR_2.material}
          skeleton={nodes.HandR_2.skeleton}
        />
      </group>
      <group position={[0, 2.37, -0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <skinnedMesh
          geometry={nodes.HandL_1.geometry}
          material={nodes.HandL_1.material}
          skeleton={nodes.HandL_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.HandL_2.geometry}
          material={nodes.HandL_2.material}
          skeleton={nodes.HandL_2.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/RobotExpressive.glb')

function distance(p1, p2) {
  
  const a = p2[0] - p1.x;
  const b = p2[1] - p1.y;
  const c = p2[2] - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
}