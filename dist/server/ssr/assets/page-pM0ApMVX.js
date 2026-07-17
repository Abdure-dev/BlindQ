import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var algorithms = {
	grover: {
		name: "Grover search",
		short: "Find a hidden item",
		description: "Search a four-item space for the private target 11.",
		circuit: [
			"H⊗2",
			"Oracle(11)",
			"Diffuse",
			"Measure"
		],
		answer: "11",
		readout: "Target recovered",
		accent: "#baff63"
	},
	bernstein: {
		name: "Bernstein–Vazirani",
		short: "Recover a secret string",
		description: "Query a hidden oracle once to recover the private string 101.",
		circuit: [
			"H⊗4",
			"Oracle(101)",
			"H⊗3",
			"Measure"
		],
		answer: "101",
		readout: "Secret recovered",
		accent: "#8b7cff"
	},
	phase: {
		name: "Phase probe",
		short: "Detect a private phase",
		description: "Distinguish a hidden π phase without disclosing the test circuit.",
		circuit: [
			"H",
			"Rz(π)",
			"H",
			"Measure"
		],
		answer: "1",
		readout: "π phase detected",
		accent: "#ff7f5c"
	}
};
var anglePool = [
	"0",
	"π/4",
	"π/2",
	"3π/4",
	"π",
	"5π/4",
	"3π/2",
	"7π/4"
];
var stageCopy = {
	idle: "Waiting for a private job",
	encrypting: "Randomizing client instructions",
	executing: "Measuring the blinded graph state",
	decoding: "Removing the client’s secret pad",
	done: "Computation completed privately"
};
function makeAngles() {
	return [...[...anglePool].sort(() => Math.random() - .5), anglePool[Math.floor(Math.random() * anglePool.length)]];
}
function Circuit({ gates }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "circuit",
		"aria-label": `Circuit: ${gates.join(", ")}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "circuit-line",
			"aria-hidden": "true"
		}), gates.map((gate, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gate",
			children: gate
		}, `${gate}-${index}`))]
	});
}
function QuantumGraph({ active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `quantum-graph ${active ? "is-active" : ""}`,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "graph-line line-a" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "graph-line line-b" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "graph-line line-c" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "graph-line line-d" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "graph-line line-e" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "graph-line line-f" }),
			Array.from({ length: 8 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `qubit qubit-${index + 1}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: index + 1 })
			}, index))
		]
	});
}
function Home() {
	const [selected, setSelected] = (0, import_react.useState)("grover");
	const [stage, setStage] = (0, import_react.useState)("idle");
	const [angles, setAngles] = (0, import_react.useState)([
		"7π/4",
		"π/2",
		"π",
		"π/4",
		"3π/2",
		"0",
		"5π/4",
		"3π/4",
		"π/2"
	]);
	const [runId, setRunId] = (0, import_react.useState)("BQ-0001");
	const [runs, setRuns] = (0, import_react.useState)(0);
	const timers = (0, import_react.useRef)([]);
	const demoRef = (0, import_react.useRef)(null);
	const algorithm = algorithms[selected];
	const isRunning = stage !== "idle" && stage !== "done";
	const packetRows = (0, import_react.useMemo)(() => angles.slice(0, 6).map((angle, index) => ({
		node: `q${index + 1}`,
		angle
	})), [angles]);
	(0, import_react.useEffect)(() => {
		return () => timers.current.forEach(clearTimeout);
	}, []);
	function chooseAlgorithm(key) {
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
			setTimeout(() => setStage("done"), 3100)
		];
	}
	function scrollToDemo() {
		demoRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "site-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "brand",
					href: "#top",
					"aria-label": "BlindQ home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-mark",
						"aria-hidden": "true",
						children: "B/Q"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BLINDQ" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Primary navigation",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#protocol",
						children: "Protocol"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#proof",
						children: "Security"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "system-status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), " Simulator ready"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			id: "top",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }), " Private quantum cloud"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"Compute here.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Reveal nothing." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hero-subtitle",
						children: "Delegate a quantum computation without exposing the algorithm, input, or result to the machine running it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							onClick: scrollToDemo,
							children: ["Run the demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "↘"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "text-link",
							href: "#protocol",
							children: ["See how it works ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "→"
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-visual",
				"aria-label": "Private client connected to a blind quantum server",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "visual-label visual-label-top",
						children: "BLIND COMPUTATION / 001"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "client-orb",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb-ring ring-one" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb-ring ring-two" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "orb-core",
								children: "YOU"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "packet-stream",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "δ₁" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "δ₂" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "δ₃" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "δ₄" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "server-block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "server-grid" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "server-name",
								children: "QPU"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "SEES RANDOMNESS" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "visual-caption",
						children: "The useful computation exists only when combined with your private key."
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "demo-section",
			id: "demo",
			ref: demoRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }), " Interactive protocol"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Send a secret job." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "One fixed graph. Three different algorithms. The server receives the same shape and randomized angles every time." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "demo-shell",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "demo-topbar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BLINDQ / CLIENT CONSOLE" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `run-state state-${stage}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									" ",
									stageCopy[stage]
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: runId })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "demo-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "client-panel",
								"aria-labelledby": "client-title",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "panel-kicker",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CLIENT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TRUSTED ZONE" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										id: "client-title",
										children: "1. Choose your private algorithm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "algorithm-list",
										role: "radiogroup",
										"aria-label": "Private algorithm",
										children: Object.keys(algorithms).map((key) => {
											const item = algorithms[key];
											const active = selected === key;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: `algorithm-card ${active ? "selected" : ""}`,
												onClick: () => chooseAlgorithm(key),
												role: "radio",
												"aria-checked": active,
												disabled: isRunning,
												style: { "--algorithm-accent": item.accent },
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "radio-dot" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.short })] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"aria-hidden": "true",
														children: active ? "●" : "○"
													})
												]
											}, key);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "private-payload",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "lock-pill",
												children: "PRIVATE"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: algorithm.description }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circuit, { gates: algorithm.circuit })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "run-button",
										onClick: runBlindJob,
										disabled: isRunning,
										children: [isRunning ? "Protocol running…" : stage === "done" ? "Run again" : "Blind & run job", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: isRunning ? "◌" : "→"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "channel-panel",
								"aria-label": "Encrypted classical channel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "channel-title",
										children: "ENCRYPTED CLASSICAL CHANNEL"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `channel-track ${isRunning ? "is-moving" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "channel-line" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "data-packet",
												children: "δ"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "channel-arrow",
												children: "→"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "client-key",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CLIENT KEY" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "θ + rπ" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "never leaves device" })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "server-panel",
								"aria-labelledby": "server-title",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "panel-kicker server",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "QUANTUM SERVER" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UNTRUSTED ZONE" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										id: "server-title",
										children: "2. Server sees only this"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantumGraph, { active: stage === "executing" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "server-packets",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "packet-head",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NODE" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ANGLE δ" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MEASURE" })
											]
										}), packetRows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `packet-row ${stage === "executing" && index < 4 ? "reading" : ""}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.node }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.angle }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stage === "executing" && index < 4 ? "●" : "—" })
											]
										}, row.node))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "attacker-readout",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "eye-icon",
												"aria-hidden": "true",
												children: "◉"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "SERVER’S BEST GUESS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No signal" })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "33.3%" })
										]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `result-bar ${stage === "done" ? "revealed" : ""}`,
						"aria-live": "polite",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PRIVATE RESULT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Visible to client only" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: stage === "done" ? algorithm.answer : "•••" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: stage === "done" ? algorithm.readout : "Result remains one-time padded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "verified-pill",
								children: stage === "done" ? "✓ DECODED" : "LOCKED"
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "protocol-section",
			id: "protocol",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "protocol-intro",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03" }), " Under the hood"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"The server does the work.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "You keep the context." })
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "protocol-steps",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "step-icon",
							children: "＋"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Prepare" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The client rotates simple qubits using secret random angles θ." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "step-icon",
							children: "⌁"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Entangle" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The server creates a fixed graph state without knowing the job." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "step-icon",
							children: "δ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Measure" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Encrypted, adaptive angles steer the hidden computation." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "04" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "step-icon",
							children: "✓"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Decode" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only the client can remove the random pad and read the answer." })
					] })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "proof-section",
			id: "proof",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "proof-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "04" }), " What stays blind"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"The cloud sees the work.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Not what it means."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "privacy-list",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "✓" }), " Algorithm hidden"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "✓" }), " Input hidden"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "✓" }), " Output hidden"] })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "honesty-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PROTOTYPE NOTE" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This demo illustrates the information flow of Universal Blind Quantum Computation. It is an educational simulator—not a production cryptographic implementation or a live hardware claim." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://arxiv.org/abs/0807.4154",
						target: "_blank",
						rel: "noreferrer",
						children: ["Read the UBQC paper ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "↗"
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				className: "brand footer-brand",
				href: "#top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-mark",
					children: "B/Q"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BLINDQ" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Private computation for the quantum cloud." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "HACK DAY PROTOTYPE / 2026" })
		] })
	] });
}
//#endregion
export { Home as default };
