<template>
  <b-row>
    <b-col offset-md="8" class="my-1">
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <feather-icon icon="SearchIcon" />
        </b-input-group-prepend>
        <b-form-input id="filterInput" v-model="filter" type="search" />
      </b-input-group>
    </b-col>

    <b-col cols="12">
      <b-table
        striped
        hover
        responsive
        :per-page="perPage"
        :current-page="currentPage"
        :items="userData"
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
      >
        <template #cell(createdAt)="data">
          <span>{{
            DateTime.fromISO(data.item.createdAt).toFormat("dd.MM.yyyy HH:mm")
          }}</span>
        </template>
      </b-table>
    </b-col>

    <b-col cols="12">
      <b-row>
        <b-col md="2" sm="4" class="my-1">
          <b-form-group class="mb-0">
            <label class="d-inline-block text-sm-left mr-50"
              >Sayfa Düzeni</label
            >
            <b-form-select
              id="perPageSelect"
              v-model="perPage"
              size="sm"
              :options="pageOptions"
              class="w-50"
            />
          </b-form-group>
        </b-col>
        <b-col cols="8" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            size="sm"
            class="my-0"
          />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";
import { DateTime } from "luxon";

export default {
  data() {
    return {
      ...this.$store.state.app.table,
      userData: [],
      perPage: 5,
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
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  mounted() {
    this.getData();
    // Set the initial number of items
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
    getData() {
      axios
        .get("https://www.turkpark.com.tr:2222/webUsers")
        .then((response) => {
          this.totalRows = response.data.length;
          this.userData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
