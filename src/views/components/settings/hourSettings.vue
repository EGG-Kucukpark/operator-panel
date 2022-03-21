<template>
    <div>
        <b-tabs fill>
            <b-tab @click="getOptions" title="Pazartesi">
                <dayCard day="Monday" @update="getOptions" :dayData="optionsData" />
            </b-tab>
            <b-tab @click="setData('Tuesday')" title="Salı">
                <dayCard day="Tuesday" @update="getOptions" :dayData="optionsData" />
            </b-tab>
            <b-tab @click="setData('Wednesday')" title="Çarşamba">
                <dayCard day="Wednesday" @update="getOptions" :dayData="optionsData" />
            </b-tab>
            <b-tab @click="setData('Thursday')" title="Perşembe">
                <dayCard day="Thursday" @update="getOptions" :dayData="optionsData" />
            </b-tab>

            <b-tab @click="setData('Friday')" title="Cuma">
                <dayCard day="Friday" @update="getOptions" :dayData="optionsData" />
            </b-tab>
            <b-tab @click="setData('Saturday')" title="Cumartesi">
                <dayCard day="Saturday" @update="getOptions" :dayData="optionsData" />
            </b-tab>
            <b-tab @click="setData('Sunday')" title="Pazar">
                <dayCard day="Sunday" @update="getOptions" :dayData="optionsData" />
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import dayCard from './days/daysCards.vue'
export default {
    components: {
        dayCard
    },

    data() {
        return {
            optionsData: [],
            generalData: []
        }
    },
    mounted() {
        this.getOptions()
    },
    methods: {
        getOptions() {
            this.$http.get('/options').then((res) => {
                this.generalData = res.data.prices
                this.optionsData = res.data.prices['Monday']

            })
        },

        setData(day) {
            this.optionsData = this.generalData[day]
        }
    }


}
</script>

<style>
</style>