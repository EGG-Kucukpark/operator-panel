<template>
    <b-card>
        <b-card-title>
            <h1>Müşteriler</h1>
        </b-card-title>
        <b-card-text class="row">
            <b-card-body>
                <div v-for="customer in customers" :key="customer._id" class="transaction-item mb-1">
                    <b-media no-body>
                        <b-media-aside>
                            <b-avatar rounded size="42" :variant="customer.status == 'online' ? 'success' : 'warning'">
                                <feather-icon size="18" icon="Navigation2Icon" />
                            </b-avatar>
                        </b-media-aside>

                        <b-media-body>
                            <h6 class="transaction-title">{{ customer.userName }}</h6>
                            <small>{{ customer.userPhone }}</small> /
                            <small>{{ customer.duration }} DK</small>
                        </b-media-body>
                        <b-button variant="flat-primary"
                            @click="showCustomer({ lat: customer.location.degreesLatitude, lng: customer.location.degreesLongitude })">
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
        customers: {
            type: Array,
            required: true
        },

    },

    methods: {
        showCustomer(customer, zoom = 20) {
            this.$emit('showCustomer', customer);
        }
    }


}
</script>

<style>
</style>