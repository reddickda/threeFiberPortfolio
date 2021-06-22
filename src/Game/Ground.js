import { useRef } from 'react'

const GROUND_HEIGHT = -50; // A Constant to store the ground height of the game.

// A Ground plane that moves relative to the player. The player stays at 0,0
export function Ground() {
  const ground = useRef();

  return (
    <mesh
      visible
      position={[0, 0, 0]}
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