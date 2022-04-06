<template>
  <b-tabs pills>
    <b-tab title="Güncel Randevular">
      <current-appointments />
    </b-tab>
      <b-tab title="Tamamlanmamış Randevular">
      <active-appointments />
    </b-tab>
      <b-tab title="Tüm Randevular">
      <all-appointments />
    </b-tab>
  </b-tabs>
</template>

<script>
import activeAppointments from '@/views/components/appointments/activeAppointments.vue'
import allAppointments from '@/views/components/appointments/allAppointments.vue'
import currentAppointments from '@/views/components/appointments/currentAppointments.vue'

export default {
  components: {
    activeAppointments,
    allAppointments,
    currentAppointments
  },




}
</script>
 