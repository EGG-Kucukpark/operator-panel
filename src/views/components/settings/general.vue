<template>
    <div class>
        <b-form @submit.prevent="sendData">
            <b-row>
                <b-col md="12">
                    <b-col md="6">
                        <b-form-group label="Minimum Dakika Uzaklığı" label-for="mc-first-name">
                            <b-form-input
                                id="mc-first-name"
                                disabled
                                v-model="minTime"
                                placeholder="Minimum Dakika Uzaklığı"
                            />
                        </b-form-group>
                    </b-col>
                </b-col>
                <b-col md="12">
                    <b-col md="6">
                        <b-form-group label="Minimum Km Uzaklığı" label-for="mc-first-name">
                            <b-form-input
                                id="mc-first-name"
                                v-model="minDistance"
                                placeholder="Minimum Km Uzaklığı"
                            />
                        </b-form-group>
                    </b-col>
                </b-col>
                <b-col md="12">
                    <b-col md="6">
                        <b-form-group label="Maximum Km Uzaklığı" label-for="mc-first-name">
                            <b-form-input
                                id="mc-first-name"
                                v-model="maxDistance"
                                placeholder="Maximum Km Uzaklığı"
                            />
                        </b-form-group>
                    </b-col>
                </b-col>

                <b-col md="12">
                    <b-col md="6">
                        <b-form-group label="Canlı Yardım Arama" label-for="mc-first-name">
                            <b-form-checkbox
                                checked="true"
                                v-model="hrCall"
                                :class="hrCall ? 'custom-control-success' : ''"
                                name="check-button"
                                switch
                            />
                        </b-form-group>
                    </b-col>
                </b-col>
                <b-col md="12">
                    <b-col md="6">
                        <b-form-group label="Mesaj Arama" label-for="mc-first-name">
                            <b-form-checkbox
                                v-model="msgCall"
                                :class="msgCall ? 'custom-control-success' : ''"
                                name="check-button"
                                switch
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
            maxDistance: '',
            hrCall: false,
            msgCall: false

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
                this.maxDistance = res.data.maxDistance;
                this.hrCall = res.data.hrCall;
                this.msgCall = res.data.msgCall;

            })
        },

        sendData() {
            this.$http.put('/options', {
                minDistance: this.minDistance,
                minTime: this.minTime,
                maxDistance: this.maxDistance,
                hrCall: this.hrCall,
                msgCall: this.msgCall

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