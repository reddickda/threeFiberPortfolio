import { useStore } from './GameStore';
//50 by 50 grid
//randomly space out uniformly
//moving place to positive only
//using poisson dist alg
//might eventually move collision logic here
export function Boxes(){  
    const boxes = useStore(state => state.boxes)
    return(<group>
      <mesh scale={[2,2,2]} position={boxes[0].pos}>
        <boxBufferGeometry />
        <meshStandardMaterial color={'red'}/>
      </mesh>
      <mesh scale={[2,2,2]} position={boxes[1].pos}>
        <boxBufferGeometry />
        <meshStandardMaterial color={'purple'}/>
      </mesh>
      <mesh scale={[2,2,2]} position={boxes[2].pos}>
        <boxBufferGeometry />
        <meshStandardMaterial color={'orange'}/>
      </mesh>
      <mesh scale={[2,2,2]} position={boxes[3].pos}>
        <boxBufferGeometry />
        <meshStandardMaterial color={'hotpink'}/>
      </mesh>
      <mesh scale={[2,2,2]} position={boxes[4].pos}>
        <boxBufferGeometry />
        <meshStandardMaterial color={'green'}/>
      </mesh>
      <mesh scale={[2,2,2]} position={boxes[5].pos}>
        <boxBufferGeometry />
        <meshStandardMaterial color={'blue'}/>
      </mesh>
      <mesh scale={[2,2,2]} position={boxes[6].pos}>
        <boxBufferGeometry />
        <meshStandardMaterial color={'yellow'}/>
      </mesh>
    </group>);
  }