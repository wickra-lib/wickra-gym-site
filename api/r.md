# R

R bindings for [wickra-gym](https://github.com/wickra-lib/wickra-gym) — a
deterministic, Gymnasium-compatible backtest environment — over the C ABI, via
R's `.Call` interface. A rollout is byte-identical to every other language
binding.

```r
install.packages("wickragym", repos = "https://wickra-lib.r-universe.dev")
```

```r
library(wickragym)

spec <- paste0(
  '{"dataset_ref":"demo","symbol":"BTCUSDT",',
  '"observation":{"features":[{"kind":"price","field":"close"}]},',
  '"action_space":{"type":"discrete","n":3},',
  '"reward":"pnl","episode":{"max_steps":256,"warmup":0}}'
)

env <- wkgym_new(spec)

candles <- paste0(
  '[', paste(vapply(0:299, function(i) {
    p <- 100 + i
    sprintf('{"ts":%d,"open":%f,"high":%f,"low":%f,"close":%f}', i, p, p, p, p)
  }, character(1)), collapse = ","), ']'
)
wkgym_command(env, paste0('{"cmd":"load","candles":', candles, '}'))

reset <- wkgym_command(env, '{"cmd":"reset","seed":0}')
step  <- wkgym_command(env, '{"cmd":"step","action":2}')
cat(step, "\n")
```

## More

- [r-universe](https://wickra-lib.r-universe.dev)
- [Source & examples](https://github.com/wickra-lib/wickra-gym/tree/main/examples/r)
