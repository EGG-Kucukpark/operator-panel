<template>
  <div>
    <template>
      <!-- First Row -->
      <b-row>
        <b-col cols="12" xl="12" lg="8" md="12">
          <driver-view-user-info-card :user-data="userData" />
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'


import DriverViewUserInfoCard from './DriverViewUserInfoCard.vue'


export default {
  components: {

    DriverViewUserInfoCard,

  },
  setup() {
    const userData = ref(null)


    return {
      userData,
    }
  },
}
</script>

<style>
</style>
