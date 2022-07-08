<template>
  <b-table :items="trips" :fields="fields" show-empty empty-text="Yolculuk Bulunmamaktadır.">
    <template #cell(driverInfo)="data">
      {{ data.item.driverName }} <br />
      <small>{{ data.item.driverPhone }}</small>
    </template>
    <template #cell(distance)="data"> {{ data.item.distance }} KM </template>
  </b-table>
</template>

<script>
export default {
  props: {
    trips: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: "driverInfo", label: "Sürücü Adı" },
        { key: "customerAddressLocation.start", label: "Başlangıç Konumu" },
        { key: "customerAddressLocation.end", label: "Bitiş Konumu" },
        { key: "distance", label: "Gidilen Mesafe" },
        { key: "start", label: "Başlangıç Tarihi" },
        { key: "end", label: "Bitiş Tarihi" },
      ],
    };
  },
};
</script>
