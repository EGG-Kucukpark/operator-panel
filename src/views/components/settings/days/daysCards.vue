<template>
    <div class>
        <b-col md="12" style="padding:0">
            <b-col md="12">
                <b-list-group  v-if="dayData.length > 0">
                    <b-list-group-item v-for="item in dayData" :key="item">
                        <b-row class="justify-content-center align-items-center">
                            <b-col
                                lg="6"
                                md="6"
                                sm="6"
                                xs="12"
                                class="d-flex justify-content-sm-start justify-content-center align-items-sm-center"
                            >
                                <h4
                                    class="ml-sm-2 pb-2 pb-sm-0 p-0 m-0"
                                >{{ item.start }}&nbsp/&nbsp{{ item.end }}&nbsp/&nbsp {{ item.priceRatio }}</h4>
                            </b-col>
                            <b-col
                                lg="6"
                                md="6"
                                sm="6"
                                xs="12"
                                class="d-flex justify-content-sm-end justify-content-center"
                            >
                                <b-button @click="editModal(item)" class="mr-2" variant="warning">
                                    <feather-icon icon="EditIcon" size="23" />
                                </b-button>

                                <b-button @click="deleteData(item)" variant="danger">
                                    <feather-icon icon="TrashIcon" size="23" />
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>

                <div v-else>
                    <b-col md="12" class="d-flex justify-content-center pt-2 align-items-center">
                        <h4>Henüz zaman aralığı eklenmemiş.</h4>
                    </b-col>
                </div>

                <b-modal
                    ref="modal"
                    hide-header-close
                    :hide-footer="true"
                    size="lg"
                    centered
                    :title="!edit ? 'Zaman Aralığı Ekle' : 'Zaman Aralığı Düzenle'"
                >
                    <b-form @submit.prevent="sendData">
                        <b-form-group
                            label="Başlangıç:"
                            label-for="name"
                            label-cols-sm="2"
                            label-align-sm="right"
                        >
                            <b-form-timepicker v-model="start" locale="tr" />
                        </b-form-group>
                        <b-form-group
                            label="Bitiş:"
                            label-for="name"
                            label-cols-sm="2"
                            label-align-sm="right"
                        >
                            <b-form-timepicker v-model="end" locale="tr" />
                        </b-form-group>
                        <b-form-group
                            label="Oran:"
                            label-for="name"
                            label-cols-sm="2"
                            label-align-sm="right"
                        >
                            <b-form-input id="name" v-model="priceRatio" />
                        </b-form-group>

                        <div style="float: right">
                            <b-button variant="success" type="submit">Tamam</b-button>
                        </div>
                        <div style="float: right; padding-right: 10px">
                            <b-button variant="danger" @click="closeModal()">İptal</b-button>
                        </div>
                    </b-form>
                </b-modal>

                <b-col class="d-flex justify-content-end mt-2">
                    <b-button @click="openModal" variant="success">Yeni Zaman Ekle</b-button>
                </b-col>
            </b-col>
        </b-col>
    </div>
</template>

<script>
import { DateTime } from 'luxon'
import toastBus from '@/eventBus'
export default {
    props: {
        dayData: {
            required: true
        },
        day: {
            required: true
        }

    },

    data() {
        return {
            start: '',
            end: '',
            priceRatio: 0,
            id: '',
            edit: false,

        }

    },

    methods: {
        openModal() {
            this.$refs.modal.show()
        },
        closeModal() {
            this.start = ''
            this.end = ''
            this.priceRatio = 0
            this.$refs.modal.hide()
        },

        editModal(data) {
            console.log(data)
            this.start = data.start
            this.end = data.end
            this.priceRatio = data.priceRatio
            this.id = data.id
            this.edit = true
            this.$refs.modal.show()
        },

        sendData() {
            if (this.edit) {
                this.$http.put('/timeOptions', {
                    id: this.id,
                    start: this.start,
                    end: this.end,
                    day: this.day,
                    priceRatio: this.priceRatio

                }).then((res) => {
                    this.$emit('update', res.data)
                    toastBus.$emit('toast', { type: 'success' })
                    this.closeModal()
                }).catch((err) => {
                    toastBus.$emit('toast', { type: 'error' })

                })

                return;
            }
            this.$http.put('/options', {
                start: this.start,
                end: this.end,
                priceRatio: this.priceRatio,
                day: this.day

            }).then((res) => {
                this.$emit('update', res.data)
                toastBus.$emit('toast', { type: 'success' })
                this.closeModal()
            }).catch((err) => {
                toastBus.$emit('toast', { type: 'error' })

            })






        },


        deleteData(data) {
            this.$http.delete('/timeOptions', { params: { id: data.id, day: this.day } }).then((res) => {
                this.$emit('update', res.data)
                toastBus.$emit('toast', { type: 'success' })
            }).catch((err) => {
                toastBus.$emit('toast', { type: 'error' })


            })

        }
    }


}
</script>
 