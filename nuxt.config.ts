import { Context } from "vm"
import { Configuration } from "@nuxt/types"
import locale from "./src/locale"

const config: Configuration = {
  build: {
    extend(config: any, context: Context) {
      config.module.rules.push({
        test: /\.(postcss)$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
          },
        ],
      })
    },
    loaders: {
      sass: {
        import: ["~assets/style/app.sass"],
        implementation: require("sass"),
      },
    },
    transpile: ["vuetify/lib"],
  },
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify", "@nuxtjs/dotenv"],
  generate: {
    fallback: true,
  },
  head: {
    titleTemplate: "%s - Ikamu.io",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap",
      },
    ],
  },
  ssr: false,
  modules: [
    [
      "nuxt-i18n",
      {
        locales: ["en"],
        defaultLocale: "en",
        vueI18n: locale,
        strategy: "no_prefix",
      },
    ],
    [
      "@nuxtjs/onesignal",
      {
        init: {
          appId: process.env.NUXT_ENV_ONESIGNAL_APP_ID,
          allowLocalhostAsSecureOrigin: true,
          welcomeNotification: {
            disable: true,
          },
          autoResubscribe: true,
          autoRegister: false,
        },
      },
    ],
    ["@nuxtjs/pwa", {}],
    ["@nuxtjs/axios", {}],
    [
      "@nuxtjs/toast",
      {
        position: "top-center",
        duration: 5000,
        fullWidth: true,
        fitToScreen: true,
        register: [],
      },
    ],
    [
      "@nuxtjs/auth",
      {
        redirect: {
          login: "/",
          callback: "/callback/",
          home: "/feed",
        },
        strategies: {
          local: false,
          auth0: {
            domain: process.env.NUXT_ENV_OAUTH_CLIENT_DOMAIN,
            client_id: process.env.NUXT_ENV_OAUTH_CLIENT_ID,
            audience: process.env.NUXT_ENV_OAUTH_AUDIENCE,
          },
        },
        plugins: ["~/plugins/repository"],
      },
    ],
  ],
  plugins: ["~/plugins/localstorage", "~/plugins/vuebar"],
  srcDir: "src/",
  server: {
    port: process.env.NUXT_ENV_PORT,
    host: "0.0.0.0",
  },
  typescript: {
    typeCheck: false,
    ignoreNotFoundWarnings: true,
  },
}

export default config
