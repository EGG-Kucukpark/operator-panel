<template>
    <div class>
        <b-form @submit.prevent="sendData">
            <b-row>
                <b-col md="12">
                    <b-col md="6">
                        <b-form-group
                            label="Minumum Dakika Uzaklığı"
                            label-for="mc-first-name"
                        >
                            <b-form-input
                                id="mc-first-name"
                                v-model="minTime"
                                placeholder="Bekleme Ücreti"
                            />
                        </b-form-group>
                    </b-col>
                </b-col>
                <b-col md="12">
                    <b-col md="6">
                        <b-form-group
                            label="Minumum Km Uzaklığı"
                            label-for="mc-first-name"
                        >
                            <b-form-input
                                id="mc-first-name"
                                v-model="minDistance"
                                placeholder="Bekleme Ücreti"
                            />
                        </b-form-group>
                    </b-col>
                </b-col>

                <!-- submit and reset -->
                <b-col md="12">
                    <b-col md="6">
                        <b-button type="submit" variant="primary" class="mr-1">Kaydet</b-button>
                        <b-button @click="getData" variant="outline-secondary">Sıfırla</b-button>
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
            minTime: '',
            minDistance: '',

        }

    },

    mounted() {
        this.getData()
    },

    methods: {
        getData() {
            this.$http.get('/options').then((res) => {
                this.minTime = res.data.minTime;
                this.minDistance = res.data.minDistance;



            })
        },

        sendData() {
            this.$http.put('/options', {
                minDistance: this.minDistance,
                minTime: this.minTime,
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