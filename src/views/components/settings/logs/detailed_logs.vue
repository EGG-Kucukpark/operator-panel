<template>
    <b-card>
        <b-modal
            ref="modal"
            hide-header-close
            :hide-footer="true"
            size="lg"
            centered
            title="Filtreleme"
        >
            <validation-observer ref="loginForm" #default="{ invalid }">
                <b-form @submit.prevent="filterData()">
                    <b-form-group
                        label="Başlangıç Günü"
                        label-for="name"
                        label-cols-sm="2"
                        label-align-sm="right"
                    >
                        <validation-provider
                            #default="{ errors }"
                            name="Telefon Numarası"
                            rules="required"
                        >
                            <b-form-datepicker
                                :state="errors.length > 0 ? false : null"
                                v-model="days.start"
                            />

                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                    <b-form-group
                        label="Bitiş Günü"
                        label-for="email"
                        label-cols-sm="2"
                        label-align-sm="right"
                    >
                        <validation-provider
                            #default="{ errors }"
                            name="Telefon Numarası"
                            rules="required"
                        >
                            <b-form-datepicker
                                :state="errors.length > 0 ? false : null"
                                v-model="days.end"
                            />

                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                    <b-form-group
                        label="Başlangıç Saati"
                        label-for="name"
                        label-cols-sm="2"
                        label-align-sm="right"
                    >
                        <validation-provider
                            #default="{ errors }"
                            name="Telefon Numarası"
                            rules="required"
                        >
                            <b-form-timepicker
                                :state="errors.length > 0 ? false : null"
                                v-model="times.start"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                    <b-form-group
                        label="Bitiş Saati"
                        label-for="email"
                        label-cols-sm="2"
                        label-align-sm="right"
                    >
                        <validation-provider
                            #default="{ errors }"
                            name="Telefon Numarası"
                            rules="required"
                        >
                            <b-form-timepicker
                                :state="errors.length > 0 ? false : null"
                                v-model="times.end"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>

                    <div style="float: right">
                        <b-button variant="success" :disabled="invalid" type="submit">Tamam</b-button>
                    </div>
                    <div style="float: right; padding-right: 10px">
                        <b-button variant="danger" @click="closeModal()">İptal</b-button>
                    </div>
                </b-form>
            </validation-observer>
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
                @click="$refs.modal.show()"
                style="margin-right: 16px"
                variant="success"
            >Filtrele</b-button>
            <b-button
                class="mb-1"
                @click="getData"
                style="margin-right: 16px"
                variant="danger"
            >Sıfırla</b-button>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
export default {
    components: {
        ValidationProvider,
        ValidationObserver,
    },

    data() {


        return {
            ...this.$store.state.app.table,
            fields: [
                {
                    key: 'ip_address', label: 'IP Adresi', sortable: true, filter: true,
                },
                {
                    key: 'il', label: 'il', sortable: true, filter: true,
                },
                {
                    key: 'type', label: 'Tıklama', sortable: true, filter: true,
                },

                {
                    key: 'created_at', label: 'Zaman', sortable: true, filter: true,
                },

            ],
            DateTime,
            required,
            items: [],
            errors: [],
            days: {
                start: '',
                end: '',
            },
            times: {
                start: '',
                end: '',
            },

        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },

        getData() {
            this.$http('/heytaksi/log/details').then(res => {
                this.items = res.data
                this.totalRows = this.items.length


            })
        },

        closeModal() {
            let { days, times } = this
            days.start = ''
            days.end = ''
            times.start = ''
            times.end = ''
            this.$refs.modal.hide()

        },


        filterData() {
            let newItems = []
            let { days, times } = this

            if (!days.start || !days.end || !times.start || !times.end) {
                this.getData()
                this.$refs.modal.hide()

                return;

            }


            days.start = DateTime.fromISO(days.start).toFormat('dd.MM.yyyy')
            days.end = DateTime.fromISO(days.end).toFormat('dd.MM.yyyy')
            times.start = DateTime.fromISO(times.start).toFormat('HH:mm')
            times.end = DateTime.fromISO(times.end).toFormat('HH:mm')

            // luxon days.start's time is times.start

            let filter = {
                start: '',
                end: '',

            }
            filter.start = (DateTime.fromFormat(`${days.start} ${times.start}`, 'dd.MM.yyyy HH:mm').toFormat('dd.MM.yyyy HH:mm'))
            filter.end = (DateTime.fromFormat(`${days.end} ${times.end}`, 'dd.MM.yyyy HH:mm').toFormat('dd.MM.yyyy HH:mm'))
            filter.start = DateTime.fromFormat(filter.start, 'dd.MM.yyyy HH:mm').ts;
            filter.end = DateTime.fromFormat(filter.end, 'dd.MM.yyyy HH:mm').ts;



            console.log(filter)
            this.items.filter(item => {
                let { created_at } = item

                //get timestamp
                let date = DateTime.fromISO(created_at).toFormat('dd.MM.yyyy HH:mm')
                date = DateTime.fromFormat(date, 'dd.MM.yyyy HH:mm').ts;



                if (date >= filter.start && date <= filter.end) {
                    newItems.push(item)
                }

            })
            this.items = newItems
            this.totalRows = this.items.length
            this.currentPage = 1
            this.$refs.modal.hide()

        }

    },
}

</script>
<style>
.newbtn {
    margin-left: 5px;
}
</style>
