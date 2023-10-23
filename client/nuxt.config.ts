import { resolve } from "path";

export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, "/"),
  },
  css: ["~/assets/main.scss"],
  devtools: { enabled: true },
  svgo: {
    autoImportPath: "./assets/icons/",
  },
  modules: [
    "nuxt-svgo",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  imports: {
    dirs: ["stores"],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
