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
          <template #cell(arac)="data">
            <span>{{ typeof (data.item.arac) == 'string' ? JSON.parse(data.item.arac).marka : data.item.arac.arac_marka }}</span>
            <br />
            <span>{{ typeof (data.item.arac) == 'string' ? JSON.parse(data.item.arac).yil : data.item.arac.arac_yil }}</span>
            <br />

            <span>{{ typeof (data.item.arac) == 'string' ? JSON.parse(data.item.arac).arac_model : data.item.arac.arac_model }}</span>
          </template>

          <template #cell(file)="data">
            <div v-if="data.item.file" class="driver_img">
              <img
                style="object-fit: cover; width:100%; height:100%"
                :src="`https://www.turkpark.com.tr:2222/public/driver_applications/${data.item.file}`"
                alt
              />
            </div>

            <span v-else>Fotoğraf yok.</span>
          </template>

          <!--  <template #cell(actions)="data">
                        <div style="width: 200px;">
                            <b-button
                                variant="success"
                                class="btn-icon newbtn"
                                v-b-tooltip.hover.v-primary
                                title="Göster"
                            >
                                <feather-icon size="20" icon="ImageIcon" />
                            </b-button>
                            <b-button
                                variant="warning"
                                class="btn-icon newbtn"
                                v-b-tooltip.hover.v-primary
                                title="Düzenle"
                                @click="editModal(data.item)"
                            >
                                <feather-icon size="20" icon="EditIcon" />
                            </b-button>
                            <b-button
                                variant="danger"
                                class="btn-icon newbtn"
                                v-b-tooltip.hover.v-primary
                                title="Sil"
                            >
                                <feather-icon size="20" icon="TrashIcon" />
                            </b-button>
                        </div>
          </template>-->
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
import toastBus from '@/eventBus'

export default {

  data() {
    return {
      ...this.$store.state.app.table,
      fields: [
        {
          key: 'file', label: 'Fotoğraf', sortable: true, filter: true,
        },
        {
          key: 'name', label: 'Ad-Soyad', sortable: true, filter: true,
        },
        {
          key: 'phone', label: 'Telefon', sortable: true, filter: true,
        },
        {
          key: 'iban', label: 'İBAN', sortable: true, filter: true,
        },
        {
          key: 'referans', label: 'referans', sortable: true, filter: true,
        },
        {
          key: 'arac', label: 'Araç Bilgisi', sortable: true, filter: true,
        },
        {
          key: 'il', label: 'İl', sortable: true, filter: true,
        },

        {
          key: 'created_at', label: 'Kayıt Zamanı', sortable: true, filter: true,
        },

      ],
      DateTime,
      items: [],

      edit: false,

    }
  },
  mounted() {
    setTimeout(() => {
      this.totalRows = this.items.length
    }, 500)

    this.veri()
  },
  methods: {
    veri() {
      this.$http('/application').then(response => {
        this.items = response.data
      })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },



  },
}

</script>
<style>
.newbtn .newbtn {
  margin-left: 5px;
}

.driver_img {
  
  width: 90px;
  height: 90px;
 
  overflow: hidden;
}
</style>
