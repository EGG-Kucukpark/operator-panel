<template>
  <div class>
    <b-form @submit.prevent="sendData">
      <b-row>
        <b-col md="12">
          <b-col md="6">
            <b-form-group label="Km Ücreti" label-for="mc-first-name">
              <b-form-input
                id="mc-first-name"
                v-model="price"
                placeholder="Km Ücreti"
              />
            </b-form-group>
          </b-col>
        </b-col>
        <b-col md="12">
          <b-col md="6">
            <b-form-group label="Tahmini Km Ücreti" label-for="mc-first-name">
              <b-form-input
                id="mc-first-name"
                v-model="estimatedPrice"
                placeholder="Km Ücreti"
              />
            </b-form-group>
          </b-col>
        </b-col>

        <b-col md="12">
          <b-col md="6">
            <b-form-group
              label="Bekleme Dakika Ücreti"
              label-for="mc-first-name"
            >
              <b-form-input
                id="mc-first-name"
                v-model="waitPrice"
                placeholder="Bekleme Dakika Ücreti"
              />
            </b-form-group>
          </b-col>
        </b-col>
        <b-col md="12">
          <b-col md="6">
            <b-form-group label="Minimum Ücret" label-for="mc-first-name">
              <b-form-input
                id="mc-first-name"
                v-model="minPrice"
                placeholder="Minimum Ücret"
              />
            </b-form-group>
          </b-col>
        </b-col>
        <b-col md="12">
          <b-col lg="6">
            <b-form-group
              label="Yolcuya Gitme Km Ücreti"
              label-for="mc-first-name"
            >
              <b-form-input
                id="mc-first-name"
                v-model="toCustomer"
                placeholder="Yolcuya Gitme Km Ücreti"
              />
            </b-form-group>
          </b-col>
        </b-col>

        <b-col lg="12">
          <b-col lg="6">
            <b-form-group label="Başlangıç" label-for="mc-first-name">
              <b-form-timepicker v-model="times.start" locale="tr" />
            </b-form-group>

            <b-form-group label="Bitiş" label-for="mc-first-name">
              <b-form-timepicker v-model="times.end" locale="tr" />
            </b-form-group>
          </b-col>
        </b-col>
        <!-- submit and reset -->
        <b-col md="12">
          <b-col md="6">
            <b-button type="submit" variant="primary" class="mr-1"
              >Kaydet</b-button
            >
            <b-button @click="getData" variant="outline-secondary"
              >Sıfırla</b-button
            >
          </b-col>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import toastBus from "@/eventBus";

export default {
  data() {
    return {
      price: "",
      waitPrice: "",
      minPrice: "",
      estimatedPrice: "",
      times: {
        start: "",
        end: "",
      },
      toCustomer: "",
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.$http.get("/options").then((res) => {
        this.price = res.data.price;
        this.estimatedPrice = res.data.estimatedPrice;
        this.waitPrice = res.data.waitPrice;
        this.minPrice = res.data.minPrice;
        this.times.start = res.data.times.start;
        this.times.end = res.data.times.end;
        this.toCustomer = res.data.toCustomer;
      });
    },

    sendData() {
      this.$http
        .put("/options", {
          price: this.price,
          waitPrice: this.waitPrice,
          estimatedPrice: this.estimatedPrice,
          minPrice: this.minPrice,
          times: this.times,
          toCustomer: this.toCustomer,
        })
        .then((res) => {
          this.getData();
          toastBus.$emit("toast", { type: "success" });
        })
        .catch((error) => {
          toastBus.$emit("toast", { type: "error" });
        });
    },
  },
};
</script>

<style></style>
