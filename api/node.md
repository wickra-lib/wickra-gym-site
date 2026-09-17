# Node

A deterministic, Gymnasium-compatible backtest environment, powered by Rust. The
whole candle dataset is precomputed once into a fixed feature tensor, so each
`step` is a constant-time array index — and the same spec, data, seed and actions
produce a byte-identical trajectory across every language binding.

```bash
npm install wickra-gym
```

```js
const { Env } = require('wickra-gym')

const spec = JSON.stringify({
  dataset_ref: 'demo',
  symbol: 'BTCUSDT',
  observation: { features: [
    { kind: 'price', field: 'close' },
    { kind: 'indicator', name: 'Rsi', params: [14] },
  ] },
  action_space: { type: 'discrete', n: 3 },
  reward: 'pnl',
  episode: { max_steps: 256, warmup: 14 },
})

const candles = Array.from({ length: 300 }, (_, i) => ({
  ts: i, open: 100 + i, high: 100 + i, low: 100 + i, close: 100 + i,
}))

const env = new Env(spec)
env.command(JSON.stringify({ cmd: 'load', candles }))
const reset = JSON.parse(env.command(JSON.stringify({ cmd: 'reset', seed: 0 })))
const step = JSON.parse(env.command(JSON.stringify({ cmd: 'step', action: 2 })))
console.log(step.reward, step.terminated)
```

## More

- [npm](https://www.npmjs.com/package/wickra-gym)
- [Source & examples](https://github.com/wickra-lib/wickra-gym/tree/main/examples/node)
