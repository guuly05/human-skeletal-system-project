import { Activity, Brain, Bone, CircleDot, HeartPulse, Info, Pause, Play, RotateCcw, Search, Wind } from 'lucide-react';
import { anatomyParts, systems } from '../data/anatomy';
import { useAnatomyStore } from '../store/useAnatomyStore';

const icons = { skeletal: Bone, muscular: Activity, nervous: Brain, cardiovascular: HeartPulse, respiratory: Wind };

export function Header() {
  return <header className="topbar">
    <div className="brand"><div className="brand-mark"><CircleDot size={16} /></div><div><span className="eyebrow">Interactive anatomy laboratory</span><h1>Savana Human <span>Atlas</span></h1></div></div>
    <div className="topbar-meta"><span className="live-dot" /> Prototype 0.1 <button className="icon-button" title="Reset view" onClick={() => useAnatomyStore.getState().reset()}><RotateCcw size={16} /></button></div>
  </header>;
}

export function SystemPanel() {
  const activeSystems = useAnatomyStore((state) => state.activeSystems);
  const toggleSystem = useAnatomyStore((state) => state.toggleSystem);
  return <aside className="panel system-panel">
    <div className="panel-heading"><div><span className="eyebrow">Explore</span><h2>Body systems</h2></div><span className="count-badge">05</span></div>
    <p className="muted">Toggle layers to reveal how the body works as one connected system.</p>
    <div className="system-list">{systems.map((system) => {
      const Icon = icons[system.id];
      const isActive = activeSystems[system.id];
      return <button className={`system-row ${isActive ? 'active' : ''}`} key={system.id} onClick={() => toggleSystem(system.id)}>
        <span className="system-icon" style={{ color: system.color, background: `${system.color}18` }}><Icon size={17} /></span>
        <span className="system-copy"><strong>{system.shortName}</strong><small>{system.name}</small></span>
        <span className={`toggle ${isActive ? 'on' : ''}`}><span /></span>
      </button>;
    })}</div>
    <div className="coming-soon"><span className="eyebrow">Next systems</span><p>Digestive · Endocrine · Urinary · Reproductive · Lymphatic</p></div>
  </aside>;
}

export function DetailsPanel() {
  const selectedPartId = useAnatomyStore((state) => state.selectedPartId);
  const part = anatomyParts.find((item) => item.id === selectedPartId) ?? anatomyParts[0];
  return <aside className="panel details-panel">
    <div className="details-top"><span className="eyebrow">Selected structure</span><span className="region-pill">{part.region}</span></div>
    <div className="structure-title"><div className="structure-orb" style={{ background: part.accent }} /><div><h2>{part.name}</h2><p>{part.system} system</p></div></div>
    <p className="summary">{part.summary}</p>
    <div className="info-card"><Info size={16} /><div><strong>What it does</strong><p>{part.function}</p></div></div>
    <div className="detail-actions"><button className="outline-button">View in isolation</button><button className="solid-button">Learn more</button></div>
    <div className="search-box"><Search size={16} /><input placeholder="Search anatomy" /><kbd>⌘ K</kbd></div>
  </aside>;
}

export function SimulationPanel() {
  const heartRate = useAnatomyStore((state) => state.heartRate);
  const breathingRate = useAnatomyStore((state) => state.breathingRate);
  const running = useAnatomyStore((state) => state.simulationRunning);
  const setHeartRate = useAnatomyStore((state) => state.setHeartRate);
  const setBreathingRate = useAnatomyStore((state) => state.setBreathingRate);
  const toggleSimulation = useAnatomyStore((state) => state.toggleSimulation);
  return <section className="simulation-bar panel">
    <div className="simulation-title"><span className="pulse-icon"><HeartPulse size={18} /></span><div><span className="eyebrow">Physiology preview</span><strong>Living systems</strong></div></div>
    <div className="sim-control"><label>Heart rate <b>{heartRate} bpm</b></label><input type="range" min="45" max="150" value={heartRate} onChange={(event) => setHeartRate(Number(event.target.value))} /></div>
    <div className="sim-control"><label>Breathing <b>{breathingRate} / min</b></label><input type="range" min="6" max="30" value={breathingRate} onChange={(event) => setBreathingRate(Number(event.target.value))} /></div>
    <button className="play-button" onClick={toggleSimulation}>{running ? <Pause size={15} /> : <Play size={15} />} {running ? 'Pause' : 'Play'}</button>
  </section>;
}
