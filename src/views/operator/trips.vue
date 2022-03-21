<template>
  <b-card>
    <b-row>
      <b-col>
        <b-form-group
          label-cols-sm="7"
          label-align-sm="left"
          label-size="sm"
          label-for="filterInput"
          class="mb-1"
        >
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
          :items="items"
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
            <b-badge
              :variant="data.item.coupon ? 'success' : 'danger'"
            >{{ data.item.coupon ? 'Kullanıldı' : 'Kullanılmadı' }}</b-badge>
          </template>
        </b-table>
      </b-col>

      <b-col md="2" sm="4" class="my-1">
        <b-form-group class="mb-0">
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="w-50"
          />
        </b-form-group>
      </b-col>

      <b-col cols="12">
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
  </b-card>
</template>
<script>
import { DateTime } from 'luxon'

export default {

  data() {
    return {
      ...this.$store.state.app.table,
      fields: [
        {
          key: 'driverName', label: 'Sürücü İSMİ', sortable: true, filter: true,
        },
        {
          key: 'driverPhone', label: 'Sürücü Telefon', sortable: true, filter: true,
        },

        {
          key: 'customerPhone', label: 'Müşteri Telefon', sortable: true, filter: true,
        },
        {
          key: 'start', label: 'Başlangıç', sortable: true, filter: true,
        },
        {
          key: 'end', label: 'Bitiş', sortable: true, filter: true,
        },
        {
          key: 'distance', label: 'Total KM', sortable: true, filter: true,
        },
        {
          key: 'customerDiscounted', label: 'Müşteri', sortable: true, filter: true,
        },
        {
          key: 'driverDiscounted', label: 'Sürücü', sortable: true, filter: true,
        },

        {
          key: 'total', label: 'Total Fiyat', sortable: true, filter: true,
        },

        {
          key: 'coupon', label: 'Kupon', sortable: true, filter: true,
        },

      ],
      DateTime,
      items: [],
      allTrips: [],

    }
  },
  mounted() {
    setTimeout(() => {
      this.totalRows = this.items.length
    }, 500)

    this.getData()
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    getData() {
      this.$http('/trips').then(res => {
        this.items = res.data
        console.log(this.items)
      })




    },
  },
}

</script>
<style>
.newbtn {
  margin-left: 5px;
}
</style>
