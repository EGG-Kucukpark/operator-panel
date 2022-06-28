<template>
  <b-table responsive="lg" stacked="md" :items="offers" :fields="fields" show-empty empty-text="Teklif Bulunmamaktadır.">
    <template #cell(user)="data">
      <div class="d-flex flex-column">
        <span class="font-weigth-bolder mb-25">
          {{ data.item.user.fullname }}
        </span>
        <span class="font-small-3 text-nowrap">
          {{ data.item.user.phone }}
        </span>
      </div>
    </template>
    <template #cell(status)="data">
      <b-badge :variant="data.item.status === 'waiting' ? 'warning' : data.item.status === 'accepted' ? 'success' : 'danger'" class="badge-glow p-75">
        {{ data.item.status === "waiting" ? "Beklemede" : data.item.status === "accepted" ? "Onaylandı" : "Reddedildi" }}
      </b-badge>
    </template>
    <template #cell(offeredPrice)="data"> {{ data.item.offeredPrice }} ₺</template>
    <template #cell(estimatedKm)="data"> {{ data.item.estimatedKm }} KM</template>
    <template #cell(estimatedPrice)="data"> {{ data.item.estimatedPrice }} ₺</template>
    <template #cell(createdAt)="data">
      <span>{{ DateTime.fromISO(data.item.createdAt).toFormat("dd.MM.yyyy HH:mm") }}</span>
    </template>
    <template #cell(actions)="data">
      <div v-if="data.item.status === 'waiting'" class="d-flex">
        <b-button class="d-flex justify-content-center align-items-center" @click="acceptOffer(data.item)" size="sm" variant="success">
          <feather-icon icon="CheckIcon" />
          Onayla
        </b-button>
        <b-button @click="rejectOffer(data.item)" class="d-flex justify-content-center align-items-center ml-50" size="sm" variant="danger">
          <feather-icon icon="XIcon" />
          Reddet
        </b-button>
      </div>
    </template>
  </b-table>
</template>

<script>
import { DateTime } from "luxon";
export default {
  data() {
    return {
      fields: [
        { key: "user", label: "Kullanıcı" },
        { key: "estimatedPrice", label: "Tahmini Fiyat" },
        { key: "estimatedKm", label: "Tahmini KM" },
        { key: "offeredPrice", label: "Teklif" },
        { key: "location.start", label: "Başlangıç" },
        { key: "location.end", label: "Varış" },
        { key: "createdAt", label: "Tarih" },
        { key: "status", label: "Durum" },
        { key: "actions", label: "Eylemler" },
      ],
      DateTime,
    };
  },
  computed: {
    offers() {
      return this.$store.getters.getWaitingOffers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    acceptOffer(offer) {
      this.$store.dispatch("acceptOffer", offer);
    },
    rejectOffer(offer) {
      this.$store.dispatch("rejectOffer", offer);
    },
  },
};
</script>
