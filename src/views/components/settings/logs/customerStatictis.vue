<template>
  <b-row v-if="statictis" class="match-height">
    <b-col xl="2" md="4" sm="6">
      <statistic-card-vertical icon="UserIcon" :statistic="statictis.requestedCabs" statistic-title="Taksi Çağıran Müşteriler" color="primary" />
    </b-col>
    <b-col xl="2" md="4" sm="6">
      <statistic-card-vertical icon="XIcon" :statistic="statictis.canceledCabs" statistic-title="Taksi İptal Sayısı" color="danger" />
    </b-col>
    <b-col xl="2" md="4" sm="6">
      <statistic-card-vertical icon="NavigationIcon" :statistic="statictis.trips" statistic-title="Yapılan Yolculuk Sayısı" color="success" />
    </b-col>
  </b-row>
</template>

<script>
import StatisticCardVertical from "@core/components/statistics-cards/StatisticCardVertical.vue";

export default {
  data() {
    return {
      statictis: null,
    };
  },
  components: {
    StatisticCardVertical,
  },
  methods: {
    getCustomerIstatistics() {
      this.$http
        .get("/customer-logs")
        .then((response) => {
          this.statictis = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getCustomerIstatistics();
  },
};
</script>
