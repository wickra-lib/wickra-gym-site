# C / C++

The C ABI is the hub every C-capable language (C, C++, C#, Go, Java, R) links
against. It exposes `wickra-gym-core` — a deterministic, Gymnasium-compatible backtest
environment — as a tiny, JSON-shaped surface built as both a `cdylib` (dynamic
library) and a `staticlib`.

```bash
# prebuilt wickra_gym.h + library per platform:
# github.com/wickra-lib/wickra-gym/releases
```

[`examples/c/rollout.c`](https://github.com/wickra-lib/wickra-gym/blob/main/examples/c/rollout.c) is the runnable example the CI smoke job executes; in full:

```c
/* A minimal C example: load a spec and its candle dataset over the wickra-gym C
 * ABI, then drive a fixed long policy through the environment and print each
 * step. No JSON parser is needed — the spec and candle JSON are read verbatim,
 * the load command is assembled by hand, and each response is printed as-is.
 * DATA_DIR is injected by CMake. */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "wickra_gym.h"

/* Read an entire text file into a freshly malloc'd, NUL-terminated buffer. */
static char *slurp(const char *path) {
    FILE *f = fopen(path, "rb");
    if (!f) {
        fprintf(stderr, "cannot open %s\n", path);
        return NULL;
    }
    fseek(f, 0, SEEK_END);
    long n = ftell(f);
    fseek(f, 0, SEEK_SET);
    char *buf = (char *)malloc((size_t)n + 1);
    if (buf) {
        size_t got = fread(buf, 1, (size_t)n, f);
        buf[got] = '\0';
    }
    fclose(f);
    return buf;
}

/* Run a command and return its response using the length-out protocol. The core
 * caches the not-yet-delivered response, so the second (delivering) call reuses
 * it — a mutating step runs exactly once. */
static char *run(WickraGymEnv *env, const char *cmd) {
    int len = wickra_gym_command(env, cmd, NULL, 0);
    if (len < 0) {
        fprintf(stderr, "command failed: code %d\n", len);
        return NULL;
    }
    char *buf = (char *)malloc((size_t)len + 1);
    if (buf) {
        wickra_gym_command(env, cmd, buf, (size_t)len + 1);
    }
    return buf;
}

int main(void) {
    char *spec = slurp(DATA_DIR "/specs/momentum_discrete.json");
    char *candles = slurp(DATA_DIR "/candles.json");
    if (!spec || !candles) {
        return 1;
    }

    WickraGymEnv *env = wickra_gym_new(spec);
    if (!env) {
        fprintf(stderr, "invalid spec\n");
        return 1;
    }

    size_t cap = strlen(candles) + 64;
    char *load = (char *)malloc(cap);
    snprintf(load, cap, "{\"cmd\":\"load\",\"candles\":%s}", candles);
    char *loaded = run(env, load);
    free(loaded);
    free(load);

    char *reset = run(env, "{\"cmd\":\"reset\",\"seed\":42}");
    printf("wickra-gym %s\n", wickra_gym_version());
    printf("reset: %s\n", reset ? reset : "(null)");
    free(reset);

    int steps = 0, ok = 1;
    for (;;) {
        char *step = run(env, "{\"cmd\":\"step\",\"action\":2}");
        if (!step || strstr(step, "\"ok\":false")) {
            ok = 0;
            free(step);
            break;
        }
        printf("step %d: %s\n", steps, step);
        int done = strstr(step, "\"terminated\":true") || strstr(step, "\"truncated\":true");
        free(step);
        steps++;
        if (done) {
            break;
        }
    }

    free(spec);
    free(candles);
    wickra_gym_free(env);
    if (!ok || steps == 0) {
        fprintf(stderr, "rollout failed\n");
        return 1;
    }
    return 0;
}
```

## More

- [Releases (prebuilt libraries)](https://github.com/wickra-lib/wickra-gym/releases)
- [Source & examples](https://github.com/wickra-lib/wickra-gym/tree/main/examples/c)
