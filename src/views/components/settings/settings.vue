<template>
    <b-tabs pills>
        <b-card>
            <b-tab title="Genel Ayarlar">
                <general />
            </b-tab>
            <b-tab title="Ücretler">
                <prices></prices>
            </b-tab>

            <b-tab title="Komisyonlar">
                <komisyon />
            </b-tab>

            <b-tab title="Telefonlar">
                <phones />
            </b-tab>

            <b-tab title="Saatler ve Günler">
                <hour-settings :options="optionsData" />
            </b-tab>
        </b-card>
    </b-tabs>
</template>

<script>
import prices from './prices.vue'
import komisyon from './komisyon.vue'
import general from './general.vue'
import hourSettings from './hourSettings.vue'
import phones from './phones.vue'

export default {
    components: {
        prices,
        komisyon,
        general,
        hourSettings,
        phones
    },


    data() {
        return {
            optionsData: []
        }
    },

    mounted() {
        this.getOptions()
    },
    methods: {
        getOptions() {
            this.$http.get('/options').then((res) => {
                this.optionsData = res.data
            })
        },
    }


}
</script>

<style>
</style> 