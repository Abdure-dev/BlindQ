# BlindQ

BlindQ is an interactive hackathon prototype that explains the information flow
of Universal Blind Quantum Computation (UBQC). A client chooses a private
algorithm, turns it into randomized measurement instructions, and delegates the
work to a simulated quantum server. The server sees a fixed graph state and
random-looking angles; only the client can decode the result.

## Demo flow

1. Choose Grover search, Bernstein–Vazirani, or a phase probe.
2. Select **Blind & run job**.
3. Watch the client randomize instructions and the server measure the graph.
4. Compare the server's limited view with the decoded private result.

The prototype is intentionally labeled as an educational simulator. It does not
claim production cryptographic security or live quantum-hardware execution.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm test
```

## Research basis

The interaction is inspired by Broadbent, Fitzsimons, and Kashefi,
[Universal Blind Quantum Computation](https://arxiv.org/abs/0807.4154). The
interface is a teaching visualization rather than a full implementation of the
paper's security proof.
