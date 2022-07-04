<template>
  <div class="business-items">
    <div class="business-item">
      <div class="d-flex justify-content-between align-items-center">
        <userInfo class="mr-1" :name="customer.userName" :phone="customer.userPhone" icon="UserIcon" variant="warning" />
        <span><feather-icon size="20" icon="ChevronsRightIcon" /></span>
        <userInfo :name="customer.driver.name" class="mr-1" :phone="customer.driver.phone" icon="driver" variant="warning" />
      </div>
    </div>
  </div>
</template>

<script>
import userInfo from "./userInfo.vue";

export default {
  components: {
    userInfo,
  },
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
};
</script>
