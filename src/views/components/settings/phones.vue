<template>
    <div>
        <b-tabs fill lazy>
            <b-tab @click="getOptions" title="Mesaj Telefonları">
                <dayCard phoneType="msgNumbers" @update="getOptions" :phoneData="phoneData" />
            </b-tab>
            <b-tab @click="setData('hrNumbers')" title="Canlı Yardım Telefonları">
                <dayCard phoneType="hrNumbers" @update="getOptions" :phoneData="phoneData" />
            </b-tab>
            <b-tab @click="setData('adsNumbers')" title="Reklam Telefonları">
                <dayCard phoneType="adsNumbers" @update="getOptions" :phoneData="phoneData" />
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import dayCard from './phones/phoneCard.vue'
export default {
    components: {
        dayCard
    },

    data() {
        return {
            optionsData: [],
            phoneData: []
        }
    },
    mounted() {
        this.getOptions()
    },
    methods: {
        getOptions() {
            this.$http.get('/options').then((res) => {
                this.generalData = res.data
                this.phoneData = res.data.numbers
            })
        },

        setData(day) {
            this.getOptions()
        }
    }


}
</script>

<style>
</style>