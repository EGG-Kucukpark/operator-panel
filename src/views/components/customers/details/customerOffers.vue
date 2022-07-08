<template>
  <b-table responsive="lg" stacked="md" :items="offers" :fields="fields" show-empty empty-text="Teklif Bulunmamaktadır.">
    <template #cell(status)="data">
      <b-badge :variant="data.item.status === 'waiting' ? 'warning' : data.item.status === 'accepted' ? 'success' : 'danger'" class="badge-glow p-75">
        {{ data.item.status === "waiting" ? "Beklemede" : data.item.status === "accepted" ? "Onaylandı" : data.item.status === "expired" ? "Zaman Aşımı" : "Reddedildi" }}
      </b-badge>
    </template>
    <template #cell(offeredPrice)="data"> {{ data.item.offeredPrice }} ₺</template>
    <template #cell(estimatedKm)="data"> {{ data.item.estimatedKm }} KM</template>
    <template #cell(estimatedPrice)="data"> {{ data.item.estimatedPrice }} ₺</template>
    <template #cell(createdAt)="data">
      <span>{{ DateTime.fromISO(data.item.createdAt).toFormat("dd.MM.yyyy HH:mm") }}</span>
    </template>
  </b-table>
</template>

<script>
import { DateTime } from "luxon";
export default {
  props: {
    offers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: "location.start", label: "Başlangıç" },
        { key: "location.end", label: "Varış" },
        { key: "estimatedPrice", label: "Tahmini Fiyat" },
        { key: "estimatedKm", label: "Tahmini KM" },
        { key: "offeredPrice", label: "Teklif" },
        { key: "createdAt", label: "Tarih" },
        { key: "status", label: "Durum" },
      ],
      DateTime,
    };
  },
};
</script>
