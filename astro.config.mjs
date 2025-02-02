import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://yansongda.cn',
  trailingSlash: "ignore",
	integrations: [],
  vite: {
    plugins: [tailwindcss],
  },
  build: {
    format: "directory",
  }
});
