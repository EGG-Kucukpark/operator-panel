<template>
  <b-tabs pills>
    <b-tab title="Kayıtlar">
      <Logs />
    </b-tab>
    <b-tab title="Sürücü Kayıtlar">
      <b-card>
        <DriverLogs />
      </b-card>
    </b-tab>
    <b-tab title="Detaylı Kayıtlar">
      <Detailed />
    </b-tab>
    <b-tab title="Müşteri Taksi Kayıtları">
      <customerStatictis />
      <b-card>
        <customerLogList />
      </b-card>
    </b-tab>
  </b-tabs>
</template>

<script>
import Logs from "../../components/settings/logs/logs.vue";
import Detailed from "../../components/settings/logs/detailed_logs.vue";
import DriverLogs from "../../components/settings/logs/driver_logs.vue";
import customerStatictis from "@/views/components/settings/logs/customerStatictis.vue";
import customerLogList from "@/views/components/settings/logs/customerLogList.vue";
export default {
  components: {
    Logs,
    Detailed,
    DriverLogs,
    customerStatictis,
    customerLogList,
  },
};
</script>
