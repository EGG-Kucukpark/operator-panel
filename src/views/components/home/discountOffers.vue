<template>
  <b-table
    responsive="sm"
    :items="discountOffers"
    :fields="fields"
    show-empty
    empty-text="Teklif Bulunmamaktadır."
  >
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
      <b-badge
        :variant="
          data.item.status === 'waiting'
            ? 'warning'
            : data.item.status === 'accepted'
            ? 'success'
            : 'danger'
        "
        class="badge-glow p-75"
      >
        {{
          data.item.status === "waiting"
            ? "Beklemede"
            : data.item.status === "accepted"
            ? "Onaylandı"
            : "Reddedildi"
        }}
      </b-badge>
    </template>
    <template #cell(offeredPrice)="data">
      {{ data.item.offeredPrice }} TL
    </template>
    <template #cell(estimatedPrice)="data">
      {{ data.item.estimatedPrice }} TL
    </template>
    <template #cell(actions)="data">
      <div v-if="data.item.status === 'waiting'" class="d-flex">
        <b-button
          class="d-flex justify-content-center align-items-center"
          @click="acceptOffer(data.item)"
          size="sm"
          variant="success"
        >
          <feather-icon icon="CheckIcon" />
          Onayla
        </b-button>
        <b-button
          @click="rejectOffer(data.item)"
          class="d-flex justify-content-center align-items-center ml-50"
          size="sm"
          variant="danger"
        >
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
      discountOffers: [],
      fields: [
        { key: "user", label: "Kullanıcı" },
        { key: "estimatedPrice", label: "Tahmini Fiyat" },
        { key: "offeredPrice", label: "Teklif" },
        { key: "location.start", label: "Başlangıç" },
        { key: "location.end", label: "Varış" },
        { key: "status", label: "Durum" },
        { key: "actions", label: "Eylemler" },
      ],
      DateTime,
    };
  },
  mounted() {
    this.getData();
    this.$socket.on("customerLoc", () => {
      this.getData();
    });
  },
  methods: {
    getData() {
      this.$http
        .get("/discountOffers")
        .then((response) => {
          this.discountOffers = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    acceptOffer(offer) {
      this.$http
        .post("/discountOffers/accept", {
          phone: offer.user.phone,
          offeredPrice: offer.offeredPrice,
          user: offer.user,
          location: offer.location.start,
        })
        .then(() => {
          this.getData();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.$toastBus.$emit("Notification", {
              title: "Aktif sürücü bulunamadı.",
              variant: "danger",
            });
          }
        });
    },
    rejectOffer(offer) {
      this.$http
        .post("/discountOffers/reject", {
          offerId: offer._id,
        })
        .then(() => {
          this.getData();
          this.$toastBus.$emit("Notification", {
            title: "Teklif Reddedildi",
            variant: "success",
          });
        })
        .catch((error) => {
          console.log(error.response.data);
          this.$toastBus.$emit("Notification", {
            title: "Hata oluştu",
            variant: "danger",
          });
        });
    },
  },
};
</script>
