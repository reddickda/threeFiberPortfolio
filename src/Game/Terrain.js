import React from "react";
import { useFrame, useUpdate } from "react-three-fiber";
import { noise } from "./Perlin"
import * as THREE from "three";
import * as SimplexNoise from "simplex-noise"
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
// Attempt at procudural generation of terrain based off noise
export function Terrain() {

    // const mesh = useUpdate(({ geometry }) => {
    //     noise.seed(2);
    //     let pos = geometry.getAttribute("position");
    //     let pa = pos.array;
    //     const hVerts = geometry.parameters.heightSegments + 1;
    //     const wVerts = geometry.parameters.widthSegments + 1;
    //     for (let j = 0; j < hVerts; j++) {
    //       for (let i = 0; i < wVerts; i++) {
    //         const ex = 2;
    //         //each noise is using octaves
    //         pa[3 * (j * wVerts + i) + 2] =
    //           (noise.perlin2(i / 100, j / 100) +
    //             noise.perlin2((i + 200) / 50, j / 50) * Math.pow(ex, 1) +
    //             noise.perlin2((i + 400) / 25, j / 25) * Math.pow(ex, 2) +
    //             noise.perlin2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3) +
    //             +(noise.perlin2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 3))) /
    //           2;
    //       }
    //     }
    // const colors = [];

    //     //loop through each vertex, its a buffer so x,y,z all in a single array
    //     //+3 to go to each new group of 3 vertices
    //     //i+2 gets the z coord
    //     //assign color based on height
    //     //normal grass and water biom
    //     for(let i=0;i < pa.length; i+=3) {
    //         if(pa[i+2] > 2){
    //             colors.push(0,0.7,0.5)//light green
    //         }
    //         else if(pa[i+2] > 1 && pa[i+2] < 2) {
    //             colors.push(0,0.2,0.2)// reg green
    //         }
    //         else if(pa[i+2] > 0 && pa[i+2] < 1) {
    //             colors.push(0,0.4,0.1) //dark green
    //         }
    //         else{
    //             colors.push(0,0.8,1) //blue
    //         }
    //     }

    //     geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    
    //     pos.needsUpdate = true;
    //   });

  const mesh = useUpdate(({geometry}) => {
    let simplex = new SimplexNoise(7);

    function map(val, smin, smax, emin, emax) {
      const t = (val-smin)/(smax-smin);
      return (emax-emin)*t + emin;
    }
    
    function remapNoise(nx, ny) {
      //remap from -1 to 1 to 0 to 1
      return map(simplex.noise2D(nx, ny), -1,1,0,1);
    }
    
    function octave(nx, ny, octaves) {
      let val = 0;
      let freq = 1;
      let max = 0;
      let amp = 1;
      for(let i=0; i<octaves;i++) {
        val+= remapNoise(nx*freq,ny*freq)*amp;
        max += amp;
        amp /=2;
        freq *=2;
      }
      return val/max;
    }
    
    function generateTexture() {
      // const canvas = document.createElement('canvas');
      const canvas = document.getElementById('debug-canvas');
      const c = canvas.getContext('2d');
      // canvas.width = 48;
      // canvas.height = 48;
      c.fillstyle = 'black';
      c.fillRect(0,0,canvas.width, canvas.height);
    
      for(let i=0; i<canvas.width; i++) {
        for(let j=0; j< canvas.height; j++) {
          let v = octave(i/canvas.width, j/canvas.height, 16);
          const per = (100*v).toFixed(2) + '%';
          c.fillStyle = `rgb(${per}, ${per}, ${per})`
          c.fillRect(i,j,1,1);
        }
      }
      return c.getImageData(0,0,canvas.width, canvas.height);
    }

    let texture = generateTexture();
    // BufferGeometryUtils.mergeVertices(geometry);
    var nonindex = geometry.toNonIndexed();
    let pos = geometry.getAttribute("position");
    let pa = pos.array;
    const gHeight =geometry.parameters.height;
    const gWidth = geometry.parameters.width;
    const hVerts = geometry.parameters.heightSegments + 1;
    const wVerts = geometry.parameters.widthSegments + 1;

    for (let j = 0; j < hVerts; j++) {
      for (let i = 0; i < wVerts; i++) {
        const n = (j*(hVerts)+i);
        const nn = (j*(hVerts+1)+i);
        const col = texture.data[n*4];
        pa[3 * (j * wVerts + i) + 2] = map(col,0,255,-13,10)

        // const v1 = pa[nn];
        //v1.z = map(col,0,255,-10,10);
        // if(pa[3 * (j * wVerts + i) + 2] > 2.5) pa[3 * (j * wVerts + i) + 2] *=1.3;
         if(pa[3 * (j * wVerts + i) + 2] < 0) pa[3 * (j * wVerts + i) + 2] = -.4;
      }
    }

    // for (let j = 0; j < texture.data.height; j++) {
    //   for (let i = 0; i < texture.data.width; i++) {
    //     const n = (j*(texture.data.height)+i);
    //     const nn = (j*(texture.data.height+1)+i);
    //     const col = texture.data[n*4];
    //     const v1 = pa[nn];
    //     v1.z = map(col,0,255,-10,10);
    //     if(v1.z > 2.5) v1.z *=1.3;
    //   }
    // }

      const colors = [];

        //loop through each vertex, its a buffer so x,y,z all in a single array
        //+3 to go to each new group of 3 vertices
        //i+2 gets the z coord
        //assign color based on height
        //normal grass and water biom
        for(let i=0;i < pa.length; i+=3) {

          if(pa[(i)+2] == -.5 ) colors.push(0,0.8,1);

          else if(pa[(i)+2] < .5) colors.push(0.7,0.5,0.3);

          else if(pa[(i)+2] < 3) colors.push(0,0.2,0.2);

          else if(pa[(i)+2] < 5)  colors.push(0,0.7,0.5);

          else{
            colors.push(0.7,1,1)//light gree
          }
        }
        geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    pos.needsUpdate = true;
  });

  // Raf loop
  useFrame(() => {
    // mesh.current.rotation.z += 0.01;
  });


// var poop = new THREE.GeometryUtils.from;

  return (
    <group>
        <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry attach="geometry" args={[50, 50, 30, 30]} />
        <meshLambertMaterial 
            vertexColors={true}
            attach="material"
            flatShading
            // wireframe
            // side={THREE.DoubleSide}
        />
        </mesh>
    </group>
  );
};