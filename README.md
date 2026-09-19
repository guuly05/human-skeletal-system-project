# Savana Human Atlas

Savana Human Atlas is an ambitious, web-first 3D anatomy laboratory for exploring the human body system by system.

The goal is to make anatomy feel spatial, alive, and understandable: users should be able to rotate through the body, reveal layers, select individual structures, learn what they do, and watch educational simulations explain how systems work together.

> This project is an educational visualization platform. It is not a diagnostic tool and does not replace a qualified medical professional, anatomy textbook, or clinical training.

## Vision

Savana Human Atlas is being designed around one connected digital human rather than a collection of disconnected illustrations.

Users will eventually be able to:

- Explore skeletal, muscular, nervous, cardiovascular, respiratory, digestive, endocrine, urinary, reproductive, lymphatic, immune, and integumentary systems.
- Rotate, pan, zoom, focus, isolate, hide, fade, and explode anatomical layers.
- Select structures ranging from complete systems to individual bones, muscles, vessels, nerves, valves, and organs.
- Search using common names, anatomical names, and synonyms.
- View cross-sections, clipping planes, transparent layers, and x-ray-style modes.
- Read explanations covering structure, location, function, relationships, and clinical context.
- Watch educational animations of heartbeat, breathing, muscle contraction, digestion, blood flow, and neural signaling.
- Follow guided lessons, complete quizzes, save views, and track learning progress.
- Compare reference anatomy models and eventually explore healthy versus diseased anatomy.
- Use the atlas on the web, mobile devices, large displays, and eventually in VR/AR.

## Current status

The repository currently contains the first vertical-slice prototype.

Implemented:

- React and TypeScript application shell
- Three.js / React Three Fiber 3D viewer
- Orbit camera controls
- Skeletal, muscular, nervous, cardiovascular, and respiratory layers
- Clickable prototype anatomical structures
- Selected-structure information panel
- System visibility toggles
- Adjustable heart-rate and breathing-rate controls
- Play/pause physiology preview
- Responsive layout for smaller screens
- Replaceable procedural assets ready for future GLB/glTF models

The current body is intentionally lightweight procedural geometry. It is a product and interaction prototype, not the final medical asset library. This lets the application architecture, learning experience, and simulation controls be developed before high-resolution anatomy assets are produced and reviewed.

## Product architecture

```text
                    Savana Human Atlas
                            |
       +--------------------+--------------------+
       |                    |                    |
  3D Viewer            Learning Layer       Simulation Layer
       |                    |                    |
  GLB/glTF assets      Lessons and quizzes   Fast physiology models
  System layers        Explanations          Server simulations
  Selection            Search                Flow/pressure fields
  Cross-sections       Progress              Future biomechanics
       |
  Anatomy Content Graph
       |
  Structures, synonyms, relationships, sources, licenses, review status
```

The core design principle is separation of content, rendering, learning, and simulation. High-quality anatomy assets can be added later without rewriting the interface or the underlying selection system.

## Technology stack

### Current frontend

- React 19
- TypeScript
- Vite
- Three.js
- React Three Fiber
- Drei
- Zustand
- Lucide React

### Planned 3D asset pipeline

- Blender, ZBrush, Houdini, or specialist medical-illustration workflows for production assets
- 3D Slicer for CT/MRI segmentation and medical-image preparation
- glTF/GLB as the runtime asset format
- KTX2/Basis textures for compressed materials
- Meshopt or Draco compression
- Separate levels of detail for high-, medium-, and low-performance devices

### Planned backend

- FastAPI and Python
- PostgreSQL for anatomy metadata and relationships
- Object storage for large models, textures, and simulation results
- CDN delivery for streamed assets
- Redis and a job queue for long-running simulation tasks
- Search service for anatomy names, synonyms, and educational content

### Planned simulation technologies

The simulation system will be layered instead of pretending that every biological process needs the same level of computation.

