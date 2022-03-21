<template>
    <div class>
        <b-form @submit.prevent="sendData">
            <b-row>
                <b-col md="12">
                    <b-col md="6">
                        <b-form-group label="Sürücü Komisyon" label-for="mc-first-name">
                            <b-form-input
                                id="mc-first-name"
                                v-model="driverDiscount"
                                placeholder="Genel Ücret"
                            />
                        </b-form-group>
                    </b-col>
                </b-col>

                <b-col md="12">
                    <b-col md="6">
                        <b-form-group label="Partner Komisyon" label-for="mc-first-name">
                            <b-form-input
                                id="mc-first-name"
                                v-model="partnerDiscount"
                                placeholder="Bekleme Ücreti"
                            />
                        </b-form-group>
                    </b-col>
                </b-col>
              

                <!-- submit and reset -->
                <b-col md="12">
                    <b-col md="6">
                        <b-button
                            type="submit"
                            variant="primary"
                            class="mr-1"
                        >Kaydet</b-button>
                        <b-button
                            
                            @click="getData"
                            variant="outline-secondary"
                        >Sıfırla</b-button>
                    </b-col>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>

import toastBus from '@/eventBus'

export default {
    data() {
        return {
            driverDiscount: '',
            partnerDiscount: '',
 
        }

    },

    mounted() {
        this.getData()
    },

    methods: {
        getData() {
            this.$http.get('/options').then((res) => {
                this.driverDiscount = res.data.driverDiscount;
                this.partnerDiscount = res.data.partnerDiscount;
  

            })
        },

        sendData() {
            this.$http.put('/options', {
                driverDiscount: this.driverDiscount,
                partnerDiscount: this.partnerDiscount,
 
            }).then((res) => {
                this.getData()
                toastBus.$emit('toast', { type: 'success' })
            }).catch(error => {
                toastBus.$emit('toast', { type: 'error' })
            })


        }

    }

}
</script>

<style>
</style>