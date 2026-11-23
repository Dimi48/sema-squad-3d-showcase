
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Pavilion() {
  const { scene } = useGLTF('/models/SemaModel.glb')

  return <primitive object={scene} />
}

function App() {
  return (
    <div className="viewer">
      <Canvas camera={{ position: [5, 3.5, 6], fov: 45 }}>

        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={2} />

        <Pavilion />

        <OrbitControls target={[0, 1.2, 0]} />

      </Canvas>
    </div>
  )
}

export default App
