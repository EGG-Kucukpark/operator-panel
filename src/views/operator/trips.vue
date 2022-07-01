<template>
  <b-card>
    <b-row>
      <b-col md="3">
        <b-form-group>
          <flat-pickr
            v-model="filterDate"
            class="form-control"
            :config="{ mode: 'range', locale: Turkish, altInput: true, altFormat: 'd/m/Y' }"
            placeholder="Filtrelemek için tarih aralığı seçin..."
            @input="dateFilter"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label-cols-sm="7" label-align-sm="left" label-size="sm" label-for="filterInput" class="mb-1">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input id="filterInput" v-model="filter" type="search" placeholder="........" />
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col cols="12" class="table-responsive">
        <b-table
          striped
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="filterDate ? dateFilterItems : items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          show-empty
          empty-text="Veri Bulunamadı."
          empty-filtered-text="Veri Bulunamadı."
        >
          <p style="text-align: center; width: 100%" show-empty>
            >
            <b>Kullanıcı Bulunamadı.</b>
          </p>

          <template #cell(customerDiscounted)="data">
            <span>{{ data.item.customerDiscounted }} ₺</span>
          </template>

          <template #cell(driverDiscounted)="data">
            <span>{{ data.item.driverDiscounted }} ₺</span>
          </template>

          <template #cell(total)="data">
            <span>{{ data.item.total }} ₺</span>
          </template>

          <template #cell(coupon)="data">
            <b-badge :variant="data.item.coupon ? 'success' : 'danger'">{{ data.item.coupon ? "Kullanıldı" : "Kullanılmadı" }}</b-badge>
          </template>
        </b-table>
      </b-col>

      <b-col md="2" sm="4" class="my-1">
        <b-form-group class="mb-0">
          <b-form-select id="perPageSelect" v-model="perPage" size="sm" :options="pageOptions" class="w-50" />
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="center" size="sm" class="my-0" />
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import { DateTime } from "luxon";
import flatPickr from "vue-flatpickr-component";
import { Turkish } from "flatpickr/dist/l10n/tr.js";

export default {
  components: {
    flatPickr,
  },
  data() {
    return {
      ...this.$store.state.app.table,
      fields: [
        {
          key: "driverName",
          label: "Sürücü İSMİ",
          sortable: true,
          filter: true,
        },
        {
          key: "driverPhone",
          label: "Sürücü Telefon",
          sortable: true,
          filter: true,
        },

        {
          key: "customerPhone",
          label: "Müşteri Telefon",
          sortable: true,
          filter: true,
        },
        {
          key: "start",
          label: "Başlangıç",
          sortable: true,
          filter: true,
        },
        {
          key: "end",
          label: "Bitiş",
          sortable: true,
          filter: true,
        },
        {
          key: "distance",
          label: "Total KM",
          sortable: true,
          filter: true,
        },
        {
          key: "customerDiscounted",
          label: "Müşteri",
          sortable: true,
          filter: true,
        },
        {
          key: "driverDiscounted",
          label: "Sürücü",
          sortable: true,
          filter: true,
        },

        {
          key: "total",
          label: "Total Fiyat",
          sortable: true,
          filter: true,
        },

        {
          key: "coupon",
          label: "Kupon",
          sortable: true,
          filter: true,
        },
      ],
      DateTime,
      items: [],
      allTrips: [],
      filterDate: null,
      dateFilterItems: [],
      Turkish,
    };
  },
  mounted() {
    setTimeout(() => {
      this.totalRows = this.items.length;
    }, 500);

    this.getData();
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    getData() {
      this.$http("/trips").then((res) => {
        this.totalRows = res.data.length;
        this.items = res.data;
      });
    },
    dateFilter() {
      const dates = this.filterDate.split(" - ");

      const lastDate = dates[1] ? new Date(dates[1]).setDate(new Date(dates[1]).getDate() + 1) : null;

      this.dateFilterItems = this.items.filter((item) => {
        if (!lastDate && DateTime.fromISO(item.created_at).toFormat("yyyy-MM-dd") === dates[0]) {
          return item;
        } else if (new Date(item.created_at) >= new Date(dates[0]) && new Date(item.created_at) <= lastDate) {
          return item;
        }
      });
      this.dateFilterItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      this.filterDate ? this.onFiltered(this.dateFilterItems) : this.onFiltered(this.items);
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.newbtn {
  margin-left: 5px;
}
</style>