1. Visual animation — keyframes, procedural animation, shaders, and particles.
2. Educational physiology — lightweight models for heart rate, breathing, blood pressure, oxygen movement, and muscle activity.
3. Advanced biomechanics — server-side or native simulations for deformation, tissue mechanics, cardiac activation, and blood flow.

Future research integrations may include SOFA for interactive biomechanics, FEBio for nonlinear biomechanics, and SimVascular for vascular and cardiovascular modeling. Any advanced simulation must be clearly labeled according to its validation level.

## Asset and scientific-content policy

Every anatomy asset and explanation should carry provenance information:

- Anatomical identifier
- Common name and formal name
- Synonyms
- Parent and related structures
- Source dataset or artist
- License and attribution requirements
- Version number
- Medical review status
- Last review date

Potential reference sources include the Open Anatomy Project, BodyParts3D, the NIH Visible Human Project, NIH 3D, and Human Reference Atlas resources. Each source must be checked individually for licensing, attribution, and permitted redistribution before being included in a public release.

AI-generated models may be useful for early concept art or interface placeholders. They should not be treated as medically accurate final anatomy without expert review and source verification.

## Roadmap

### Phase 1 — Product foundation

- Improve selection feedback and hover states
- Add search and anatomy navigation
- Add isolate, hide, ghost, focus, and reset actions
- Add a structured anatomy-content schema
- Add an asset manifest with source and license metadata
- Add a GLB loader boundary so final models can replace prototype geometry
- Add automated asset validation

### Phase 2 — Chest vertical slice

The first high-value production slice will focus on the chest:

- Heart
- Lungs
- Rib cage
- Major arteries and veins
- Trachea and bronchi
- Esophagus
- Spinal cord and major nerves
- Thoracic muscles

This slice will include chamber-level heart animation, valve states, breathing motion, basic circulation visualization, cross-sections, and a guided lesson explaining how blood travels through the heart and lungs.

### Phase 3 — Whole-body anatomy

- Add major organs and systems
- Add more complete skeletal and muscular coverage
- Add major nerves and vasculature
- Add male and female reference variants
- Add regional anatomy views
- Add anatomical synonyms and relationships

### Phase 4 — Learning platform

- Guided journeys
- Quizzes and flashcards
- Saved views and bookmarks
- Audio pronunciation
- Multiple languages
- Accessibility modes
- Student progress
- Teacher and classroom tools

### Phase 5 — Simulation platform

- Local physiology models
- Server-side simulation jobs
- Flow, pressure, strain, and activation visualization
- Disease progression modules
- Surgical and treatment visualizations
- Expert authoring tools

### Phase 6 — Immersive editions

- WebXR
- VR anatomy laboratory
- AR exploration
- Native high-fidelity client for classrooms and medical training labs
- Optional haptics and multi-user sessions

## Development

### Requirements

- Node.js 20 or newer
- npm
- A modern browser

The project is designed to remain accessible from a lower-spec laptop during the early phases. Heavy asset processing and advanced simulations will eventually move to cloud or dedicated workstations.

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Create production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Contribution workflow

The project should grow in small, reviewable increments.

1. Choose one feature or content area.
2. Keep anatomy data separate from rendering logic.
3. Add source and license information for new assets.
4. Test desktop and narrow-screen layouts.
5. Run `npm run build` before committing.
6. Use a clear commit message describing the change.

Suggested commit prefixes:

- `feat:` for a new capability
- `content:` for anatomy or educational content
- `asset:` for 3D models and textures
- `sim:` for simulation behavior
- `ui:` for interface changes
- `fix:` for bug fixes
- `docs:` for documentation

## Project principles

- Scientific honesty over exaggerated claims
- High visual quality with graceful performance fallbacks
- Content provenance for every model and explanation
- Replaceable assets and modular simulation services
- Accessibility for learners with different devices and abilities
- Clear separation between educational visualization and clinical software

## License

The application code is currently under project development and does not yet declare a final open-source license. Third-party anatomy assets may have separate licenses and attribution requirements. No third-party model should be redistributed until its license has been verified.

## Name

The project is called **Savana Human Atlas**.
