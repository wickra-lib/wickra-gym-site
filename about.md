# About Wickra Gym

A Gymnasium-compatible, microstructure-aware backtest environment: precompute the dataset to a fixed feature tensor once, and every step() becomes a pure array index.

## What it does

Wickra Gym exposes a Gymnasium-compatible environment over a deterministic backtest. The expensive part — turning candles into features — happens once, up front, into a fixed tensor. Each `step()` then indexes that tensor, so the per-step cost is constant no matter how wide the feature set is.

## Why it exists

Reinforcement learning needs millions of steps. An environment that recomputes indicators inside `step()` spends its budget on arithmetic it already did, and a run that is not deterministic cannot be compared with the one before it.

## Open source

Released under the **MIT OR Apache-2.0** license — permissive, OSI-approved and
free for any use, including commercial. Source, issues and releases on
[GitHub](https://github.com/wickra-lib/wickra-gym).

## Disclaimer

Wickra Gym is software, **not** a trading system, and is provided **as-is with no
warranty**. It does not give financial advice. Use it at your own risk.
