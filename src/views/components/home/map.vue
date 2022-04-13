<template>
    <b-card no-body>
        <GmapMap id="map" ref="mapRef" :options="{
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
            disableDefaultUi: false,
            clickableIcons: false,
        }" :center="mapOptions.center" :zoom="mapOptions.zoom" style="width: 100%; height:87vh">

            <GmapMarker v-for="driver in drivers" :key="driver.id" :position="setDriverLocation(driver)"
                :icon="setIcon(driver)" @click="setDriverWindowData(driver)" />

            <GmapMarker v-for="customer in customers" :key="customer.id" :position="setCustomerLocation(customer)"
                icon="../public/../assets/customer.png" @click="setCustomerWindowData(customer)" />


            <GmapMarker v-for="destination in destinations" :key="destination.id"
                :position="setDestinationLocation(destination)" @click="setDestinationWindowData(m)" />


            <gmap-info-window :opened="isDriverWindowOpen" :position="driverWindowLocation" class="infowindow"
                @closeclick="isDriverWindowOpen = false">

                <div class="infowindow" style="display:flex; flex-direction:column">
                    <h3>{{ driverWindowData.name }}</h3>
                    <p>
                        {{ driverWindowData.phone }} /
                        <a :href="'tel:' + driverWindowData.phone">Arama Yap</a>
                    </p>

                    <div v-if="driverWindowData.customerName != null">
                        <h5>Müşteri:Adı {{ driverWindowData.customerName }}</h5>
                        <h5>Müşteri Telefon:{{ driverWindowData.customerPhone }}</h5>
                    </div>
                    <p>Son Aktif Zamanı: {{ driverWindowData.last_online }}</p>

                    <b-badge :variant="setVariant(driverWindowData.status)" style="height:30px; ">
                        <h4 style="color:white;text-align:center;  text-transform: capitalize;">{{
                            (driverWindowData.status)
                        }}</h4>
                    </b-badge>
                </div>
            </gmap-info-window>



            <gmap-info-window :opened="isCustomerWindowOpen" :position="customerWindowLocation"
                @closeclick="isCustomerWindowOpen = false">
                <div class="infowindow" style="display:flex; flex-direction:column">
                    <h3>{{ customerWindowData.userName }}</h3>
                    <p>
                        {{ customerWindowData.userPhone }} /
                        <a :href="'tel:' + customerWindowData.userPhone">Arama Yap</a>
                    </p>


                    <p style="font-weight:500">
                        En yakın Araç :

                        <b-spinner v-if="isLoading" small variant="second" />

                        <span v-if="!isLoading && customerWindowData.driver">{{
                            customerWindowData.driver.name + '/' + customerWindowData.driver.distanceText
                        }} </span>

                        <span v-if="!isLoading && customerWindowData.driver === null">
                            Araç Bulunamadı
                        </span>


                    </p>

                    <p style="font-weight:500">Bekleme Süresi: {{ customerWindowData.duration }} / dk</p>

                    <p v-if="customerWindowData.location" style="font-weight:500">
                        <a target="_blank"
                            :href="'https://maps.google.com/?q=' + customerWindowData.location.degreesLatitude + ',' + customerWindowData.location.degreesLongitude">Haritada
                            Göster</a>
                    </p>

                    <b-button v-if="customerWindowData.driver != null" variant="success"
                        @click="driverRedirect(customerWindowData.driver, customerWindowData.userPhone)">{{
                            customerWindowData.driver.name
                        }} Taksi Yönlendir</b-button>
                </div>
            </gmap-info-window>


            <gmap-info-window :opened="isDestinationWindowOpen" :position="destinationWindowLocation"
                @closeclick="isDestinationWindowOpen = false">
                <div class="infowindow" style="display:flex; flex-direction:column">
                    <h3>{{ destinationWindowData.driverName }}</h3>
                    <p>
                        {{ destinationWindowData.driverPhone }} /
                        <a :href="'tel:' + destinationWindowData.driverPhone">Arama Yap</a>
                    </p>

                    <p style="font-weight:500">
                        <b-spinner v-if="!destinationWindowData.distane && !destinationWindowData.time" small
                            variant="second" />
                        <span v-else>
                            Varışa olan uzaklık: {{ destinationWindowData.distance }}
                            <br />
                            Varışa olan zaman: {{ destinationWindowData.time }} dk
                        </span>
                    </p>

                    <h3>{{ destinationWindowData.customerName }}</h3>
                    <p>
                        {{ destinationWindowData.customerPhone }} /
                        <a :href="'tel:' + destinationWindowData.customerPhone">Arama Yap</a>
                    </p>
                </div>
            </gmap-info-window>


        </GmapMap>
    </b-card>
