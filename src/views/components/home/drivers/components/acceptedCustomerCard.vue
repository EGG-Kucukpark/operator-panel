<template>
  <div class="business-items">
    <div class="business-item business-item-driver">
      <div v-if="driver.status === 'busy'" class="d-flex justify-content-between align-items-center">
        <userInfo class="mr-1" :name="driver.name" :phone="driver.phone" icon="driver" variant="warning" />
        <span><feather-icon size="20" icon="ChevronsRightIcon" /></span>
        <userInfo :name="driver.customerName" class="mr-1" :phone="driver.customerPhone" icon="UserIcon" variant="warning" />
      </div>
      <div v-else-if="driver.status === 'trip'" class="d-flex justify-content-around align-items-center">
        <userInfo class="mr-1" :name="driver.name" :phone="driver.phone" icon="driver" variant="primary" />
        <userInfo :name="driver.customerName" :phone="driver.customerPhone" icon="UserIcon" variant="primary" />
      </div>
    </div>
  </div>
</template>

<script>
import userInfo from "../../customers/components/userInfo.vue";
export default {
  components: {
    userInfo,
  },
  props: {
    driver: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.business-item-driver {
  padding: 0.6rem !important;
}
</style>
