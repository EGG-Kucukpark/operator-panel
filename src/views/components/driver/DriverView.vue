<template>
  <div>
    <template>
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
          <driver-view-user-info-card :user-data="userData" />
        </b-col>
        <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
          <driver-view-trips-table :user-data="userData" />
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>

import DriverViewUserInfoCard from './DriverViewUserInfoCard.vue'
import DriverViewTripsTable from './DriverViewTripsTable.vue'

export default {
  components: {
    DriverViewUserInfoCard,
    DriverViewTripsTable,
  },
  data() {
    return {
      userData: {},
    }
  },
  mounted() {
    this.$http(`/driver`, {
      params: {
        id: this.$route.params.id,
      },
    }).then(response => {
      this.userData = response.data
      console.log(this.userData)
    })
  },

}
</script>

 