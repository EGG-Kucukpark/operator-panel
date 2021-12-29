<template>
    <b-card>
        <b-modal
            hide-header-close
            :hide-footer="true"
            size="lg"
            ref="modal"
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
                />Randevu Ekle
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
                            :variant="data.item.status === '1' ? 'warning' : 'success'"
                        >{{ data.item.status != "Açık" ? 'Kapalı' : "Açık" }}</b-badge>
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
export default {

    data() {

        return {
            ...this.$store.state.app.table,
            fields: [
                { key: "name", label: "Ad-Soyad", sortable: true, filter: true },
                { key: "phone", label: "Telefon", sortable: true, filter: true },
                { key: "location", label: "Konum", sortable: true, filter: true },
                { key: "status", label: "Durum", sortable: true, filter: true },
                { key: "actions", label: "Eylemler" },
            ],

            items: [
                {
                    name: "Ahmet",
                    phone: "05555555555",
                    tc: "11111111111",
                    status: "Açık",

                },
                {
                    name: "Mehmet",
                    phone: "05555555555",
                    tc: "11111111111",
                    status: "Açık",
                }
            ],


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
            this.tc = item.tc;
            this.$refs.modal.show();
        },
        closeModal() {
            this.$refs.modal.hide()
            this.name = null;
            this.phone = null;
            this.tc = null;
        },

        submit() {
            if (this.edit) {
                //this.$http('xd')
            } else {
                toastBus.$emit('toast', true);
                //this.$http('xd')
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
