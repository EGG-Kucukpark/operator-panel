<template>
  <b-card>
    <b-modal
      ref="modal"
      hide-header-close
      :hide-footer="true"
      size="lg"
      centered
      :title="!edit ? 'Sürücü Ekle' : 'Sürücü Düzenle'"
    >
      <b-form @submit.prevent="submit(edit)">
        <b-form-group
          label="Ad-Soyad (*)"
          label-for="name"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="name"
            v-model="name"
          />
        </b-form-group>
        <b-form-group
          label="E-Posta (*)"
          label-for="email"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="email"
            v-model="email"
          />
        </b-form-group>
        <b-form-group
          label="Telefon (*)"
          label-for="Telefon"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="Telefon"
            v-model="phone"
          />
        </b-form-group>

        <b-form-group
          label=" Şifre(*)"
          label-for="password"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="password"
            v-model="password"
          />
        </b-form-group>

        <b-form-group
          label="T.C. (*)"
          label-for="tc"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="tc"
            v-model="tc"
            type="number"
          />
        </b-form-group>
        <b-form-group
          label="Araç Markası (*)"
          label-for="marka"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="marka"
            v-model="arac_marka"
            type="text"
          />
        </b-form-group>

        <b-form-group
          label="Araç Modeli(*)"
          label-for="model"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="model"
            v-model="arac_model"
            type="text"
          />
        </b-form-group>

        <b-form-group
          label="Araç Yılı (*)"
          label-for="yil"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="yil"
            v-model="arac_yil"
            type="text"
          />
        </b-form-group>

        <b-form-group
          label="Araç Plaka (*)"
          label-for="plaka"
          label-cols-sm="2"
          label-align-sm="right"
        >
          <b-form-input
            id="plaka"
            v-model="arac_plaka"
            type="text"
          />
        </b-form-group>

        <h6>Not: '(*)' alanlar zorunludur.</h6>

        <div style="float: right">
          <b-button
            variant="success"
            type="submit"
          >
            Tamam
          </b-button>
        </div>
        <div style="float: right; padding-right: 10px">
          <b-button
            variant="danger"
            @click="closeModal()"
          >
            İptal
          </b-button>
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
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="........"
            />
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-button
        class="mb-1"
        style="margin-right: 16px"
        variant="success"
        @click="edit = false, $refs.modal.show()"
      >
        <feather-icon
          style="margin-right: 10px;"
          size="16"
          stroke-width="7"
          icon="PlusIcon"
        />Sürücü Ekle
      </b-button>

      <b-col
        cols="12"
        class="table-responsive"
      >
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
          @row-clicked="driverPage"
        >
          <p
            style="text-align: center; width: 100%"
            show-empty
          >
            >
            <b>Kullanıcı Bulunamadı.</b>
          </p>

          <template #cell(actions)="data">
            <div style="width: 200px;">
              <b-button
                v-b-tooltip.hover.v-primary
                variant="success"
                class="btn-icon newbtn"
                title="Göster"
                @click="driverPage(data.item)"
              >
                <feather-icon
                  size="20"
                  icon="ImageIcon"
                />
              </b-button>
              <b-button
                v-b-tooltip.hover.v-primary
                variant="warning"
                class="btn-icon newbtn"
                title="Düzenle"
                @click="editModal(data.item)"
              >
                <feather-icon
                  size="20"
                  icon="EditIcon"
                />
              </b-button>
              <b-button
                v-b-tooltip.hover.v-primary
                variant="danger"
                class="btn-icon newbtn"
                title="Sil"
                @click="deleteDriver(data.item)"
              >
                <feather-icon
                  size="20"
                  icon="TrashIcon"
                />
              </b-button>
            </div>
          </template>

          <template #cell(created_at)="data">
            <span>{{ DateTime.fromISO(data.item.created_at).toFormat('dd.MM.yyyy HH:mm') }}</span>
          </template>
        </b-table>
      </b-col>

      <b-col
        md="2"
        sm="4"
        class="my-1"
      >
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
          key: 'status', label: 'Durum', sortable: true, filter: true,
        },
        {
          key: 'arac', label: 'Araç Bilgisi', sortable: true, filter: true,
        },
        {
          key: 'arac_plaka', label: 'Araç Plaka', sortable: true, filter: true,
        },
        {
          key: 'created_at', label: 'Kayıt Zamanı', sortable: true, filter: true,
        },

        { key: 'actions', label: 'Eylemler' },
      ],
      items: [],
      DateTime,
      edit: false,
      id: null,
      name: '',
      email: '',
      phone: '',
      tc: '',
      password: '',
      arac_model: '',
      arac_marka: '',
      arac_yil: '',
      arac_plaka: '',

    }
  },
  mounted() {
    setTimeout(() => {
      this.totalRows = this.items.length
    }, 500)

    this.getDrivers()
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    editModal(item) {
      this.edit = true
      this.id = item._id
      this.name = item.name
      this.phone = item.phone
      this.email = item.email
      this.tc = item.tc
      this.password = ''
      this.arac_model = item.arac_model
      this.arac_marka = item.arac_marka
      this.arac_yil = item.arac_yil
      this.arac_plaka = item.arac_plaka

      this.$refs.modal.show()
    },
    closeModal() {
      this.$refs.modal.hide()
      this.name = null
      this.phone = null
    },

    driverPage(data) {
      this.$router.push({
        name: 'driverInfo',
        params: {
          id: data._id,
        },
      })
    },
    getDrivers() {
      this.items = []
      const isoLogin = JSON.parse(localStorage.getItem('isoLogin'))
      this.$http('/drivers').then(response => {
        this.items = response.data
      })
    },
    calcLoc() {
      this.$http('/calcLoc').then(res => {
        console.log(res.data)
      })
    },

    deleteDriver(data) {
      this.$http.delete(`/drivers/${data._id}`).then(res => {
        this.getDrivers()
      })
    },

    submit() {
      if (this.edit) {
        this.$http.put('/drivers', {
          params: {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            tc: this.tc,
            password: this.password,
            arac_model: this.arac_model,
            arac_marka: this.arac_marka,
            arac_yil: this.arac_yil,
            arac_plaka: this.arac_plaka,
          },
        }).then(response => {
          this.getDrivers()
          toastBus.$emit('toast', { type: 'success' })
        }).catch(error => {
          toastBus.$emit('toast', { type: 'error' })
        })
      } else {
        this.$http.post('/drivers', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          tc: this.tc,
          password: this.password,
          arac_model: this.arac_model,
          arac_marka: this.arac_marka,
          arac_yil: this.arac_yil,
          arac_plaka: this.arac_plaka,
        }).then(response => {
          this.getDrivers()
          this.closeModal()

          toastBus.$emit('toast', { type: 'success' })
        }).catch(error => {
          toastBus.$emit('toast', { type: 'error' })
        })
      }

      this.$refs.modal.hide()
    },

  },
}
</script>
<style>
.newbtn {
    margin-left: 5px;
}
</style>
