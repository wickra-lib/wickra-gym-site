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
