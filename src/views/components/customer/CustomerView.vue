<template>
  <div>
    <template>
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="12"
          lg="8"
          md="12"
        >
          <customer-view-user-info-card :user-data="userData" />
        </b-col>
        <b-col
          cols="12"
          xl="12"
          lg="8"
          md="12"
        >
          <b-tabs
            pills
            lazy
          >
            <b-tab title="Yolculuklar">
              <customer-view-trips-table :user-data="userData" />
            </b-tab>
            <b-tab title="Adresler">
              <customer-view-addresses-table :user-data="userData" />
            </b-tab>
            <b-tab title="Randevular">
              <customer-view-appointments-table :user-data="userData" />
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>

import CustomerViewUserInfoCard from './CustomerViewUserInfoCard.vue'
import CustomerViewTripsTable from './CustomerViewTripsTable.vue'
import CustomerViewAddressesTable from './CustomerViewAddressesTable.vue'
import CustomerViewAppointmentsTable from './CustomerViewAppointmentsTable.vue'

export default {
  components: {
    CustomerViewUserInfoCard,
    CustomerViewTripsTable,
    CustomerViewAddressesTable,
    CustomerViewAppointmentsTable,

  },
  data() {
    return {
      userData: '',
    }
  },
  mounted() {
    if (this.$store.getters['general/customerId'] === '') {
      this.$router.push('/musteriler')
    } else {
      this.$http('/customer', {
        params: {
          id: this.$store.getters['general/customerId'],
          phone: this.$store.getters['general/customerPhone'],
        },
      }).then(response => {
        this.userData = response.data
      })
    }
  },

}
</script>

<style>
</style>
