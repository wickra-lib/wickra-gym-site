---
layout: home
title: "Wickra Gym — A Gymnasium-compatible, microstructure-aware backtest environment with O(1) steps for deterministic reinforcement-learning rollouts"
titleTemplate: false

hero:
  name: "Wickra Gym"
  text: "O(1) steps. Deterministic rollouts."
  tagline: "A Gymnasium-compatible, microstructure-aware backtest environment: precompute the dataset to a fixed feature tensor once, and every step() becomes a pure array index."
  image:
    src: /wickra-mark.svg
    alt: "Wickra Gym"
  actions:
    - theme: brand
      text: View on GitHub
      link: https://github.com/wickra-lib/wickra-gym
    - theme: alt
      text: How it works
      link: /about

features:
  - icon: ⚡
    title: "Every step is an index"
    details: "The dataset is precomputed once into a fixed feature tensor. After that `step()` does no indicator work at all — it reads a row. Rollout speed stops depending on how many features you asked for."
  - icon: 🔬
    title: "Microstructure-aware"
    details: "The observation is built from the same market structure the rest of the stack reads, not from a bare price series."
  - icon: 🎯
    title: "Deterministic rollouts"
    details: "The same seed and the same spec replay the identical episode, so a training run is reproducible rather than approximately repeatable."
  - icon: 🧩
    title: "514 indicators as features"
    details: "The feature tensor is drawn from the Wickra core's 514 streaming indicators, so a feature set is a list of names rather than code you maintain."
---

<script setup>
const installTabs = [
  { label: 'Python', lang: 'bash', code: 'pip install wickra-gym' },
  { label: 'Node', lang: 'bash', code: 'npm install wickra-gym' },
  { label: 'Rust', lang: 'bash', code: 'cargo add wickra-gym' },
  { label: 'WASM', lang: 'bash', code: 'npm install wickra-gym-wasm' },
  { label: 'C', lang: 'bash', code: '# prebuilt header + library from GitHub releases:\n# github.com/wickra-lib/wickra-gym/releases' },
  { label: 'C#', lang: 'bash', code: 'dotnet add package Wickra.Gym' },
  { label: 'Go', lang: 'bash', code: 'go get github.com/wickra-lib/wickra-gym-go' },
  { label: 'Java', lang: 'xml', code: '<!-- Maven Central -->\n<dependency>\n  <groupId>org.wickra</groupId>\n  <artifactId>wickra-gym</artifactId>\n  <version>0.1.4</version>\n</dependency>' },
  { label: 'R', lang: 'r', code: 'install.packages("wickragym", repos = "https://wickra-lib.r-universe.dev")' },
]
</script>

## Install

The same engine from every language — native Rust, Python, Node.js and WASM, plus a C
ABI for C, C++, C#, Go, Java and R.

<InstallTabs :tabs="installTabs" />

The [API pages](/api/rust) carry a quick start per language; the
[repository README](https://github.com/wickra-lib/wickra-gym#readme) the same in one place.

## Built on the Wickra core

Wickra Gym is part of the [Wickra](https://wickra.org) ecosystem — one indicator core,
twenty-three products, the same ten-language binding surface in every one of them,
checked byte-for-byte by a golden corpus in every repository.

> Wickra Gym is a software library, not a trading system, and gives no financial
> advice — its outputs are deterministic transforms of the input data and do not
> predict future returns. Use it at your own risk.
