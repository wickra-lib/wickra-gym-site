# WASM

A deterministic, Gymnasium-compatible backtest environment compiled to
WebAssembly, for running rollouts directly in the browser (or any WASM host).
The feature-tensor precompute runs sequentially here — byte-identical to the
native parallel build — so a WASM rollout matches every other language binding.

```bash
npm install wickra-gym-wasm
```

```js
import init, { Env } from "./pkg/wickra_gym_wasm.js";

await init();

const spec = JSON.stringify({
  dataset_ref: "demo",
  symbol: "BTCUSDT",
  observation: { features: [{ kind: "price", field: "close" }] },
  action_space: { type: "discrete", n: 3 },
  reward: "pnl",
  episode: { max_steps: 256, warmup: 0 },
});

const candles = Array.from({ length: 300 }, (_, i) => ({
  ts: i, open: 100 + i, high: 100 + i, low: 100 + i, close: 100 + i,
}));

const env = new Env(spec);
env.command(JSON.stringify({ cmd: "load", candles }));
const reset = JSON.parse(env.command(JSON.stringify({ cmd: "reset", seed: 0 })));
const step = JSON.parse(env.command(JSON.stringify({ cmd: "step", action: 2 })));
```

## More

- [npm](https://www.npmjs.com/package/wickra-gym-wasm)
- [Source & examples](https://github.com/wickra-lib/wickra-gym/tree/main/examples/wasm)
