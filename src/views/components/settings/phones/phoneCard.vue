<template>
    <div class>
        <b-col md="12" style="padding:0">
            <b-col md="12">
                <b-list-group v-if="phoneData[phoneType].length > 0">
                    <b-list-group-item v-for="(item, index) in phoneData[phoneType]" :key="index">
                        <b-row class="justify-content-center align-items-center">
                            <b-col lg="6" md="6" sm="6" xs="12"
                                class="d-flex justify-content-sm-start justify-content-center align-items-sm-center">
                                <h4 class="ml-sm-2 pb-2 pb-sm-0 p-0 m-0">{{ item }}</h4>
                            </b-col>
                            <b-col lg="6" md="6" sm="6" xs="12"
                                class="d-flex justify-content-sm-end justify-content-center">
                                <b-button @click="deleteData(item)" variant="danger">
                                    <feather-icon icon="TrashIcon" size="23" />
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>

                <div v-else>
                    <b-col md="12" class="d-flex justify-content-center pt-2 align-items-center">
                        <h4>Henüz telefon eklenmemiş.</h4>
                    </b-col>
                </div>

                <b-modal ref="modal" hide-header-close :hide-footer="true" size="lg" centered title="Telefon Ekle">
                    <b-form @submit.prevent="sendData">
                        <b-form-group label="Telefon:" label-for="name" label-cols-sm="2" label-align-sm="right">
                            <cleave id="phone" v-model="phone" class="form-control" :raw="false"
                                style="border-radius: 5px !important;" :options="options.phone"
                                placeholder="535 514 1450" />
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
                    <b-button @click="openModal" variant="success">Yeni Telefon Ekle</b-button>
                </b-col>
            </b-col>
        </b-col>
    </div>
</template>

<script>
import { DateTime } from 'luxon'
import toastBus from '@/eventBus'
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'
export default {
    components: {
        Cleave
    },
    props: {
        phoneData: {
            required: true
        },
        phoneType: {
            required: true
        }

    },

    data() {
        return {
            phone: '',
            priceRatio: 0,
            id: '',
            options: {
                phone: {
                    phone: true,
                    phoneRegionCode: 'US',
                },
            },

        }

    },

    methods: {
        openModal() {
            this.$refs.modal.show()
        },
        closeModal() {
            this.phone = '';
            this.$refs.modal.hide()

        },

        sendData() {
            this.phoneData[this.phoneType].push('90' + (this.phone).replace(/\s/g, ''));

            this.$http.put('/options', {
                numbers: this.phoneData
            }).then((res) => {
                toastBus.$emit('toast', { type: 'success' })
            }).catch(error => {
                toastBus.$emit('toast', { type: 'error' })
            })

            this.$refs.modal.hide()

        },


        deleteData(data) {

            this.phoneData[this.phoneType] = this.phoneData[this.phoneType].filter(item => item !== data)


            this.$http.put('/options', {
                numbers: this.phoneData
            }).then((res) => {
                toastBus.$emit('toast', { type: 'success' })
            }).catch(error => {
                toastBus.$emit('toast', { type: 'error' })
            })

        }
    }


}
</script>
 