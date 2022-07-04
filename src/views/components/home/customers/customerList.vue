<template>
  <b-row>
    <b-col v-for="customer in customers" :key="customer._id" class="business-card mb-1" md="4">
      <customer-card v-if="customer.status === 'online'" :customer="customer" :drivers="drivers" @selectDriver="selectDriver" @cancel="deleteCustomer" />
      <redirected-driver v-else-if="customer.status === 'redirected_driver'" :customer="customer" />
    </b-col>
  </b-row>
</template>

<script>
import customerCard from "./components/customerCard.vue";
import redirectedDriver from "./components/redirectedDriver.vue";
export default {
  components: {
    customerCard,
    redirectedDriver,
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
    deleteCustomer(customer) {
      if (confirm("Müşteriyi iptal etmek istediğinize emin misiniz?")) {
        this.$http
          .post("/webUsers/cancelCab", {
            phone: customer.userPhone,
          })
          .then(() => {
            this.$toastBus.$emit("Notification", {
              title: "Müşteri İptal Edildi",
              variant: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            this.$toastBus.$emit("Notification", {
              title: "Müşteri İptal Edilemedi",
              variant: "error",
            });
          });
      }
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
