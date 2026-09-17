import { defineConfig } from 'vitepress'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// JSON-LD structured data (Organization + SoftwareApplication) so search
// engines and LLM crawlers can resolve the product's entity, ownership, and
// where it is published. Emitted once in the document <head> below.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://gym.wickra.org/#organization',
      name: 'Wickra',
      url: 'https://gym.wickra.org/',
      logo: 'https://gym.wickra.org/wickra-mark.svg',
      sameAs: [
        'https://github.com/wickra-lib/wickra-gym',
        'https://github.com/wickra-lib/wickra',
        'https://wickra.org/',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://gym.wickra.org/#software',
      name: 'Wickra Gym',
      url: 'https://gym.wickra.org/',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux, WebAssembly',
      programmingLanguage: ['Rust', 'Python', 'JavaScript', 'WebAssembly', 'C', 'C++', 'C#', 'Go', 'Java', 'R'],
      description:
        'A Gymnasium-compatible, microstructure-aware backtest environment with O(1) steps for deterministic reinforcement-learning rollouts.',
      license: 'https://github.com/wickra-lib/wickra-gym#license',
      publisher: { '@id': 'https://gym.wickra.org/#organization' },
    },
  ],
}

export default defineConfig({
  title: 'Wickra Gym',
  description:
    'A Gymnasium-compatible, microstructure-aware backtest environment with O(1) steps for deterministic reinforcement-learning rollouts.',
  lang: 'en-US',
  cleanUrls: true,

  // Served at the domain root (gym.wickra.org via Cloudflare Pages).
  base: '/',

  sitemap: { hostname: 'https://gym.wickra.org' },

  // README.md is repo documentation, not a site page — keep it out of the build.
  srcExclude: ['README.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/wickra-mark.svg' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#0ea5e9' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Wickra Gym — a Gymnasium-compatible backtest environment with O(1) steps' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A Gymnasium-compatible, microstructure-aware backtest environment: precompute the dataset to a fixed feature tensor once, and every step() becomes a pure array index.',
      },
    ],
    ['meta', { property: 'og:image', content: 'https://gym.wickra.org/og-banner.webp' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://gym.wickra.org/og-banner.webp' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(structuredData)],
  ],

  transformPageData(pageData) {
    const path = pageData.relativePath.replace(/(?:index)?\.md$/, '')
    const canonical = `https://gym.wickra.org/${path}`
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:url', content: canonical }],
    )
  },

  themeConfig: {
    siteTitle: 'Wickra Gym',
    logo: { src: '/wickra-mark.svg', alt: 'Wickra Gym' },
    logoLink: 'https://wickra.org/',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Benchmarks', link: '/benchmarks' },
      {
        text: 'API',
        items: [
          { text: 'Rust', link: '/api/rust' },
          { text: 'Python', link: '/api/python' },
          { text: 'Node', link: '/api/node' },
          { text: 'WASM', link: '/api/wasm' },
          { text: 'C', link: '/api/c' },
          { text: 'C#', link: '/api/csharp' },
          { text: 'Go', link: '/api/go' },
          { text: 'Java', link: '/api/java' },
          { text: 'R', link: '/api/r' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/wickra-lib/wickra-gym' },
      {
        text: 'Links',
        items: [
          { text: 'crates.io', link: 'https://crates.io/crates/wickra-gym' },
          { text: 'PyPI', link: 'https://pypi.org/project/wickra-gym/' },
          { text: 'npm', link: 'https://www.npmjs.com/package/wickra-gym' },
          { text: 'NuGet', link: 'https://www.nuget.org/packages/Wickra.Gym' },
          { text: 'Maven Central', link: 'https://central.sonatype.com/artifact/org.wickra/wickra-gym' },
          { text: 'Go module', link: 'https://pkg.go.dev/github.com/wickra-lib/wickra-gym-go' },
          { text: 'r-universe', link: 'https://wickra-lib.r-universe.dev' },
        ],
      },
      {
        text: 'v0.1.2',
        items: [
          { text: 'Release notes', link: 'https://github.com/wickra-lib/wickra-gym/releases' },
          { text: 'Changelog', link: 'https://github.com/wickra-lib/wickra-gym/blob/main/CHANGELOG.md' },
          { text: 'docs.rs', link: 'https://docs.rs/wickra-gym/latest/wickra_gym/' },
        ],
      },
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'Core',
            items: [
              { text: 'Wickra', link: 'https://wickra.org' },
              { text: 'Docs', link: 'https://docs.wickra.org' },
              { text: 'Live demo', link: 'https://live.wickra.org' },
            ],
          },
          {
            text: 'Data',
            items: [
              { text: 'Exchange', link: 'https://exchange.wickra.org' },
              { text: 'Synth', link: 'https://synth.wickra.org' },
              { text: 'Time Machine', link: 'https://timemachine.wickra.org' },
              { text: 'Genome', link: 'https://genome.wickra.org' },
              { text: 'Feature Store', link: 'https://feature-store.wickra.org' },
            ],
          },
          {
            text: 'Research',
            items: [
              { text: 'Backtest', link: 'https://backtest.wickra.org' },
              { text: 'Screener', link: 'https://screener.wickra.org' },
              { text: 'Darwin', link: 'https://darwin.wickra.org' },
              { text: 'Gym', link: 'https://gym.wickra.org' },
              { text: 'Impact', link: 'https://impact.wickra.org' },
            ],
          },
          {
            text: 'Trust',
            items: [
              { text: 'Verify', link: 'https://verify.wickra.org' },
              { text: 'Proof', link: 'https://proof.wickra.org' },
              { text: 'ZK', link: 'https://zk.wickra.org' },
              { text: 'Strategy-CI', link: 'https://strategy-ci.wickra.org' },
              { text: 'Benchmark', link: 'https://benchmark.wickra.org' },
            ],
          },
          {
            text: 'Surface',
            items: [
              { text: 'Terminal', link: 'https://terminal.wickra.org' },
              { text: 'X-Ray', link: 'https://xray.wickra.org' },
              { text: 'Radar', link: 'https://radar.wickra.org' },
              { text: 'Copilot', link: 'https://copilot.wickra.org' },
              { text: 'Shazam', link: 'https://shazam.wickra.org' },
            ],
          },
          {
            text: 'Edge',
            items: [
              { text: 'Compile', link: 'https://compile.wickra.org' },
              { text: 'Embed', link: 'https://embed.wickra.org' },
              { text: 'Pico', link: 'https://pico.wickra.org' },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/wickra-lib/wickra-gym' }],

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },

    lastUpdated: { text: 'Updated', formatOptions: { dateStyle: 'medium' } },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: false,
  },

  vite: {
    // wickra-wasm is a wasm-pack `--target bundler` build: its JS glue does
    // `import * as wasm from './wickra_wasm_bg.wasm'` and expects the bundler
    // to instantiate the module and expose its exports. vite-plugin-wasm does
    // exactly that, and vite-plugin-top-level-await handles the top-level await
    // the wasm init emits.
    plugins: [wasm(), topLevelAwait()],
    optimizeDeps: {
      // esbuild's dep pre-bundling can't follow the .wasm ESM import, so keep
      // wickra-wasm out of it and let vite-plugin-wasm handle it on demand.
      exclude: ['wickra-wasm'],
    },
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },
})
