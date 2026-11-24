
import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraControls, useGLTF } from '@react-three/drei'

// -----------------------------------------
// FEATURE DATA
// -----------------------------------------

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

// -----------------------------------------
// CAMERA PRESETS
// Your five manually captured positions
// -----------------------------------------

const cameraPresets = {
  overview: {
    position: [3.713, 2.244, 5.132],
    target: [0, 1.2, 0]
  },
  bench: {
    position: [5.129, 1.591, 2.667],
    target: [0, 1.2, 0]
  },
  sensor: {
    position: [0.865, 1.354, 1.678],
    target: [0, 1.2, 0]
  },
  habitat: {
    position: [-1.961, 3.27, 1.629],
    target: [0, 1.2, 0]
  },
  canopy: {
    position: [1.168, 3.183, -4.175],
    target: [0, 1.2, 0]
  }
}

// -----------------------------------------
// 3D PAVILION + FLOATING ANIMATION
// -----------------------------------------

function Pavilion() {
  const { scene } = useGLTF('/models/SemaModel.glb')
  const group = useRef(null)

  useFrame((state) => {
    if (!group.current) return

    const time = state.clock.elapsedTime

    group.current.position.y =
      Math.sin(time * 0.8) * 0.08
  })

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}

// -----------------------------------------
// CAMERA CONTROLLER
// -----------------------------------------

function CameraRig({ controlsRef }) {
  useEffect(() => {
    const controls = controlsRef.current

    if (!controls) return

    const preset = cameraPresets.overview

    // Start at our chosen overview position
    controls.setLookAt(
      ...preset.position,
      ...preset.target,
      false
    )
  }, [controlsRef])

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      smoothTime={0.9}
    />
  )
}

// -----------------------------------------
// MAIN APPLICATION
// -----------------------------------------

function App() {
  const [activeId, setActiveId] = useState('overview')
  const cameraControlsRef = useRef(null)

  const activeFeature = features.find(
    (feature) => feature.id === activeId
  )

  // ---------------------------------------
  // CAMERA NAVIGATION
  // ---------------------------------------

  const moveToFeature = (featureId) => {
    // Update the interface
    setActiveId(featureId)

    // Find the camera preset
    const preset = cameraPresets[featureId]
    const controls = cameraControlsRef.current

    if (!preset || !controls) return

    // Smoothly animate to the selected view
    controls.setLookAt(
      ...preset.position,
      ...preset.target,
      true
    )
  }

  // ---------------------------------------
  // APPLICATION LAYOUT
  // ---------------------------------------

  return (
    <main className="showcase">

      {/* 3D SCENE */}
      <div className="scene">
        <Canvas
          camera={{
            position: cameraPresets.overview.position,
            fov: 45
          }}
        >
          <ambientLight intensity={1.5} />

          <directionalLight
            position={[5, 8, 5]}
            intensity={2}
          />

          <Pavilion />

          <CameraRig controlsRef={cameraControlsRef} />
        </Canvas>
      </div>

      {/* USER INTERFACE */}
      <div className="interface">

        {/* TOP-LEFT TITLE */}
        <header className="site-header">
          <div className="eyebrow">
            <span>TU/e · SeMa Squad</span>
            <span className="accent-line"></span>
          </div>

          <h1>More Than Human</h1>
          <p>Interactive Prototype Showcase</p>
        </header>

        {/* TOP-RIGHT PROTOTYPE LABEL */}
        <div className="prototype-label">
          <span className="prototype-symbol">◇</span>

          <div>
            <span className="small-label">
              CURRENT PROTOTYPE
            </span>
            <p>01 / Shared Habitat</p>
          </div>
        </div>

        {/* FEATURE NAVIGATION */}
        <nav
          className="feature-navigation"
          aria-label="Explore features"
        >
          {features.map((feature) => (
            <button
              key={feature.id}
              type="button"
              className={`nav-button ${
                activeId === feature.id ? 'active' : ''
              }`}
              aria-pressed={activeId === feature.id}
              onClick={() => moveToFeature(feature.id)}
            >
              <span className="nav-number">
                {feature.number}
              </span>

              <span>{feature.label}</span>
            </button>
          ))}
        </nav>

        {/* DYNAMIC INFORMATION PANEL */}
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

        {/* BOTTOM-LEFT INTERACTION HINT */}
        <div className="interaction-hint">
          <span className="mouse-icon"></span>
          <span>Drag to explore · Scroll to zoom</span>
        </div>

      </div>
    </main>
  )
}

export default App
