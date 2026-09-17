# Python

A deterministic, [Gymnasium](https://gymnasium.farama.org/)-compatible backtest
environment. The whole candle dataset is precomputed once into a fixed feature
tensor, so each `step()` is a constant-time array index — and the same spec,
data, seed and actions produce a byte-identical trajectory across every language
binding.

```bash
pip install wickra-gym
```

[`examples/python/rollout.py`](https://github.com/wickra-lib/wickra-gym/blob/main/examples/python/rollout.py) is the runnable example the CI smoke job executes; in full:

```python
"""Raw rollout over the native command surface (no Gymnasium required).

    python examples/python/rollout.py

Reads the momentum_discrete spec and its candle dataset, then drives a fixed
long policy through the environment via ``RawEnv.command`` — the same JSON-in /
JSON-out boundary every language binding forwards verbatim, so this trajectory
is byte-identical to the C, Node, Go, C#, Java and R examples on the same seed.
"""

import json
from pathlib import Path

from wickra_gym import RawEnv, __version__

DATA = Path(__file__).resolve().parent.parent / "data"

def main() -> None:
    spec = (DATA / "specs" / "momentum_discrete.json").read_text()
    candles = json.loads((DATA / "candles.json").read_text())

    env = RawEnv(spec)
    env.command(json.dumps({"cmd": "load", "candles": candles}))

    reset = json.loads(env.command(json.dumps({"cmd": "reset", "seed": 42})))
    print(f"wickra-gym {__version__}")
    print("reset observation:", reset["observation"])

    equity = 0.0
    step = 0
    while True:
        result = json.loads(env.command(json.dumps({"cmd": "step", "action": 2})))
        equity += result["reward"]
        print(
            f"step {step}: reward {result['reward']:+.6f}  equity {equity:+.6f}  "
            f"terminated={result['terminated']} truncated={result['truncated']}"
        )
        if result["terminated"] or result["truncated"]:
            break
        step += 1

if __name__ == "__main__":
    main()
```

## More

- [PyPI](https://pypi.org/project/wickra-gym/)
- [Source & examples](https://github.com/wickra-lib/wickra-gym/tree/main/examples/python)
