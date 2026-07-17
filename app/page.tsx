"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AlgorithmKey = "grover" | "bernstein" | "phase";
type RunStage = "idle" | "encrypting" | "executing" | "decoding" | "done";

type Algorithm = {
  name: string;
  short: string;
  description: string;
  circuit: string[];
  answer: string;
  readout: string;
  accent: string;
};

const algorithms: Record<AlgorithmKey, Algorithm> = {
  grover: {
    name: "Grover search",
    short: "Find a hidden item",
    description: "Search a four-item space for the private target 11.",
    circuit: ["H⊗2", "Oracle(11)", "Diffuse", "Measure"],
    answer: "11",
    readout: "Target recovered",
    accent: "#baff63",
  },
  bernstein: {
    name: "Bernstein–Vazirani",
    short: "Recover a secret string",
    description: "Query a hidden oracle once to recover the private string 101.",
    circuit: ["H⊗4", "Oracle(101)", "H⊗3", "Measure"],
    answer: "101",
    readout: "Secret recovered",
    accent: "#8b7cff",
  },
  phase: {
    name: "Phase probe",
    short: "Detect a private phase",
    description: "Distinguish a hidden π phase without disclosing the test circuit.",
    circuit: ["H", "Rz(π)", "H", "Measure"],
    answer: "1",
    readout: "π phase detected",
    accent: "#ff7f5c",
  },
};

const anglePool = ["0", "π/4", "π/2", "3π/4", "π", "5π/4", "3π/2", "7π/4"];

const stageCopy: Record<RunStage, string> = {
  idle: "Waiting for a private job",
  encrypting: "Randomizing client instructions",
  executing: "Measuring the blinded graph state",
  decoding: "Removing the client’s secret pad",
  done: "Computation completed privately",
};

function makeAngles() {
  const shuffled = [...anglePool].sort(() => Math.random() - 0.5);
  return [...shuffled, anglePool[Math.floor(Math.random() * anglePool.length)]];
}

function Circuit({ gates }: { gates: string[] }) {
  return (
    <div className="circuit" aria-label={`Circuit: ${gates.join(", ")}`}>
      <span className="circuit-line" aria-hidden="true" />
      {gates.map((gate, index) => (
        <span className="gate" key={`${gate}-${index}`}>
          {gate}
        </span>
      ))}
    </div>
  );
}

