# Java

Java bindings for [wickra-gym](https://github.com/wickra-lib/wickra-gym) — a
deterministic, Gymnasium-compatible backtest environment — over the C ABI using
the Foreign Function & Memory API (FFM / Project Panama). A rollout is
byte-identical to every other language binding.

```xml
<dependency>
  <groupId>org.wickra</groupId>
  <artifactId>wickra-gym</artifactId>
  <version>0.1.2</version>
</dependency>
```

```java
import org.wickra.gym.Env;

String spec = """
    {"dataset_ref":"demo","symbol":"BTCUSDT",
     "observation":{"features":[{"kind":"price","field":"close"}]},
     "action_space":{"type":"discrete","n":3},
     "reward":"pnl","episode":{"max_steps":256,"warmup":0}}
    """;

try (Env env = new Env(spec)) {
    // Build a candles JSON array and load it.
    env.command("{\"cmd\":\"load\",\"candles\":[/* ... */]}");
    String reset = env.command("{\"cmd\":\"reset\",\"seed\":0}");
    String step = env.command("{\"cmd\":\"step\",\"action\":2}");
    System.out.println(step);
}
```

## More

- [Maven Central](https://central.sonatype.com/artifact/org.wickra/wickra-gym)
- [Source & examples](https://github.com/wickra-lib/wickra-gym/tree/main/examples/java)
