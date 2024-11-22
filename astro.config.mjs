import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";

import mdx from "@astrojs/mdx";
import m2dx from "astro-m2dx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypeExternalLinks from "rehype-external-links";
import remarkEmbedder from "@remark-embedder/core";
import oembedTransformer from "@remark-embedder/transformer-oembed";
import vue from "@astrojs/vue";
import prefetch from "@astrojs/prefetch";
import compress from "astro-compress";

const m2dxOptions = {
  exportComponents: true,
  unwrapImages: true,
  autoImports: true,
};

// https://astro.build/config
export default defineConfig({
  site: "https://nebulix.unfolding.io",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    vue({
      appEntrypoint: "/src/pages/_app",
    }),
    astroImageTools,
    prefetch(),
    compress({
      CSS: true,
      HTML: false,
      Image: false,
      JavaScript: true,
      SVG: true,
    }),
  ],
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      [
        remarkEmbedder,
        {
          transformers: [oembedTransformer],
        },
      ],
      [m2dx, m2dxOptions],
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow"],
          target: ["_blank"],
        },
      ],
    ],
  },
  vite: {
    build: {
      assetsInlineLimit: 10096,
      // Comentado rollupOptions para simplificar
      // rollupOptions: {
      //   external: [
      //     "/_pagefind/pagefind.js",
      //     "/_pagefind/pagefind-ui.js",
      //     "/_pagefind/pagefind-ui.css",
      //   ],
      // },
    },
  },
  build: {
    inlineStylesheets: "always",
  },
  scopedStyleStrategy: "attribute",
});
