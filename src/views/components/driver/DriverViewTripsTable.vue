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

          <template #cell(created_at)="data">
            <span>{{ DateTime.fromISO(data.item.created_at).toFormat('dd.MM.yyyy HH:mm') }}</span>
          </template>
          <template #cell(distance)="data">
            <span>{{ Math.ceil(data.item.distance) }} KM</span>
          </template>
          <template #cell(price)="data">
            <span>{{ Math.ceil(data.item.distance) * 4 }} ₺</span>
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
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      ...this.$store.state.app.table,
      fields: [
        {
          key: 'created_at', label: 'Başlangıç', sortable: true, filter: true,
        },
        {
          key: 'customerPhone', label: 'Müşteri Telefon', sortable: true, filter: true,
        },
        {
          key: 'distance', label: ' KM', sortable: true, filter: true,
        },
        {
          key: 'driverDiscounted', label: 'Sürücü', sortable: true, filter: true,
        },
        {
          key: 'price', label: 'Total', sortable: true, filter: true,
        },


      ],
      DateTime,
      items: [],

    }
  },
  mounted() {


    setTimeout(() => {
      this.totalRows = this.items.length
      this.getData()
    }, 1000)
  },

  methods: {
    getData() {
      this.items = this.userData.trips
    },
  },

}

</script>
<style>
.newbtn {
  margin-left: 5px;
}
</style>
