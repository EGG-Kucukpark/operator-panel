<template>
  <div>
    <driver-statuses :drivers="drivers" />
    <app-collapse class="mb-2">
      <customers-collapse-vue :customersLength="customers.filter((item) => item.status === 'online').length" title="Müşteriler">
        <customer-list-vue :customers="customers" :drivers="drivers" />
      </customers-collapse-vue>
    </app-collapse>
    <app-collapse class="mb-2">
      <app-collapse-item title="Teklifler">
        <discountOffers />
      </app-collapse-item>
    </app-collapse>

    <!-- MAP -->
    <Map :customers="customers" :drivers="drivers" :mapOptions="mapOptions" />
    <!-- MAP END -->

    <!-- CARDS -->
    <!--  <b-row class="match-height"> -->
    <!-- Driver Cards -->
    <!-- <b-col v-for="header in headers" :key="header" sm="12" lg="3">
        <Drivers-card :cardHeader="header" :drivers="drivers" @showDriver="setCenter" />
      </b-col> -->
    <!-- Customer Card -->
    <!-- <b-col sm="12" lg="3">
        <Customers-card :customers="customers" @showCustomer="setCenter" />
      </b-col> -->

    <!-- Driver Redirect -->
    <!-- <b-col lg="12" md="12">
        <Driver-redirect :drivers="drivers" :customers="customers" />
      </b-col> -->
    <!-- Driver Redirect End -->
    <!-- </b-row> -->
    <!-- CARDS END -->
  </div>
</template>

<script>
import DriversCard from "../components/home/driversCard.vue";
import CustomersCard from "../components/home/customersCard.vue";
import DriverRedirect from "../components/home/driverRedirect.vue";
import Map from "../components/home/map.vue";
import discountOffers from "../components/home/discountOffers.vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import customersCollapseVue from "../components/customers/customersCollapse.vue";
import customerListVue from "../components/home/customers/customerList.vue";
import driverStatuses from "../components/home/drivers/driverStatuses.vue";
import { DateTime } from "luxon";
export default {
  components: {
    DriversCard,
    CustomersCard,
    DriverRedirect,
    Map,
    discountOffers,
    AppCollapse,
    AppCollapseItem,
    customersCollapseVue,
    customerListVue,
    driverStatuses,
  },
  data() {
    return {
      DateTime,
      headers: ["Online", "Offline", "Meşgul / Yolculuk"],
      drivers: [],
      customers: [],
      mapOptions: {
        center: { lat: 38.444851, lng: 27.180703 },
        zoom: 12,
      },
    };
  },

  mounted() {
    this.getCustomers();
    this.getDrivers();
    this.$socket.on("customerLoc", (data) => {
      this.getCustomers();
    });
    this.$socket.on("driverLoc", (data) => {
      this.getDrivers();
    });
    this.$socket.on("newCustomer", () => {
      this.getCustomers();
      this.$socket.emit("customerLocation");
    });
    this.$socket.on("newOffer", () => {
      this.$store.dispatch("getOffers");
    });

    this.$store.dispatch("getOffers");
  },

  methods: {
    getDrivers() {
      this.$http("/driverTrack").then((res) => {
        this.drivers = res.data;
      });
    },
    getCustomers() {
      this.$http("/instCustomerLocation").then((res) => {
        /* res.data.map((item) => {
          const currentDate = DateTime.now().toISO();
          const diff = DateTime.fromISO(currentDate).diff(DateTime.fromISO(item.createdAt), "minutes");
          item.duration = parseInt(diff.minutes);
          if (item.duration > 30) {
            res.data.splice(res.data.indexOf(item), 1);
          }
        }); */

        this.customers = res.data;
      });
    },
    setCenter(data) {
      this.mapOptions.zoom = 20;
      this.mapOptions.center = { lat: data.lat, lng: data.lng };
      const container = document.getElementById("map");
      container.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style>
.infowi .infowi .infowindow {
  width: 250px;
  height: 60px;
  display: flex !important;
  flex-direction: column !important;

  border-radius: 10px;
}

.gm-style .gm-style-iw-t::after {
  top: -40px !important;
}

.gm-style-iw {
  top: -50px !important;
}

.style-chooser .vs__search {
  height: 28px;
  border: none;
}

.pagination {
  display: flex;
  margin: 0.1rem 0.25rem 0;
  justify-content: space-around;
}
</style>
