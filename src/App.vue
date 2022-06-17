<template>
  <div id="app" class="h-100" :class="[skinClasses]">
    <component :is="layout">
      <router-view />
    </component>
    <toasts />
  </div>
</template>

<script>
// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from "@themeConfig";
import { provideToast } from "vue-toastification/composition";
import { watch } from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";
import { useWindowSize, useCssVar } from "@vueuse/core";
import toasts from "@/views/components/toasts";
import toastBus from "@/eventBus";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import store from "@/store";

const LayoutVertical = () => import("@/layouts/vertical/LayoutVertical.vue");
const LayoutHorizontal = () =>
  import("@/layouts/horizontal/LayoutHorizontal.vue");
const LayoutFull = () => import("@/layouts/full/LayoutFull.vue");

export default {
  components: {
    LayoutHorizontal,
    LayoutVertical,
    LayoutFull,
    toasts,
  },

  computed: {
    layout() {
      if (this.$route.meta.layout === "full") return "layout-full";
      return `layout-${this.contentLayoutType}`;
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type;
    },
  },
  mounted() {
    this.$toastBus.$on("Notification", (data) => {
      const variantIcon = {
        success: "CheckCircleIcon",
        danger: "AlertTriangleIcon",
        info: "InfoIcon",
      };
      this.$toast({
        component: ToastificationContent,
        props: {
          title: data.title,
          icon: variantIcon[data.variant],
          variant: data.variant,
        },
      });
    });
    this.$socket.on("notification", (data) => {
      this.notification(data);
    });
  },

  beforeCreate() {
    // Set colors in theme
    const colors = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark",
    ];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(
        `--${colors[i]}`,
        document.documentElement
      ).value.trim();
    }

    // Set Theme Breakpoints
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(
        useCssVar(
          `--breakpoint-${breakpoints[i]}`,
          document.documentElement
        ).value.slice(0, -2)
      );
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout;
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  },

  methods: {
    notification(data) {
      Notification.requestPermission((result) => {
        if (result === "granted") {
          new Notification("Hey Taksi Yeni Bildirim Var", {
            body: "Hey Taksi Yeni Bildirim Var",
          });
        }

        toastBus.$emit("toast", data);
      });
    },
  },

  setup() {
    const { skin, skinClasses } = useAppConfig();

    // If skin is dark when initialized => Add class to body
    if (skin.value === "dark") document.body.classList.add("dark-layout");

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: "Vue-Toastification__fade",
    });

    // Set Window Width in store
    store.commit("app/UPDATE_WINDOW_WIDTH", window.innerWidth);
    const { width: windowWidth } = useWindowSize();
    watch(windowWidth, (val) => {
      store.commit("app/UPDATE_WINDOW_WIDTH", val);
    });

    return {
      skinClasses,
    };
  },
};
</script>
