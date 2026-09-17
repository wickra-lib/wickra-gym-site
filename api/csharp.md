# C#

.NET bindings for [`wickra-gym`](https://github.com/wickra-lib/wickra-gym) over
the C ABI hub, via source-generated P/Invoke. Build an `Env` from a spec JSON,
drive it with command JSON and read back observations and rewards — the same
protocol the CLI and every other binding speak, returning the same bytes.

```bash
dotnet add package Wickra.Gym
```

```csharp
using Wickra.Gym;

const string spec = """
{"dataset_ref":"demo","symbol":"BTCUSDT",
 "observation":{"features":[{"kind":"indicator","name":"Rsi","params":[14]},
                            {"kind":"price","field":"close"}]},
 "action_space":{"type":"discrete","n":3},
 "reward":"pnl","episode":{"max_steps":256,"warmup":14}}
""";

using var env = new Env(spec);
env.Command("""{"cmd":"load","candles":[ … ]}""");
string reset = env.Command("""{"cmd":"reset","seed":7}""");
string step = env.Command("""{"cmd":"step","action":2.0}""");
```

## More

- [NuGet](https://www.nuget.org/packages/Wickra.Gym)
- [Source & examples](https://github.com/wickra-lib/wickra-gym/tree/main/examples/csharp)
