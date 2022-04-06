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
                        <b-form-input
                            id="filterInput"
                            v-model="filter"
                            type="search"
                            placeholder="........"
                        />
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
                    empty-text="Kayıt Bulunamadı."
                    empty-filtered-text="Kayıt Bulunamadı."
                >
                    <p style="text-align: center; width: 100%" show-empty>
                        >
                        <b>Kayıt Bulunamadı.</b>
                    </p>

                    <template #cell(visit)="data">{{ data.item.clicks.visit }}</template>
                    <template #cell(calculate)="data">{{ data.item.clicks.calculate }}</template>

                    <template #cell(callTaxi)="data">{{ data.item.clicks.callTaxi }}</template>

                    <template #cell(whatsappButton)="data">{{ data.item.clicks.whatsappButton }}</template>

                    <template #cell(phone)="data">{{ data.item.clicks.phone }}</template>
                    <template #cell(ads)="data">{{ data.item.clicks.ads }}</template>
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
                { key: 'ip_address', label: 'IP Adresi' },
                { key: 'visit', label: 'Ziyaret' },
                { key: 'ads', label: 'Reklam' },
                { key: 'calculate', label: 'Hesaplama' },
                { key: 'callTaxi', label: 'Taxi Çağırma' },
                { key: 'whatsappButton', label: 'Whatsapp Butonu' },
                { key: 'phone', label: 'Telefon Butonu' },

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
            this.$http('/heytaksi/log').then(res => {
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
