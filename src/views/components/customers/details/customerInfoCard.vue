<template>
  <b-card v-if="customer" class="d-flex">
    <b-row>
      <!-- User Info: Left col -->
      <b-col class="d-flex justify-content-between flex-column">
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar size="70px" rounded variant="light-primary">
            <feather-icon size="30" icon="UserIcon" />
          </b-avatar>
          <div class="d-flex flex-column ml-2">
            <div class="mb-1">
              <h4 class="">{{ customer.fullname }}</h4>
              <small class="card-text">{{ customer.phone }}</small
              ><br />
              <small>{{ customer.email }}</small>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="12" xl="4">
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon icon="UserIcon" class="mr-75" />
              <span class="font-weight-bold">Toplam Yolculuk</span>
            </th>
            <td class="pb-50">{{ tripLength }}</td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="UserIcon" class="mr-75" />
              <span class="font-weight-bold">Teklifler</span>
            </th>
            <td class="pb-50">{{offerLength}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  computed: {
    customer() {
      return this.$store.getters.customer;
    },
  },
  props: {
    tripLength: {
      type: Number,
    },
    offerLength: {
      type: Number,
    },
  },
};
</script>

<style></style>
