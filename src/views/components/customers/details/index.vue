<template>
  <div>
    <customer-info-card :tripLength="tripHistory.length" :offerLength="offerHistory.length" />
    <b-tabs>
      <b-tab title="Geçmiş Yolculuklar">
        <b-card>
          <customer-trips :trips="tripHistory" />
        </b-card>
      </b-tab>
     <!--  <b-tab title="Randevular">
        <b-card>
          <customer-trips :trips="tripHistory" />
        </b-card>
      </b-tab> -->
      <b-tab title="Teklifler">
        <b-card>
          <customer-offers :offers="offerHistory" />
        </b-card>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import customerInfoCard from "./customerInfoCard.vue";
import customerTrips from "./customerTrips.vue";
import customerOffers from "./customerOffers.vue";
export default {
  components: {
    customerInfoCard,
    customerTrips,
    customerOffers,
  },
  data() {
    return {
      tripHistory: [],
      offerHistory: [],
    };
  },
  mounted() {
    this.getTripHistory();
    this.getOfferHistory();
  },
  computed: {
    customer() {
      return this.$store.getters.customer;
    },
  },
  methods: {
    getTripHistory() {
      this.$http
        .get("trips/customer", {
          params: {
            phone: this?.customer?.phone,
          },
        })
        .then((response) => {
          this.tripHistory = response.data;
        });
    },
    getOfferHistory() {
      this.$http
        .get("/discountOffers/user", {
          params: {
            id: this?.customer?._id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.offerHistory = response.data;
        });
    },
  },
};
</script>
