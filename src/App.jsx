
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

// Each feature has its own name and description.
// Tomorrow, we'll add camera positions here too.
const features = [
  {
    id: 'overview',
    number: '01',
    label: 'Overview',
    description:
      'A public furniture concept exploring shared space between humans and urban wildlife, integrating comfort, sensing, and habitat features.'
  },
  {
    id: 'bench',
    number: '02',
    label: 'Bench',
    description:
      'Integrated seating creates a place for people to rest, observe, and experience the surrounding environment.'
  },
  {
    id: 'sensor',
    number: '03',
    label: 'Bat Sensor',
    description:
      'A proposed sensing system intended to support awareness and observation of bat activity around the structure.'
  },
  {
    id: 'habitat',
    number: '04',
    label: 'Bat Habitat',
    description:
      'Sheltered vertical panels explore how public furniture could incorporate spaces intended for bats.'
  },
  {
    id: 'canopy',
    number: '05',
    label: 'Canopy',
    description:
      'Two sweeping concrete surfaces create a distinctive silhouette, supported by an integrated timber structure.'
  }
]

function Pavilion() {
  const { scene } = useGLTF('/models/SemaModel.glb')

  return <primitive object={scene} />
}

function App() {
  const [activeId, setActiveId] = useState('overview')

  const activeFeature = features.find(
    (feature) => feature.id === activeId
  )

  return (
    <main className="showcase">

      {/* Our existing 3D scene */}
      <div className="scene">
        <Canvas camera={{ position: [5, 3.5, 6], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={2}
          />

          <Pavilion />

          <OrbitControls target={[0, 1.2, 0]} />
        </Canvas>
      </div>

      {/* Interface above the 3D scene */}
      <div className="interface">

        {/* Top-left identity */}
        <header className="site-header">
          <div className="eyebrow">
            <span>TU/e · SeMa Squad</span>
            <span className="accent-line"></span>
          </div>

          <h1>More Than Human</h1>
          <p>Interactive Prototype Showcase</p>
        </header>

        {/* Top-right prototype label */}
        <div className="prototype-label">
          <span className="prototype-symbol">◇</span>

          <div>
            <span className="small-label">
              CURRENT PROTOTYPE
            </span>
            <p>01 / Shared Habitat</p>
          </div>
        </div>

        {/* Feature navigation */}
        <nav className="feature-navigation" aria-label="Explore features">
          {features.map((feature) => (
            <button
              key={feature.id}
              type="button"
              className={`nav-button ${
                activeId === feature.id ? 'active' : ''
              }`}
              aria-pressed={activeId === feature.id}
              onClick={() => setActiveId(feature.id)}
            >
              <span className="nav-number">
                {feature.number}
              </span>
              <span>{feature.label}</span>
            </button>
          ))}
        </nav>

        {/* Changing information panel */}
        <section
          className="info-panel glass"
          aria-live="polite"
          key={activeFeature.id}
        >
          <div className="info-heading">
            <h2>{activeFeature.label}</h2>
            <span className="accent-line"></span>
          </div>

          <p>{activeFeature.description}</p>
        </section>

        {/* Bottom-left interaction hint */}
        <div className="interaction-hint">
          <span className="mouse-icon"></span>
          <span>Drag to explore · Scroll to zoom</span>
        </div>

      </div>
    </main>
  )
}

export default App
