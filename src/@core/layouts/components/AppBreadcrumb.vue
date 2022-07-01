<template>
  <b-row v-if="$route.meta.breadcrumb || $route.meta.pageTitle" class="content-header">
    <!-- Content Left -->
    <b-col class="content-header-left mb-2" cols="12" md="9">
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <h2 class="content-header-title float-left pr-1 mb-0">
            {{ $route.meta.pageTitle }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon icon="HomeIcon" size="16" class="align-text-top" />
              </b-breadcrumb-item>
              <b-breadcrumb-item v-for="item in $route.meta.breadcrumb" :key="item.text" :active="item.active" :to="item.to">
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <b-col v-if="this.$route.meta.pageTitle === 'Ana Panel'" class="mb-1" md="3" cols="12">
      <div style="margin-left: 12px; align-items: center" class="d-flex justify-content-end">
        <b-button v-b-toggle.drivers-sidebar variant="success" size="sm" class="d-flex mr-1">Sürücüler</b-button>
        <h1>Otopilot</h1>
        <b-form-checkbox v-model="autopilot" @change="autopilotChanged" style="margin-left: 10px" class="custom-control-success" name="check-button" switch /></div
    ></b-col>
  </b-row>
</template>

<script>
import { BBreadcrumb, BBreadcrumbItem, BRow, BCol, BDropdown, BDropdownItem, BButton } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  data() {
    return {
      autopilot: false,
    };
  },
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  methods: {
    autopilotChanged() {
      this.$socket.emit("autoTrip", this.autopilot);
      this.$socket.emit("customerLocation", this.autopilot);
    },
  },
  mounted() {
    this.$socket.emit("autoTripData");
    this.$socket.on("autoTripMsg", (data) => {
      this.autopilot = data;
    });
  },
};
</script>
