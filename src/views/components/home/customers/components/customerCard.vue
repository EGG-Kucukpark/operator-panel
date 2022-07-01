<template>
  <!-- <b-table responsive="md" stacked="lg" :items="customers" :fields="fields" show-empty empty-text="Aktif Müşteri Bulunmamaktadır.">
    <template #cell(customer)="data">
      <b-media no-body>
        <b-media-aside>
          <b-avatar size="42" :variant="data.item.status === 'online' ? 'success': 'warning'">
            <feather-icon size="18" icon="UserIcon" />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6>
            {{ data.item.userName }}
          </h6>
          <small>{{ data.item.userPhone }}</small>
        </b-media-body>
      </b-media>
    </template>
    <template #cell(driver)>
      <v-select class="v-text-field" placeholder="Sürücü Seçiniz..." v-model="selectedDriver" :options="drivers.filter((item) => item.status === 'online')" label="name">
        <template #no-options> Aktif Sürücü Bulunamadı... </template>
      </v-select>
    </template>
    <template #cell(note)>
      <b-form-input size="sm" v-model="note" placeholder="Not giriniz..." />
    </template>
    <template #cell(redirect)>
      <div class="d-flex">
        <b-button class="d-flex justify-content-center align-items-center" @click="acceptOffer(data.item)" size="sm" variant="success">
          Yönlendir
          <feather-icon class="ml-50" icon="NavigationIcon" />
        </b-button>
        <b-button @click="rejectOffer(data.item)" class="d-flex justify-content-center align-items-center ml-50" size="sm" variant="danger">
          İptal Et
          <feather-icon class="ml-25" icon="XIcon" />
        </b-button>
      </div>
    </template>
  </b-table> -->
  <div class="business-items">
    <div class="business-item badge-glow">
      <div class="d-flex justify-content-between align-items-center">
        <userInfo v-if="tripdriver" class="mr-1" :name="tripdriver.name" :phone="tripdriver.phone" icon="NavigationIcon" variant="warning" />
        <span v-if="tripdriver"><feather-icon size="20" icon="ChevronsRightIcon" /></span>
        <userInfo :name="customer.userName" :phone="customer.userPhone" icon="UserIcon" :variant="customer.status === 'online' ? 'success' : 'warning'" />
      </div>

      <div v-if="customer.status === 'online'">
        <v-select class="v-text-field mt-1" placeholder="Sürücü Seçiniz..." v-model="selectedDriver" :options="drivers.filter((item) => item.status === 'online')" label="name">
          <template #no-options> Aktif Sürücü Bulunamadı... </template>
        </v-select>
        <b-form-input v-if="noteinput" size="sm" class="mt-75" v-model="note" placeholder="Not giriniz..." />
        <div class="d-flex justify-content-between mt-1">
          <b-button @click="(noteinput = !noteinput), (note = null)" class="d-flex justify-content-center align-items-center" size="sm" variant="info">
            Not Ekle
            <feather-icon class="ml-50" icon="PaperclipIcon" />
          </b-button>
          <b-button
            @click="$emit('selectDriver', selectedDriver, customer, note)"
            class="d-flex justify-content-center align-items-center"
            size="sm"
            variant="success"
            :disabled="!selectedDriver"
          >
            Yönlendir
            <feather-icon class="ml-50" icon="NavigationIcon" />
          </b-button>
          <b-button class="d-flex justify-content-center align-items-center" size="sm" variant="danger">
            İptal Et
            <feather-icon class="ml-50" icon="XIcon" />
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userInfo from "./userInfo.vue";

export default {
  data() {
    return {
      selectedDriver: null,
      note: null,
      noteinput: false,
    };
  },
  components: {
    userInfo,
  },
  computed: {
    tripdriver() {
      return this.drivers.find((item) => item.customerPhone === this.customer.userPhone);
    },
  },
  props: {
    customer: {
      type: Object,
      required: true,
    },
    drivers: {
      type: Array,
      required: true,
    },
  },
};
</script>
