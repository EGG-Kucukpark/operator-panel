<template>
    <b-card>
        <b-card-title>
            <h1>{{ cardHeader }}</h1>
        </b-card-title>
        <b-card-text class="row">
            <b-card-body>
                <div v-for="driver in drivers" :key="driver.id" class="transaction-item mb-1">

                    <b-media v-if="driver.status === currentStatus || driver.status === secondStatus" no-body>

                        <b-media-aside>
                            <b-avatar rounded size="42" :variant="setVariant(driver.status)">
                                <feather-icon size="18" :icon="setIcon(driver.status)" />
                            </b-avatar>
                        </b-media-aside>

                        <b-media-body>
                            <h6 class="transaction-title">{{ driver.name }}</h6>
                            <h6 class="transaction-title">{{ driver.phone }}</h6>

                            <span v-if="driver.customerName != null">
                                <small>Müşteri: {{ driver.customerName }}</small>
                                <br />
                                <small>M.Telefon: {{ driver.customerPhone }}</small>
                            </span>
                        </b-media-body>

                        <b-button variant="flat-primary " style="width:100%"
                            @click="showDriver({ lat: driver.lat, lng: driver.lng })">
                            <feather-icon class="mr-1" icon="MapPinIcon" />Haritada Göster
                        </b-button>
                    </b-media>
                </div>
            </b-card-body>
        </b-card-text>
    </b-card>
</template>

<script>
export default {
    props: {
        drivers: {
            type: Array,
            required: true
        },
        cardHeader: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.setStatus()
    },


    data() {
        return {
            icons: {
                'busy': 'Navigation2Icon',
                'trip': 'ChevronsUpIcon',
                'online': 'Navigation2Icon',
                'offline': 'Navigation2Icon',

            },

            variants: {
                'busy': 'warning',
                'trip': 'primary',
                'online': 'success',
                'offline': 'danger'
            },
            currentStatus: '',
            secondStatus: '',

        }
    },
    methods: {
        showDriver(location) {
            this.$emit('showDriver', location);
        },

        setIcon(status) {
            return this.icons[status];
        },

        setVariant(status) {
            return this.variants[status];
        },

        setStatus() {
            let status = ["online", "offline", "busy", "trip"];
            switch (this.cardHeader) {
                case "Online":
                    this.currentStatus = status[0];
                    break;
                case "Offline":
                    this.currentStatus = status[1];
                    break;
                case "Meşgul / Yolculuk":
                    this.currentStatus = status[2];
                    this.secondStatus = status[3];
                    break;
                default:
                    break;
            }
        }

    }

}
</script>

<style>
</style>