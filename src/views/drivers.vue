<template>
    <b-card>
        <b-modal
            hide-header-close
            :hide-footer="true"
            size="lg"
            ref="modal"
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
                    <b-form-input v-model="name" id="name"></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Telefon (*)"
                    label-for="Telefon"
                    label-cols-sm="2"
                    label-align-sm="right"
                >
                    <b-form-input v-model="phone" id="Telefon"></b-form-input>
                </b-form-group>
                <b-form-group
                    label="T.C. (*)"
                    label-for="tc"
                    label-cols-sm="2"
                    label-align-sm="right"
                >
                    <b-form-input type="number" v-model="tc" id="tc"></b-form-input>
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
                @click="edit = false, $refs.modal.show()"
                class="mb-1"
                style="margin-right: 16px"
                variant="success"
            >
                <feather-icon
                    style="margin-right: 10px;"
                    size="16"
                    stroke-width="7"
                    icon="PlusIcon"
                />Sürücü Ekle
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
                    @row-clicked="driverPage"
                    show-empty
                    empty-text="Veri Bulunamadı."
                    empty-filtered-text="Veri Bulunamadı."
                >
                    <p style="text-align: center; width: 100%" show-empty>
                        >
                        <b>Kullanıcı Bulunamadı.</b>
                    </p>

                    <template #cell(actions)="data">
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
                    </template>

                    <template #cell(status)="data">
                        <b-badge
                            pill
                            :variant="driverVariant(data.item.status)"
                        >{{ data.item.status }}</b-badge>
                    </template>

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
export default {

    data() {

        return {
            ...this.$store.state.app.table,
            fields: [
                { key: "name", label: "Ad-Soyad", sortable: true, filter: true },
                { key: "phone", label: "Telefon", sortable: true, filter: true },
                { key: "status", label: "Durum", sortable: true, filter: true },
                 { key: "arac", label: "Araç Bilgisi", sortable: true, filter: true },
                { key: 'created_at', label: 'Kayıt Zamanı', sortable: true, filter: true },

                { key: "actions", label: "Eylemler" },
            ],
            items: [],
            DateTime,
            name: "",
            phone: "",
            tc: "",
            edit: false
        }

    },
    mounted() {
        setTimeout(() => {
            this.totalRows = this.items.length;
        }, 500);

        this.getDrivers();


    },
    methods: {
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        editModal(item) {
            this.edit = true;
            this.name = item.name;
            this.phone = item.phone;

            this.$refs.modal.show();
        },
        closeModal() {
            this.$refs.modal.hide()
            this.name = null;
            this.phone = null;

        },

        driverPage(data) {
            this.$router.push({
                name: "driverInfo",
                params: {
                    id: data.id
                }
            });
        },
        getDrivers() {
            this.items = [];
            let isoLogin = JSON.parse(localStorage.getItem("isoLogin"));
            this.$http('http://195.174.194.97:2222/drivers').then((response) => {
                this.items = response.data
            });
          
        },
        calcLoc() {
            this.$http('/calcLoc').then((res) => {
                console.log(res.data);
            })
        },

        submit() {
            if (this.edit) {
                //this.$http('xd')
            } else {
                toastBus.$emit('toast', true);
                //this.$http('xd')
            }

        },

        driverVariant(data) {
            switch (data) {
                case "online":
                    return "success";
                case "offline":
                    return "danger";
                case 'disconnected':
                    return "secondary";
                case 'busy':
                    return "warning";
                default:
                    return "";
            }

        }
    }
}
</script>
<style>
.newbtn {
    margin-left: 5px;
}
</style>
