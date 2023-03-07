import { FBM } from "three-noise";
import { useCallback, useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";

export default function HexTerrain() {
    const ref = useRef();
    // const fbm = useMemo(
    //     () =>
    //       new FBM({
    //         seed: Math.random(),
    //         lacunarity: .5 * 4,
    //         persistance: .25 * 2,
    //         // redistribution: generation.Contrast * 2,
    //       }),
    //   );
    // let radius = 5;
    // let gap = 1;
    //   const points = useMemo(() => {
    //     let pts = [];
    //     pts.push(new THREE.Vector3());
    //     let unit = gap * 0.176;
    
    //     let angle = Math.PI / 3;
    //     let axis = new THREE.Vector3(0, 0, 1);
    
    //     let axisVector = new THREE.Vector3(0, -unit, 0);
    //     let sideVector = new THREE.Vector3(0, unit, 0).applyAxisAngle(axis, -angle);
    //     let tempV3 = new THREE.Vector3();
    //     for (let seg = 0; seg < 6; seg++) {
    //       for (let ax = 1; ax <= radius; ax++) {
    //         for (let sd = 0; sd < ax; sd++) {
    //           tempV3
    //             .copy(axisVector)
    //             .multiplyScalar(ax)
    //             .addScaledVector(sideVector, sd)
    //             .applyAxisAngle(axis, angle * seg);
    
    //           pts.push(new THREE.Vector3().copy(tempV3));
    //         }
    //       }
    //     }
    //     return pts;
    //   }, [radius, gap]);
    

    //   const generate = useCallback(
    //     (scale) => {
    //       if (ref.current) {
    //         const mesh = ref.current;
    
    //         points.forEach((point, i) => {
    //           tempV4.position.copy(point);
    //           tempV4.scale.setScalar(0.01);
    
    //           if (scale) {
    //             tempV4.scale.multiplyScalar(scale);
    //           }
    
    //           tempV4.updateMatrix();
    
    //           const p = tempV4.position.clone().multiplyScalar(generation.Scale);
    //           let n = noise(p) * generation.Height;
    //           const c = color(n);
    
    //           if (n <= colors.Water.value) n = colors.Water.value;
    
    //           tempV4.scale.z *= 40 * n;
    
    //           tempV4.updateMatrix();
    //           mesh.setMatrixAt(i, tempV4.matrix);
    
    //           mesh.setColorAt(i, c);
    //         });
    //         mesh.instanceMatrix.needsUpdate = true;
    //         mesh.instanceColor.needsUpdate = true;
    //       }
    //     },
    //     [points, noise, color, colors, generation]
    //   );

    //   const { scale } = useSpring({
    //     scale: 1,
    //     onChange: ({ value: { scale } }) => {
    //       generate(scale);
    //     },
    //   });
    
    //   useEffect(() => {
    //     scale.start({ from: 0, to: 1 });
    //   }, []);
    
    //   useEffect(() => {
    //     generate();
    //   }, [generate]);
      return(
      <Canvas >
        <ambientLight />

      <group>
        {/* <instancedMesh
          castShadow
          receiveShadow
          ref={ref}
          args={[null, null, points.length]}
        >
          <extrudeGeometry />
          <meshPhongMaterial
            // shadowSide={FrontSide} //
            // side={FrontSide} //
          />
        </instancedMesh> */}
      </group></Canvas>)   
}