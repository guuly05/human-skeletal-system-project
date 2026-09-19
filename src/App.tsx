import AnatomyCanvas from './components/AnatomyCanvas';
import { DetailsPanel, Header, SimulationPanel, SystemPanel } from './components/Interface';

export default function App() {
  return <main className="app-shell">
    <Header />
    <section className="workspace">
      <SystemPanel />
      <section className="viewer-wrap">
        <div className="viewer-label"><span className="live-dot" /> Whole body · anterior view <span className="viewer-hint">Drag to rotate · Scroll to zoom</span></div>
        <div className="viewer"><AnatomyCanvas /><div className="axis"><span>Y</span><i /><span>X</span></div><div className="viewer-footer"><span>Prototype anatomy assets</span><span>Replaceable with licensed high-fidelity models</span></div></div>
      </section>
      <DetailsPanel />
    </section>
    <SimulationPanel />
  </main>;
}
