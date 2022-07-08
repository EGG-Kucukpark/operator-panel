<template>
  <div>
    <b-col cols="4" class="mb-1">
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <feather-icon icon="SearchIcon" />
        </b-input-group-prepend>
        <b-form-input id="filterInput" v-model="filter" type="search" />
      </b-input-group>
    </b-col>
    <b-table
      :items="logs"
      :fields="fields"
      striped
      hover
      responsive
      :per-page="perPage"
      :current-page="currentPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
      show-empty
      empty-text="Veri Bulunamadı"
      empty-filtered-text="Veri Bulunamadı"
    >
      <template #cell(action)="data">
        <b-badge :variant="data.item.action === 'cab-requested' ? 'warning' : data.item.action === 'cab-canceled' ? 'danger' : 'success'">
          {{ data.item.action === "cab-requested" ? "Taksi Çağrıldı" : data.item.action === "cab-canceled" ? "İptal Edildi" : "Yolculuk Yapıldı" }}
        </b-badge>
      </template>
      <template #cell(createdAt)="data">
        {{ DateTime.fromISO(data.item.createdAt).toFormat("dd/MM/yyyy HH:mm") }}
      </template>
    </b-table>
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
  </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
  data() {
    return {
      logs: [],
      ...this.$store.state.app.table,
      perPage: 10,
      pageOptions: [3, 5, 10, 20, 30, 50],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      fields: [
        { key: "customer.fullname", label: "Müşteri", sortable: true },
        { key: "customer.phone", label: "Telefon", sortable: true },
        { key: "action", label: " Yapılan İşlem", sortable: true },
        { key: "createdAt", label: "İşlem Tarihi", sortable: true },
      ],
      DateTime,
    };
  },
  methods: {
    getLogs() {
      this.$http
        .get("/customer-logs-list")
        .then((response) => {
          this.logs = response.data;
          this.totalRows = this.logs.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter((f) => f.sortable).map((f) => ({ text: f.label, value: f.key }));
    },
  },
  mounted() {
    this.getLogs();
  },
};
</script>
