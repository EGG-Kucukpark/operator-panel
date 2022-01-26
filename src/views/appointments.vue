<template>
  <b-card>
    <b-modal
      ref="modal"
      hide-header-close
      :hide-footer="true"
      size="lg"
      centered
      :title="!edit ? 'Randevu Ekle' : 'Randevu Düzenle'"
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
        />Randevu Ekle
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
        >
          <p
            style="text-align: center; width: 100%"
            show-empty
          >
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
              >
                <feather-icon
                  size="20"
                  icon="TrashIcon"
                />
              </b-button>
            </div>
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
<script>import { DateTime } from 'luxon'

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
          key: 'time', label: 'Randevu Zamanı', sortable: true, filter: true,
        },
        {
          key: 'date', label: 'Randevu Tarihi', sortable: true, filter: true,
        },
        {
          key: 'address', label: 'Konum', sortable: true, filter: true,
        },
        {
          key: 'created_at', label: 'Oluşturulma Tarihi', sortable: true, filter: true,
        },

        { key: 'actions', label: 'Eylemler' },
      ],

      items: [],

      DateTime,
      name: '',
      phone: '',
      tc: '',

      edit: false,
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
    editModal(item) {
      this.edit = true
      this.name = item.name
      this.phone = item.phone
      this.tc = item.tc
      this.$refs.modal.show()
    },
    closeModal() {
      this.$refs.modal.hide()
      this.name = null
      this.phone = null
      this.tc = null
    },

    getData() {
      this.$http('/userAppointment').then(res => {
        this.items = res.data
        console.log(res.data)
      })
    },

    submit() {
      if (this.edit) {
        // this.$http(/)
      } else {
        toastBus.$emit('toast', true)
        // this.$http('xd')
      }
    },
  },
}

</script>
<style>
.newbtn {
    margin-left: 5px;
}
</style>
