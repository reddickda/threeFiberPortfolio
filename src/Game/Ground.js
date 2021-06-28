import { useRef } from 'react'

export function Ground() {
  const ground = useRef();

  return (
    <mesh
      visible
      position={[24, 0, 24]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={ground}
    >
      <planeBufferGeometry attach="geometry" args={[50, 50, 24, 24]} />
      <meshStandardMaterial
        attach="material"
        color="grey"
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}