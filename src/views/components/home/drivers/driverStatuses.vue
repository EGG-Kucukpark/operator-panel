<template>
  <div>
    <b-sidebar id="drivers-sidebar" bg-variant="white" shadow right>
      <h3 class="text-center">Sürücüler</h3>
      <hr />
      <b-tabs>
        <b-tab title="Online">
          <b-card-text v-for="driver in onlineDrivers" :key="driver._id" class="container">
            <user-info :name="driver.name" :phone="driver.phone" icon="driver" variant="success" />
          </b-card-text>
        </b-tab>
        <b-tab title="Offline">
          <b-card-text v-for="driver in offlineDrivers" :key="driver._id" class="container">
            <user-info :name="driver.name" :phone="driver.phone" icon="driver" variant="danger" />
          </b-card-text>
        </b-tab>
        <b-tab title="Meşgul/Yolculuk">
          <b-card-text v-for="driver in busyOrTrip" :key="driver._id" class="container">
            <user-info :name="driver.name" :phone="driver.phone" icon="driver" variant="warning" />
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-sidebar>
  </div>
</template>

<script>
import userInfo from "../customers/components/userInfo.vue";

export default {
  components: {
    userInfo,
  },
  props: {
    drivers: {
      type: Array,
      required: true,
    },
  },
  computed: {
    onlineDrivers() {
      return this.drivers.filter((item) => item.status === "online");
    },
    offlineDrivers() {
      return this.drivers.filter((item) => item.status === "offline");
    },
    busyOrTrip() {
      return this.drivers.filter((item) => item.status === "busy" || item.status === "trip");
    },
  },
};
</script>
