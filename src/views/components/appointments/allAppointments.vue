<template>
  <b-card>
    <b-modal
      ref="modal"
      hide-header-close
      :hide-footer="true"
      size="lg"
      centered
      no-close-on-backdrop
      :title="!edit ? 'Randevu Ekle' : 'Randevu Düzenle'"
    >
      <b-form @submit.prevent="submit">
        <b-form-group
          label="Ad-Soyad (*)"
          label-for="name"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input id="name" v-model="name" />
        </b-form-group>

        <b-form-group
          label="Telefon (*)"
          label-for="Telefon"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input id="Telefon" v-model="phone" />
        </b-form-group>

        <b-form-group
          label="Randevu Tarihi (*)"
          label-for="Telefon"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input id="Telefon" v-model="date" />
        </b-form-group>
        <b-form-group
          label="Randevu Zamanı (*)"
          label-for="Telefon"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input id="Telefon" v-model="time" />
        </b-form-group>

        <b-form-group
          label="Adres (*)"
          label-for="Telefon"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input id="Telefon" v-model="startAddress" />
        </b-form-group>

        <b-form-group
          label="Sürücü (*)"
          label-for="Telefon"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <v-select
            v-model="driver"
            :filterable="true"
            label="name"
            :required="!driver"
            :options="paginated"
            class="style-chooser"
            placeholder="Lütfen Sürücü Seçiniz "
          >
            <div slot="no-options">Sürücü yok</div>
            <li slot="list-footer" class="pagination">
              <b-button
                variant="flat-primary"
                :disabled="!hasPrevPage"
                @click="offset -= limit"
              >Geri</b-button>
              <b-button variant="flat-info" :disabled="!hasNextPage" @click="offset += limit">İleri</b-button>
            </li>
            <template v-slot:option="option">{{ option.name }}</template>
          </v-select>
        </b-form-group>

        <h6>Not: '(*)' alanlar zorunludur.</h6>
        <div style="float: right">
          <b-button variant="success" type="submit">Tamam</b-button>
        </div>
        <div style="float: right; padding-right: 10px">
          <b-button variant="danger" @click="closeModal()">İptal</b-button>
        </div>
      </b-form>
    </b-modal>

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

      <b-button
        class="mb-1"
        style="margin-right: 16px"
        variant="success"
        @click="edit = false, $refs.modal.show()"
      >
        <feather-icon style="margin-right: 10px;" size="16" stroke-width="7" icon="PlusIcon" />Randevu Ekle
      </b-button>

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

          <template #cell(actions)="data">
            <div style="width: 200px;">
              <b-button
                v-b-tooltip.hover.v-primary
                variant="success"
                class="btn-icon newbtn"
                title="Göster"
              >
                <feather-icon size="20" icon="ImageIcon" />
              </b-button>
              <b-button
                v-b-tooltip.hover.v-primary
                variant="warning"
                class="btn-icon newbtn"
                title="Düzenle"
                @click="editModal(data.item)"
              >
                <feather-icon size="20" icon="EditIcon" />
              </b-button>
              <b-button
                v-b-tooltip.hover.v-primary
                variant="danger"
                class="btn-icon newbtn"
                title="Sil"
                @click="deleteData(data.item)"
              >
                <feather-icon size="20" icon="TrashIcon" />
              </b-button>
            </div>
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
import toastBus from '@/eventBus'

export default {

  data() {
    return {
      ...this.$store.state.app.table,
      fields: [
        {
          key: 'name', label: 'Ad-Soyad', sortable: true, filter: true,
        },
        {
          key: 'phone', label: 'Telefon', sortable: true, filter: true,
        },
        {
          key: 'date', label: 'Randevu Tarihi', sortable: true, filter: true,
        },
        {
          key: 'time', label: 'Randevu Zamanı', sortable: true, filter: true,
        },
        {
          key: 'startAddress', label: 'Adres', sortable: true, filter: true,
        },

        {
          key: 'driver', label: 'Sürücü', sortable: true, filter: true,
        },
        {
          key: 'created_at', label: 'Oluşturulma Tarihi', sortable: true, filter: true,
        },

        { key: 'actions', label: 'Eylemler' },
      ],

      items: [],
      drivers: [],

      DateTime,
      _id: '',
      name: '',
      phone: '',
      time: '',
      date: '',
      startAddress: '',
      address: '',
      driver: '',
      offset: 0,
      limit: 10,
      driver: {
        name: '',
        _id: '',
        phone: '',
      },



      edit: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.totalRows = this.items.length
    }, 500)

    this.getData()
    this.getDrivers()
  },

  computed: {
    paginated() {
      return this.drivers.slice(this.offset, this.limit + this.offset)
    },
    hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.drivers.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.drivers.slice(prevOffset, this.limit + prevOffset).length
      )
    },


  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },




    editModal(item) {
      this.edit = true
      this._id = item._id
      this.name = item.name
      this.phone = item.phone
      this.time = item.time
      this.date = item.date
      this.startAddress = item.startAddress
      this.address = item.address
      this.driver = item.driver


      this.$refs.modal.show()
    },




    closeModal() {
      this.$refs.modal.hide()
      this._id = null
      this.name = null
      this.phone = null
      this.time = null
      this.date = null
      this.startAddress = null
      this.address = null
      this.driver.name = null
      this.driver.phone = null
      this.driver._id = null


    },

    getData() {
      this.$http.get('https://www.turkpark.com.tr:2222/allAppointments?date=all',).then(res => {
        this.items = res.data.allAppointments
      })

    },

    getDrivers() {
      this.$http.get('https://www.turkpark.com.tr:2222/drivers',).then(res => {
        this.drivers = res.data
      })
    },

    deleteData(data) {
      this.$http.delete('https://www.turkpark.com.tr:2222/userAppointment', { params: { id: data._id } }).then(res => {
        this.getData();
        toastBus.$emit('toast', { type: 'success' })
      }).catch(error => {
        toastBus.$emit('toast', { type: 'error' })
      })
    },



    async submit() {

      await this.$http.post('/textloc', { address_text: this.startAddress }).then(res => {
        this.address = res.data
      })


      if (this.edit) {
        this.$http.put('/userAppointment', {
          _id: this._id,
          name: this.name,
          phone: this.phone,
          time: this.time,
          date: this.date,
          address_text: this.startAddress,
          address1Loc: this.address,
          driver: this.driver.name,
          driver_id: this.driver._id,
          driverPhone: this.driver.phone,
        }).then((response) => {
          this.getData()
          this.closeModal()

          toastBus.$emit('toast', { type: 'success' })
        }).catch(error => {
          toastBus.$emit('toast', { type: 'error' })
        })

      } else {


        this.$http.post('https://www.turkpark.com.tr:2222/userAppointment', {
          name: this.name,
          phone: this.phone,
          time: this.time,
          date: this.date,
          startAddress: this.startAddress,
          address1Loc: this.address,
          driver: this.driver.name,
          driver_id: this.driver._id,
          driverPhone: this.driver.phone,
        }).then(res => {
          this.getData();
          this.closeModal();
          toastBus.$emit('toast', { type: 'success' })
        }).catch(error => {
          toastBus.$emit('toast', { type: 'error' })
        })




      }
    },
  },
}

</script>
<style>
.newbtn {
  margin-left: 5px;
}
.pagination {
  display: flex;
  margin: 0.25rem 0.25rem 0;
}
.pagination button {
  flex-grow: 1;
}
.pagination button:hover {
  cursor: pointer;
}
</style>
