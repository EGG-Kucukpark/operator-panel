<template>
  <b-card>
    <b-table responsive="lg" stacked="md" :items="appointments" :fields="fields">
      <template #cell(date)="data">
        <span>{{ DateTime.fromISO(data.item.date).toFormat("dd.MM.yyyy HH:mm") }}</span>
      </template>
      <template #cell(distance)="data"> {{ data.item.distance }} KM </template>
      <template #cell(estimatedPrice)="data"> {{ data.item.estimatedPrice }} ₺ </template>
      <template #cell(status)="data">
        <b-badge :variant="data.item.status === 'waiting' ? 'warning' : data.item.status === 'accepted' ? 'success' : 'danger'" class="badge-glow p-75">
          {{ data.item.status === "waiting" ? "Beklemede" : data.item.status === "accepted" ? "Onaylandı" : "Reddedildi" }}
        </b-badge>
      </template>
      <template #cell(actions)>
        <div class="d-flex">
          <b-button class="d-flex justify-content-center align-items-center" size="sm" variant="success">
            <feather-icon icon="CheckIcon" />
            Onayla
          </b-button>
          <b-button class="d-flex justify-content-center align-items-center ml-50" size="sm" variant="danger">
            <feather-icon icon="XIcon" />
            Reddet
          </b-button>
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { DateTime } from "luxon";

export default {
  data() {
    return {
      appointments: [],
      fields: [
        { key: "customer.fullname", label: "Müşteri" },
        { key: "location.start", label: "Başlangıç" },
        { key: "location.end", label: "Bitiş" },
        { key: "distance", label: "Mesafe" },
        { key: "estimatedPrice", label: "Tahmini Ücret" },
        { key: "date", label: "Randevu Tarihi" },
        { key: "status", label: "Durum" },
        { key: "actions", label: "Eylemler" },
      ],
      DateTime,
    };
  },
  mounted() {
    this.getAppointments();
  },
  methods: {
    getAppointments() {
      this.$http
        .get("/appointments")
        .then((response) => {
          this.appointments = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
