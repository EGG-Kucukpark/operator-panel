<template>
  <b-row>
    <b-col v-for="customer in customers" :key="customer._id" class="business-card mb-1" md="4">
      <customer-card :customer="customer" :drivers="drivers" @selectDriver="selectDriver" />
    </b-col>
  </b-row>
</template>

<script>
import customerCard from "./components/customerCard.vue";
export default {
  components: {
    customerCard,
  },
  props: {
    customers: {
      type: Array,
      required: true,
    },
    drivers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: "customer", label: "Müşteri" },
        { key: "note", label: "Not" },
        { key: "driver", label: "Aktif Sürücüler" },
        { key: "redirect", label: "Yönlendirme" },
      ],
    };
  },
  methods: {
    selectDriver(driver, customer, note) {
      this.$toastBus.$emit("toast", { type: "redirect" });
      this.$socket.emit("customerLocationApp", {
        driver,
        customer: customer._id,
        note,
      });
    },
  },
};
</script>

<style>
.v-text-field input::placeholder {
  opacity: 0.3;
}
.v-text-field input {
  border-radius: 50px;
}
</style>