</template>

<script>
import toastBus from "@/eventBus";
export default {
    props: {
        mapOptions: {
            type: Object,
            default: () => ({})
        },
        drivers: {
            type: Array,
            default: () => []
        },
        customers: {
            type: Array,
            default: () => []
        },

        destinations: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            driverWindowData: {},
            driverWindowLocation: {},
            isDriverWindowOpen: false,
            ///////////////////////////
            customerWindowData: {},
            customerWindowLocation: {},
            isCustomerWindowOpen: false,
            ///////////////////////////
            destinationWindowData: {},
            destinationWindowLocation: {},
            isDestinationWindowOpen: false,
            ///////////////////////////
            isLoading: true,
            ///////////////////////////
            icons: {
                online: '../public/../assets/car-online.png',
                offline: '../public/../assets/car-offline.png',
                busy: '../public/../assets/car-busy.png',
                trip: '../public/../assets/car-trip.png',
                disconnect: '../public/../assets/car-disconnect.png'
            },
            variants: {
                'online': 'success',
                'offline': 'danger',
                'busy': 'warning',
                'offline': 'danger',
                'trip': 'info',
                'disconnected': 'secondary'
            }
        }
    },

    methods: {
        driverRedirect(driverData, customerData) {
            let driver = driverData;
            let customer = customerData
            const note = ''
            const data = {
                driver,
                customer,
                note,
            }
            toastBus.$emit('toast', { type: 'redirect' })
            this.$socket.emit('customerLocationApp', data)
        },

        async calculateLocation(data) {
            const user = {
                degreesLatitude: data.location.degreesLatitude,
                degreesLongitude: data.location.degreesLongitude,
            }

            let drivers = this.drivers.map(x => x.status === 'online' ? x : null).filter(x => x !== null)


            if (drivers.length > 0) {
                this.$http.post('/calcLoc/auto', { drivers: drivers, user }).then(res => {
                    const resData = res.data
                    resData.sort((a, b) => {
                        if (a.distance < b.distance) return -1
                        if (a.distance > b.distance) return 1
                        return 0
                    })

                    this.customerWindowData.driver = resData[0]
                    this.isLoading = false
                })

                return;
            }

            this.customerWindowData.driver = null
            this.isLoading = false

        },

        async calculateDestination(data) {
            let tripData = (await axios('https://www.turkpark.com.tr:2222/currentTripData', { params: { trip_id: data.tripId } })).data[0]
            let finalData = (await axios.post('https://www.turkpark.com.tr:2222/driverDestination', { destination: data.destination, driver: { lat: tripData.lat, lng: tripData.lng } })).data[0]
            return finalData;
        },

        setDriverWindowData(data) {
            this.driverWindowData = data
            this.driverWindowLocation = this.setDriverLocation(data)
            this.isDriverWindowOpen = true
        },

        setCustomerWindowData(data) {
            this.customerWindowData = data
            this.customerWindowData.driver = null;
            this.customerWindowLocation = this.setCustomerLocation(data)
            this.calculateLocation(data)
            this.isCustomerWindowOpen = true
        },

        async setDestinationWindowData(data) {
            this.infowindow3 = this.setDestinationLocation(data)
            this.destinationWindowData = data
            this.isDestinationWindowOpen = true
            let tripData = await this.calculateDestination(data)
            data.distance = tripData.distanceText
            data.time = Math.ceil(tripData.duration / 60)
        },

        setDriverLocation(data) {
            return { lat: data.lat, lng: data.lng }
        },

        setCustomerLocation(data) {
            return { lat: data.location.degreesLatitude, lng: data.location.degreesLongitude }
        },

        setDestinationLocation(data) {
            return { lat: data.destination.lat, lng: data.destination.lng }
        },
        setIcon(data) {
            return this.icons[data.status]
        },

        setVariant(data) {
            return this.variants[data]
        },

    }
}
</script>
 