function QuantumGraph({ active }: { active: boolean }) {
  return (
    <div className={`quantum-graph ${active ? "is-active" : ""}`} aria-hidden="true">
      <span className="graph-line line-a" />
      <span className="graph-line line-b" />
      <span className="graph-line line-c" />
      <span className="graph-line line-d" />
      <span className="graph-line line-e" />
      <span className="graph-line line-f" />
      {Array.from({ length: 8 }, (_, index) => (
        <span className={`qubit qubit-${index + 1}`} key={index}>
          <span>{index + 1}</span>
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<AlgorithmKey>("grover");
  const [stage, setStage] = useState<RunStage>("idle");
  const [angles, setAngles] = useState<string[]>([
    "7π/4", "π/2", "π", "π/4", "3π/2", "0", "5π/4", "3π/4", "π/2",
  ]);
  const [runId, setRunId] = useState("BQ-0001");
  const [runs, setRuns] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const demoRef = useRef<HTMLElement>(null);
  const algorithm = algorithms[selected];
  const isRunning = stage !== "idle" && stage !== "done";

  const packetRows = useMemo(
    () => angles.slice(0, 6).map((angle, index) => ({ node: `q${index + 1}`, angle })),
    [angles],
  );

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function chooseAlgorithm(key: AlgorithmKey) {
    if (isRunning) return;
    setSelected(key);
    setStage("idle");
  }

  function runBlindJob() {
    if (isRunning) return;
    timers.current.forEach(clearTimeout);
    const nextRun = runs + 1;
    setRuns(nextRun);
    setRunId(`BQ-${String(1024 + nextRun * 37).padStart(4, "0")}`);
    setAngles(makeAngles());
    setStage("encrypting");
    timers.current = [
      setTimeout(() => setStage("executing"), 850),
      setTimeout(() => setStage("decoding"), 2100),
      setTimeout(() => setStage("done"), 3100),
    ];
  }

  function scrollToDemo() {
    demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BlindQ home">
          <span className="brand-mark" aria-hidden="true">B/Q</span>
          <span>BLINDQ</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#protocol">Protocol</a>
          <a href="#proof">Security</a>
        </nav>
        <span className="system-status"><i /> Simulator ready</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> Private quantum cloud</p>
          <h1>Compute here.<br /><em>Reveal nothing.</em></h1>
          <p className="hero-subtitle">
            Delegate a quantum computation without exposing the algorithm,
            input, or result to the machine running it.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={scrollToDemo}>
              Run the demo <span aria-hidden="true">↘</span>
            </button>
            <a className="text-link" href="#protocol">See how it works <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Private client connected to a blind quantum server">
          <div className="visual-label visual-label-top">BLIND COMPUTATION / 001</div>
          <div className="client-orb">
            <span className="orb-ring ring-one" />
            <span className="orb-ring ring-two" />
            <span className="orb-core">YOU</span>
          </div>
          <div className="packet-stream">
            <span>δ₁</span><span>δ₂</span><span>δ₃</span><span>δ₄</span>
          </div>
          <div className="server-block">
            <span className="server-grid" />
            <span className="server-name">QPU</span>
            <small>SEES RANDOMNESS</small>
          </div>
          <p className="visual-caption">The useful computation exists only when combined with your private key.</p>
        </div>
      </section>

      <section className="demo-section" id="demo" ref={demoRef}>
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>02</span> Interactive protocol</p>
            <h2>Send a secret job.</h2>
          </div>
          <p>One fixed graph. Three different algorithms. The server receives the same shape and randomized angles every time.</p>
        </div>

        <div className="demo-shell">
          <div className="demo-topbar">
            <span>BLINDQ / CLIENT CONSOLE</span>
            <span className={`run-state state-${stage}`}><i /> {stageCopy[stage]}</span>
            <span>{runId}</span>
          </div>

          <div className="demo-grid">
            <section className="client-panel" aria-labelledby="client-title">
              <div className="panel-kicker"><span>CLIENT</span><span>TRUSTED ZONE</span></div>
              <h3 id="client-title">1. Choose your private algorithm</h3>

              <div className="algorithm-list" role="radiogroup" aria-label="Private algorithm">
                {(Object.keys(algorithms) as AlgorithmKey[]).map((key) => {
                  const item = algorithms[key];
                  const active = selected === key;
                  return (
                    <button
                      className={`algorithm-card ${active ? "selected" : ""}`}
                      key={key}
                      onClick={() => chooseAlgorithm(key)}
                      role="radio"
                      aria-checked={active}
                      disabled={isRunning}
                      style={{ "--algorithm-accent": item.accent } as React.CSSProperties}
                    >
                      <span className="radio-dot" />
                      <span><strong>{item.name}</strong><small>{item.short}</small></span>
                      <span aria-hidden="true">{active ? "●" : "○"}</span>
                    </button>
                  );
                })}
              </div>

              <div className="private-payload">
                <span className="lock-pill">PRIVATE</span>
                <p>{algorithm.description}</p>
                <Circuit gates={algorithm.circuit} />
              </div>

              <button className="run-button" onClick={runBlindJob} disabled={isRunning}>
                {isRunning ? "Protocol running…" : stage === "done" ? "Run again" : "Blind & run job"}
                <span aria-hidden="true">{isRunning ? "◌" : "→"}</span>
              </button>
            </section>

            <section className="channel-panel" aria-label="Encrypted classical channel">
              <span className="channel-title">ENCRYPTED CLASSICAL CHANNEL</span>
              <div className={`channel-track ${isRunning ? "is-moving" : ""}`}>
                <span className="channel-line" />
                <span className="data-packet">δ</span>
                <span className="channel-arrow">→</span>
              </div>
              <div className="client-key">
                <span>CLIENT KEY</span>
                <strong>θ + rπ</strong>
                <small>never leaves device</small>
              </div>
            </section>

            <section className="server-panel" aria-labelledby="server-title">
              <div className="panel-kicker server"><span>QUANTUM SERVER</span><span>UNTRUSTED ZONE</span></div>
              <h3 id="server-title">2. Server sees only this</h3>
              <QuantumGraph active={stage === "executing"} />

              <div className="server-packets">
                <div className="packet-head"><span>NODE</span><span>ANGLE δ</span><span>MEASURE</span></div>
                {packetRows.map((row, index) => (
                  <div className={`packet-row ${stage === "executing" && index < 4 ? "reading" : ""}`} key={row.node}>
                    <span>{row.node}</span><strong>{row.angle}</strong><span>{stage === "executing" && index < 4 ? "●" : "—"}</span>
                  </div>
                ))}
              </div>

              <div className="attacker-readout">
                <span className="eye-icon" aria-hidden="true">◉</span>
                <div><small>SERVER’S BEST GUESS</small><strong>No signal</strong></div>
                <b>33.3%</b>
              </div>
            </section>
          </div>

          <div className={`result-bar ${stage === "done" ? "revealed" : ""}`} aria-live="polite">
            <div><span>PRIVATE RESULT</span><small>Visible to client only</small></div>
            <strong>{stage === "done" ? algorithm.answer : "•••"}</strong>
            <p>{stage === "done" ? algorithm.readout : "Result remains one-time padded"}</p>
            <span className="verified-pill">{stage === "done" ? "✓ DECODED" : "LOCKED"}</span>
          </div>
        </div>
      </section>

      <section className="protocol-section" id="protocol">
        <div className="protocol-intro">
          <p className="eyebrow"><span>03</span> Under the hood</p>
          <h2>The server does the work.<br /><em>You keep the context.</em></h2>
        </div>
        <div className="protocol-steps">
          <article><span>01</span><div className="step-icon">＋</div><h3>Prepare</h3><p>The client rotates simple qubits using secret random angles θ.</p></article>
          <article><span>02</span><div className="step-icon">⌁</div><h3>Entangle</h3><p>The server creates a fixed graph state without knowing the job.</p></article>
          <article><span>03</span><div className="step-icon">δ</div><h3>Measure</h3><p>Encrypted, adaptive angles steer the hidden computation.</p></article>
          <article><span>04</span><div className="step-icon">✓</div><h3>Decode</h3><p>Only the client can remove the random pad and read the answer.</p></article>
        </div>
      </section>

      <section className="proof-section" id="proof">
        <div className="proof-card">
          <p className="eyebrow"><span>04</span> What stays blind</p>
          <h2>The cloud sees the work.<br />Not what it means.</h2>
          <div className="privacy-list">
            <span><i>✓</i> Algorithm hidden</span>
            <span><i>✓</i> Input hidden</span>
            <span><i>✓</i> Output hidden</span>
          </div>
        </div>
        <aside className="honesty-card">
          <span>PROTOTYPE NOTE</span>
          <p>This demo illustrates the information flow of Universal Blind Quantum Computation. It is an educational simulator—not a production cryptographic implementation or a live hardware claim.</p>
          <a href="https://arxiv.org/abs/0807.4154" target="_blank" rel="noreferrer">Read the UBQC paper <span aria-hidden="true">↗</span></a>
        </aside>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">B/Q</span><span>BLINDQ</span></a>
        <p>Private computation for the quantum cloud.</p>
        <span>HACK DAY PROTOTYPE / 2026</span>
      </footer>
    </main>
  );
}
