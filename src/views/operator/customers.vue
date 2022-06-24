<template>
  <b-tabs lazy>
    <b-tab title="Whatsapp Kullanıcılar">
      <subs />
    </b-tab>
    <b-tab title="Web Kullanıcılar">
      <b-card>
        <webUsersVue />
      </b-card>
    </b-tab>
    <b-tab title="Red Listesi">
      <unsubs />
    </b-tab>
  </b-tabs>
</template>
<script>
import subs from "../components/customers/subs.vue";
import unsubs from "../components/customers/unsubs.vue";
import webUsersVue from "../components/customers/webUsers.vue";

export default {
  components: {
    subs,
    unsubs,
    webUsersVue,
  },
};
</script>
