<template>
  <div>
    <add-customer-modal />
    <b-row>
      <b-col md="4">
        <b-form-group>
          <flat-pickr
            v-model="filterDate"
            class="form-control mt-1"
            :config="{ mode: 'range', locale: Turkish, altInput: true, altFormat: 'd/m/Y' }"
            placeholder="Filtrelemek için tarih aralığı seçin..."
            @input="dateFilter"
          />
        </b-form-group>
      </b-col>
      <b-col offset-md="3" style="gap: 10px" class="my-1 d-flex gap-1">
        <b-input-group class="input-group-merge">
          <b-input-group-prepend is-text>
            <feather-icon icon="SearchIcon" />
          </b-input-group-prepend>
          <b-form-input id="filterInput" v-model="filter" type="search" />
        </b-input-group>
        <b-button v-b-modal.modal-customer-add class="flex-shrink-0" variant="outline-primary">Müşteri Ekle</b-button>
      </b-col>

      <b-col cols="12">
        <b-table
          striped
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="filterDate ? filteredItems : customers"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
          show-empty
          empty-text="Veri Bulunamadı"
          empty-filtered-text="Veri Bulunamadı"
          @row-clicked="customerDetails"
        >
          <template #cell(createdAt)="data">
            <span>{{ DateTime.fromISO(data.item.createdAt).toFormat("dd.MM.yyyy HH:mm") }}</span>
          </template>
        </b-table>
      </b-col>

      <b-col cols="12">
        <b-row>
          <b-col md="2" sm="4" class="my-1">
            <b-form-group class="mb-0">
              <label class="d-inline-block text-sm-left mr-50">Sayfa Düzeni</label>
              <b-form-select id="perPageSelect" v-model="perPage" size="sm" :options="pageOptions" class="w-50" />
            </b-form-group>
          </b-col>
          <b-col cols="8" class="my-1">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="center" size="sm" class="my-0" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import addCustomerModal from "./addCustomerModal.vue";
import flatPickr from "vue-flatpickr-component";
import { Turkish } from "flatpickr/dist/l10n/tr.js";

export default {
  components: {
    addCustomerModal,
    flatPickr,
  },
  data() {
    return {
      ...this.$store.state.app.table,
      perPage: 20,
      pageOptions: [3, 5, 10, 20, 30, 50],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
        { key: "fullname", label: "İsim", sortable: true },
        { key: "phone", label: "Telefon", sortable: true },
        { key: "email", label: "E-Posta", sortable: true },
        { key: "createdAt", label: "Oluşturma Tarihi", sortable: true },
      ],
      DateTime,
      filterDate: null,
      filteredItems: [],
      Turkish,
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter((f) => f.sortable).map((f) => ({ text: f.label, value: f.key }));
    },
    customers() {
      this.totalRows = this.$store.getters.customers.length;
      return this.$store.getters.customers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  mounted() {
    this.$store.dispatch("getCustomers");
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    dateFilter() {
      const dates = this.filterDate.split(" - ");

      const lastDate = dates[1] ? new Date(dates[1]).setDate(new Date(dates[1]).getDate() + 1) : null;

      this.filteredItems = this.customers.filter((item) => {
        if (!lastDate && DateTime.fromISO(item.createdAt).toFormat("yyyy-MM-dd") === dates[0]) return item;
        else if (new Date(item.createdAt) >= new Date(dates[0]) && new Date(item.createdAt) <= lastDate) return item;
      });
      this.filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      this.filterDate ? this.onFiltered(this.filteredItems) : this.onFiltered(this.customers);
    },
    customerDetails(customer) {
      this.$store.commit("setCustomer", customer);
      this.$router.push({ name: "customer-details" });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
