 <template>
    <div>
        <b-col cols="12" class="table-responsive">
            <b-table striped hover responsive :per-page="perPage" :current-page="currentPage" :items="items"
                :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                :filter="filter" :filter-included-fields="filterOn" show-empty empty-text="Veri Bulunamadı."
                empty-filtered-text="Veri Bulunamadı.">
                <p style="text-align: center; width: 100%" show-empty>
                    >
                    <b>Kullanıcı Bulunamadı.</b>
                </p>

<template  #cell(status)="data">
    <b-badge :variant="setStatusVariant(data.item.status)">{{setStatusText(data.item.status)}}</b-badge>

</template>
                <template #cell(created_at)="data">
                    <span>{{ DateTime.fromISO(data.item.timestamp).toFormat('dd.MM.yyyy HH:mm') }}</span>
                </template>
            </b-table>
        </b-col>

        <b-col md="2" sm="4" class="my-1">
            <b-form-group class="mb-0">
                <b-form-select id="perPageSelect" v-model="perPage" size="sm" :options="pageOptions" class="w-50" />
            </b-form-group>
        </b-col>

        <b-col cols="12">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="center" size="sm"
                class="my-0" />
        </b-col>
    </div>
</template>

<script>
import { DateTime } from 'luxon';


export default {
   
    data() {
        return {
            ...this.$store.state.app.table,
            fields: [
                {
                    key: 'driverName', label: 'İsim', sortable: true, filter: true,
                },
                {
                    key: 'driverPhone', label: 'Telefon', sortable: true, filter: true,
                },
                {
                    key: 'status', label: 'Durum', sortable: true, filter: true,
                },

                {
                    key: 'created_at', label: 'Zaman', sortable: true, filter: true,
                },

            ],
            DateTime,
            items: [],
            errors: [],
            variants: {
                online: 'success',
                offline: 'danger',
                trip:'primary',
                busy:'warning',
                disconnected:'secondary',
            },

            statusTexts: {
                online: 'Çevrimiçi',
                offline: 'Çevrimdışı',
                trip:'Sefer',
                busy:'Meşgul',
                disconnected:'Bağlantı Yok',
            },


        }
    },

     mounted() {
        this.getData();
    },

    methods: {
        getData() {
            this.$http('/drivers/logs').then(response => {
                this.items = response.data;
                this.totalRows = response.data.length;
            });
        },

        setStatusText(status) {
            return this.statusTexts[status];
        },

        setStatusVariant(status) {
            return this.variants[status];
        },

    }
}
</script>




<style>
</style>