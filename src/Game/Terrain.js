import React from "react";
import { useFrame, useUpdate } from "react-three-fiber";
import { noise } from "./Perlin"
import * as THREE from "three";

// Attempt at procudural generation of terrain based off noise
export function Terrain() {

    const mesh = useUpdate(({ geometry }) => {
        noise.seed(Math.random());
        let pos = geometry.getAttribute("position");
        let pa = pos.array;
        const hVerts = geometry.parameters.heightSegments + 1;
        const wVerts = geometry.parameters.widthSegments + 1;
        for (let j = 0; j < hVerts; j++) {
          for (let i = 0; i < wVerts; i++) {
            const ex = 1.1;
            pa[3 * (j * wVerts + i) + 2] =
              (noise.simplex2(i / 100, j / 100) +
                noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1) +
                noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 2) +
                noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3) +
                +(noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4))) /
              2;
          }
        }

        const colors = [];

        //loop through each vertex, its a buffer so x,y,z all in a single array
        //+3 to go to each new group of 3 vertices
        //i+2 gets the z coord
        //assign color based on height
        //normal grass and water biom
        for(let i=0;i < pa.length; i+=3) {
            if(pa[i+2] > .15){
                colors.push(0,0.7,0.5)
            }
            else if(pa[i+2] > 0) {
                colors.push(0,0.4,0.1)
            }else{
                colors.push(0,0,0.5)
            }
        }

        geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    
        pos.needsUpdate = true;
      });

  // Raf loop
  useFrame(() => {
    //mesh.current.rotation.z += 0.01;
  });

  return (
    <group>
        <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[25, 25, 128, 128]} />
        <meshPhongMaterial
            vertexColors={THREE.VertexColors}
            attach="material"
            // smoothShading
            // side={THREE.DoubleSide}
        />
        </mesh>
    </group>
  );
};

//ideal
//check position of camera
//if outside of bounds of terrain
//generate a new terrain
//generate a lot
    //check which terrain youre in
    //generate all surrounding ones
//100 squares at eye level to get to horizon
//implement a quadtree
//root node, insert camera
//check distance from root node to camera and if its less than a threshold then split into 4
//recurse until nodes are too small
//every freame generate a quadtree and insert camera
//get every leaf node - no childnre
//compare chunks to what we already have
//create new terrain chunks with new ones
    //give it a list of terrain chunks to be build and spread over a bunch of frames
    // threejs generator
    //keep a pool of re used teraain chunks (recycle)

//for now, just create a bunch of chunks
