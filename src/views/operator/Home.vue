<template>
  <div>
    <b-card no-body>
      <b-button variant="success" @click="$refs.bilgiler.toggle()">Detaylar</b-button>
    </b-card>

    <b-collapse id="bilgiler" ref="bilgiler">
      <b-row class="match-height">
        <b-col lg="3" sm="12">
          <b-card>
            <b-card-title>
              <h1>Online Sürücüler</h1>
            </b-card-title>
            <b-card-text class="row">
              <b-card-body>
                <div v-for="driver in drivers" :key="driver.id" class="transaction-item mb-1">
                  <b-media v-if="driver.status == 'online'" no-body>
                    <b-media-aside>
                      <b-avatar
                        rounded
                        size="42"
                        :variant="driver.status == 'online' ? 'success' : 'danger'"
                      >
                        <feather-icon size="18" icon="Navigation2Icon" />
                      </b-avatar>
                    </b-media-aside>

                    <b-media-body>
                      <h6 class="transaction-title">{{ driver.name }}</h6>
                      <small>{{ driver.phone }}</small>
                    </b-media-body>

                    <b-button
                      variant="flat-primary"
                      @click="center = { lat: driver.lat, lng: driver.lng }, goto(), zoom = 20"
                    >
                      <feather-icon class="mr-1" icon="MapPinIcon" />Haritada Göster
                    </b-button>
                  </b-media>
                </div>
              </b-card-body>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col lg="3" sm="12">
          <b-card>
            <b-card-title>
              <h1>Offline Sürücüler</h1>
            </b-card-title>
            <b-card-text class="row">
              <b-card-body>
                <div v-for="driver in drivers" :key="driver.id" class="transaction-item mb-1">
                  <b-media v-if="driver.status === 'offline'" no-body>
                    <b-media-aside>
                      <b-avatar
                        rounded
                        size="42"
                        :variant="driver.status == 'online' ? 'success' : 'danger'"
                      >
                        <feather-icon size="18" icon="Navigation2Icon" />
                      </b-avatar>
                    </b-media-aside>

                    <b-media-body>
                      <h6 class="transaction-title">{{ driver.name }}</h6>
                      <small>{{ driver.phone }}</small>
                    </b-media-body>

                    <b-button
                      variant="flat-primary"
                      @click="center = { lat: driver.lat, lng: driver.lng }, goto(), zoom = 20"
                    >
                      <feather-icon class="mr-1" icon="MapPinIcon" />Haritada Göster
                    </b-button>
                  </b-media>
                </div>
              </b-card-body>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col lg="3" sm="12">
          <b-card>
            <b-card-title>
              <h1>Meşgul Sürücüler</h1>
            </b-card-title>
            <b-card-text class="row">
              <b-card-body>
                <div v-for="driver in drivers" :key="driver.id" class="transaction-item mb-1">
                  <b-media v-if="driver.status === 'busy' || driver.status === 'trip'" no-body>
                    <b-media-aside>
                      <b-avatar
                        rounded
                        size="42"
                        :variant="driver.status == 'busy' ? 'warning' : 'primary'"
                      >
                        <feather-icon
                          size="18"
                          :icon="driver.status == 'busy' ? 'Navigation2Icon' : 'ChevronsUpIcon'"
                        />
                      </b-avatar>
                    </b-media-aside>

                    <b-media-body>
                      <h6 class="transaction-title">{{ driver.name }}</h6>
                      <h6 class="transaction-title">{{ driver.phone }}</h6>

                      <small v-if="driver.customerName != null">Müşteri: {{ driver.customerName }}</small>
                      <br />

                      <small
                        v-if="driver.customerPhone != null"
                      >M.Telefon: {{ driver.customerPhone }}</small>
                    </b-media-body>

                    <b-button
                      variant="flat-primary "
                      style="width:100%"
                      @click="center = { lat: driver.lat, lng: driver.lng }, goto(), zoom = 20"
                    >
                      <feather-icon class="mr-1" icon="MapPinIcon" />Haritada Göster
                    </b-button>
                  </b-media>
                </div>
              </b-card-body>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col lg="3" sm="12">
          <b-card>
            <b-card-title>
              <h1>Müşteriler</h1>
            </b-card-title>
            <b-card-text class="row">
              <b-card-body>
                <div v-for="x in userDatas" :key="x.id" class="transaction-item mb-1">
                  <b-media no-body>
                    <b-media-aside>
                      <b-avatar
                        rounded
                        size="42"
                        :variant="x.status == 'online' ? 'success' : 'warning'"
                      >
                        <feather-icon size="18" icon="Navigation2Icon" />
                      </b-avatar>
                    </b-media-aside>

                    <b-media-body>
                      <h6 class="transaction-title">{{ x.userName }}</h6>
                      <small>{{ x.userPhone }}</small> /
                      <small>{{ x.duration }} DK</small>
                    </b-media-body>
                    <b-button
                      variant="flat-primary"
                      @click="center = { lat: x.location.degreesLatitude, lng: x.location.degreesLongitude }, goto(), zoom = 20"
                    >
                      <feather-icon class="mr-1" icon="MapPinIcon" />Haritada Göster
                    </b-button>
                  </b-media>
                </div>
              </b-card-body>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col lg="12" md="12">
          <b-card>
            <b-card-title>
              <h1>Sürücü Yönlendirme</h1>
            </b-card-title>
            <b-row>
              <div style="margin-left:12px;  align-items:center" class="row">
                <h1>Otopilot</h1>
                <b-form-checkbox
                  v-model="autopilot"
                  style="margin-left:10px;"
                  class="custom-control-success"
                  name="check-button"
                  switch
                />
              </div>

              <div style="margin-left:30px;  align-items:center" class="row">
                <h1>Varış Noktaları</h1>
                <b-form-checkbox
                  v-model="isDestination"
                  style="margin-left:10px;"
                  class="custom-control-success"
                  name="check-button"
                  switch
                />
              </div>
            </b-row>

            <b-form @submit.prevent="driverRedirect">
              <b-card-text class="row">
                <b-form-group class="col-lg-4 col-sm-12" label="Sürücü Numarası" label-for="surucu">
                  <v-select
                    :disabled="autopilot || isApptoday"
                    v-model="selectedDriver"
                    :filterable="true"
                    label="name"
                    :required="!selectedDriver"
                    :options="drivers"
                    class="style-chooser"
                    :selectable="(option) => option.status == 'online'"
                    placeholder="Lütfen Sürücü Seçiniz "
                  >
                    <template slot="no-options">Sonuç yok.</template>

                    <template
                      v-if="option.status == 'online'"
                      slot="option"
                      slot-scope="option"
                    >{{ option.name }}</template>

                    <template slot="selected-option" slot-scope="option">
                      <div class="selected d-center">{{ option.name }}</div>
                    </template>
                  </v-select>
                </b-form-group>

                <b-form-group
                  label="Müşteri Numarası"
                  label-for="musteri"
                  class="col-lg-4 col-sm-12"
                >
                  <v-select
                    v-model="customerPhone"
                    :filterable="true"
                    :disabled="autopilot"
                    label="userPhone"
                    taggable
                    :required="!customerPhone"
                    :options="customerData"
                    class="style-chooser"
                    :selectable="isApptoday === false ? (option) => option.status == 'online' : (option) => option.status != ''"
                    placeholder="Lütfen Müşteri Seçiniz "
                  >
                    <li slot="list-footer" class="pagination">
                      <b-button
                        variant="flat-info"
                        @click="customerData = userDatas, isApptoday = false"
                      >Güncel Müşteriler</b-button>
                      <b-button
                        variant="flat-primary"
                        @click="customerData = userAppToday, isApptoday = true"
                      >Randevulu Müşteriler</b-button>
                    </li>

                    <template slot="no-options">Sonuç yok.</template>

                    <template slot="option" slot-scope="option">
                      <div
                        v-if="isApptoday === false"
                        class="selected d-center"
                      >{{ option.userName }} / {{ option.userPhone }} / {{ option.duration }} DK</div>

                      <div
                        v-else
                        class="selected d-center"
                      >{{ option.name }} / {{ option.phone }} / {{ option.time }} / {{ option.driver }}</div>
                    </template>

                    <template slot="selected-option" slot-scope="option">
                      <div
                        v-if="isApptoday === false"
                        class="selected d-center"
                      >{{ option.userName }} / {{ option.userPhone }}</div>
                      <div
                        v-else
                        class="selected d-center"
                      >{{ option.name }} / {{ option.phone }} / {{ option.time }} / {{ option.driver }}</div>
                    </template>
                  </v-select>
                </b-form-group>

                <b-form-group label="Müşteri Notu" label-for="musteri" class="col-lg-4 col-sm-12">
                  <b-form-input
                    :disabled="autopilot"
                    v-model="note"
                    placeholder="Müşteri veya Operator notunu giriniz."
                  />
                </b-form-group>

                <b-form-group
                  style="align-items:center; display:flex; justify-content:center"
                  class="col-12"
                >
                  <b-button
                    :disabled="autopilot"
                    style="margin-top:23px;"
                    variant="success"
                    type="submit"
                  >{{ isCalled ? 'Sürücüye Yönlendiriliyor...' : 'Sürücüye Yönlendir' }}</b-button>
                </b-form-group>
              </b-card-text>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-collapse>

    <b-card no-body>
      <GmapMap
        id="map"
        ref="mapRef"
        :options="{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          disableDefaultUi: false,
          clickableIcons: false,
          styles: myStyles
        }"
        :center="center"
        :zoom="zoom"
        style="width: 100%; height:87vh"
      >
        <!--    <GmapCluster> -->
        <GmapMarker
          v-for="m in drivers"
          :key="m.id"
          :position="setLocation(m)"
          :icon="setIcon(m)"
          @click="openWindow(m)"
        />

        <GmapMarker
          v-for="m in userLocations"
          :key="m.id"
          :position="{ lat: m.location.degreesLatitude, lng: m.location.degreesLongitude }"
          icon="../public/../assets/customer.png"
          :clickable="true"
          @click="openWindow2(m)"
        />

        <div v-if="isDestination" class>
          <GmapMarker
            v-for="m in destinations"
            :key="m.id"
            :position="{ lat: m.destination.lat, lng: m.destination.lng }"
            @click="openWindow3(m)"
          />
        </div>

        <gmap-info-window
          :opened="window_open"
          :position="infowindow"
          class="infowindow"
          @closeclick="window_open = false"
        >
          <div class="infowindow" style="display:flex; flex-direction:column">
            <h3>{{ openedData.name }}</h3>
            <p>
              {{ openedData.phone }} /
              <a :href="'tel:' + openedData.phone">Arama Yap</a>
            </p>

            <div v-if="openedData.customerName != null">
              <h5>Müşteri:Adı {{ openedData.customerName }}</h5>
              <h5>Müşteri Telefon:{{ openedData.customerPhone }}</h5>
            </div>
            <p>Son Aktif Zamanı: {{ openedData.last_online }}</p>

            <b-badge :variant="setVariant(openedData.status)" style="height:30px; ">
              <h4
                style="color:white;text-align:center;  text-transform: capitalize;"
              >{{ (openedData.status) }}</h4>
            </b-badge>
          </div>
        </gmap-info-window>

        <gmap-info-window
          :opened="window_open2"
          :position="infowindow2"
          @closeclick="window_open2 = false"
        >
          <div class="infowindow" style="display:flex; flex-direction:column">
            <h3>{{ openedData2.userName }}</h3>
            <p>
              {{ openedData2.userPhone }} /
              <a :href="'tel:' + openedData2.userPhone">Arama Yap</a>
            </p>

            <p style="font-weight:500">
              En yakın Araç :
              <b-spinner v-if="!driverShow" small variant="second" />
              <span v-else>{{ openedData2.driver.name }} / {{ openedData2.driver.distanceText }}</span>
            </p>

            <p style="font-weight:500">Bekleme Süresi: {{ openedData2.duration }} / dk</p>

            <p v-if="openedData2.location" style="font-weight:500">
              <a
                target="_blank"
                :href="'https://maps.google.com/?q=' + openedData2.location.degreesLatitude + ',' + openedData2.location.degreesLongitude"
              >Haritada Göster</a>
            </p>

            <b-button
              v-if="openedData2.driver != null"
              variant="success"
              @click="driverRedirect2(openedData2.driver, openedData2.userPhone)"
            >{{ openedData2.driver.name }} Taksi Yönlendir</b-button>
          </div>
        </gmap-info-window>

        <gmap-info-window
          :opened="window_open3"
          :position="infowindow3"
          @closeclick="window_open3 = false"
        >
          <div class="infowindow" style="display:flex; flex-direction:column">
            <h3>{{ openedData3.driverName }}</h3>
            <p>
              {{ openedData3.driverPhone }} /
              <a :href="'tel:' + openedData3.driverPhone">Arama Yap</a>
            </p>

            <p style="font-weight:500">
              <b-spinner v-if="!openedData3.distane && !openedData3.time" small variant="second" />
              <span v-else>
                Varışa olan uzaklık: {{ openedData3.distance }}
                <br />
                Varışa olan zaman: {{ openedData3.time }} dk
              </span>
            </p>

            <h3>{{ openedData3.customerName }}</h3>
            <p>
              {{ openedData3.customerPhone }} /
              <a
                :href="'tel:' + openedData3.customerPhone"
              >Arama Yap</a>
            </p>
          </div>
        </gmap-info-window>
        <!--   </GmapCluster> -->
      </GmapMap>
    </b-card>
  </div>
</template>

<script>
import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import axios from 'axios'
import { DateTime } from 'luxon'
import store from '../../store'
import Cards from '@/views/components/main/cards.vue'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from '@validations'
import toastBus from '@/eventBus'


export default {
  components: {
    Cleave,
    AppTimeline,
    AppTimelineItem,
    Cards,
    ValidationProvider,
    ValidationObserver

  },
  data() {
    return {
      driverShow: false,
      window_open: false,
      window_open3: false,
      required,
      openedData: '',
      infowindow: { lat: 10.0, lng: 10.0 },
      window_open2: false,
      openedData2: '',
      openedData3: '',
      infowindow2: { lat: 10.0, lng: 10.0 },
      infowindow3: { lat: 10.0, lng: 10.0 },

      center: { lat: 38.444851, lng: 27.180703 },
      autopilot: false,
      options: {
        phone: {
          phone: true,
          phoneRegionCode: 'US',
        },
      },
      zoom: 12,
      isDestination: true,
      drivers: [],
      driverControl: [],
      driversSelect: [store.state.app.drivers],
      userLocations: [],
      userDatas: [],
      userAppToday: [],
      destinations: [],
      isApptoday: false,
      customerData: [],
      errors: [],
      note: '',

      myStyles: [
        {
          featureType: 'poi.business',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },

      ],
      DateTime,
      isCalled: false,
      selectedDriver: '',
      PrecustomerPhone: '+90',
      customerPhone: '',
      icons: {
        online: '../public/../assets/car-online.png',
        offline: '../public/../assets/car-offline.png',
        busy: '../public/../assets/car-busy.png',
        trip: '../public/../assets/car-trip.png',
        disconnect: '../public/../assets/car-disconnect.png'
      },
    }
  },

  async mounted() {
    this.$socket.on('driverLoc', data => {
      this.drivers = data
    })


    this.$socket.on('customerLoc', data => {
      setTimeout(() => {
        this.userLocation(true)
      }, 100)
    })


    this.$socket.on('updateDrivers', () => {
      this.getDrivers()
    })


    this.$socket.on('startTripNot', data => {
      this.userLocation()
    })

    this.$socket.on('comeTripMsg', data => {
      this.userDatas.filter(item => {
        item.userPhone == data.customerPhone ? item.status = 'trip' : ''
      })

      this.getDrivers()
    })
    this.$socket.on('destinationNot', data => {
      this.getDestinations()

    })
    this.$socket.on('endTripMsg', data => {
      this.userLocation()
      this.getDestinations()
    })


    this.$socket.on('tripCancel', () => {
      this.userLocation()

    })


    this.$socket.on('endTripInfo', data => {
      this.userLocation()
      this.getDestinations()
    })

    this.getDestinations()
    this.userLocation()
    this.userAppointments()
    this.getDrivers()



  },

  methods: {


    async driverRedirect() {
      let driver;
      let customer
      const { note } = this



      if (this.isApptoday) {

        driver = {
          driverID: this.customerPhone.driver_id,
          name: this.customerPhone.driver,
          phone: this.customerPhone.driverPhone,
        }
        customer = this.customerPhone.phone
      } else {
        driver = this.selectedDriver
        customer = this.customerPhone.userPhone.replace(/\s/g, '')
      }

      if (driver != '' && customer != '') {
        const data = {
          driver,
          customer,
          note,
        }

        this.selectedDriver = ''
        this.customerPhone = ''
        this.note = ''

        toastBus.$emit('toast', { type: 'redirect' })


        if (this.isApptoday) {
          this.$socket.emit('customerAppointmentStart', data)
        } else {
          this.$socket.emit('customerLocationApp', data)
        }


      } else {
        toastBus.$emit('toast', { type: 'error' })
      }
    },

    async driverRedirect2(driverData, user) {
      const driver = driverData
      const customer = user
      const { note } = this

      const data = {
        driver,
        customer: customer.replace(/[ +]/g, ''),
        note,
      }

      toastBus.$emit('toast', { type: 'redirect' })
      this.$socket.emit('customerLocationApp', data)
    },

    async openWindow(m) {
      this.openedData = m
      this.infowindow = { lat: m.lat, lng: m.lng }
      this.window_open = true
    },

    async openWindow2(m) {
      this.driverShow = false
      this.openedData2 = m
      this.infowindow2 = { lat: m.location.degreesLatitude, lng: m.location.degreesLongitude }
      this.openedData2.driver = null
      this.calcLoc(m)
      this.window_open2 = true
    },

    async openWindow3(m) {

      this.driverShow = false
      this.infowindow3 = { lat: m.destination.lat, lng: m.destination.lng }
      this.openedData3 = m
      this.window_open3 = true
      let tripData = await this.calcLoc3(m)
      m.distance = tripData.distanceText
      m.time = Math.ceil(tripData.duration / 60)

    },

    async calcLoc(data) {

      const user = {
        degreesLatitude: data.location.degreesLatitude,
        degreesLongitude: data.location.degreesLongitude,
      }

      let drivers = this.drivers.map(x => x.status === 'online' ? x : null).filter(x => x !== null)


      if (drivers.length > 0) {

        this.$http.post('/calcLoc', { drivers: drivers, user }).then(res => {
          const resData = res.data
          resData.sort((a, b) => {
            if (a.distance < b.distance) return -1
            if (a.distance > b.distance) return 1
            return 0
          })
          ""
          this.openedData2.driver = resData[0]
          this.driverShow = true
        })

      }


    },


    async calcLoc2(data, url = "/calcLoc") {

      const user = {
        degreesLatitude: data.location.degreesLatitude,
        degreesLongitude: data.location.degreesLongitude,
      }

      await this.getDrivers();
      let drivers = this.drivers.map(x => x.status === 'online' ? x : '').filter(x => x !== '')
      let result = []



      if (drivers.length > 0) {

        await this.$http.post(url, { drivers: drivers, user }).then(res => {
          const resData = res.data
          resData.sort((a, b) => {
            if (a.distance < b.distance) return -1
            if (a.distance > b.distance) return 1
            return 0
          })


          result = resData
        })


        return result
      }


    },

    async calcLoc3(data) {
      let tripData = (await axios('https://www.turkpark.com.tr:2222/currentTripData', { params: { trip_id: data.tripId } })).data[0]
      let finalData = (await axios.post('https://www.turkpark.com.tr:2222/driverDestination', { destination: data.destination, driver: { lat: tripData.lat, lng: tripData.lng } })).data[0]
      return finalData;

    },
    async userAppointments() {
      const { userAppToday } = this

      await this.$http.get('https://www.turkpark.com.tr:2222/allAppointments?date=today',).then(res => {
        this.userAppToday = res.data
      })
    },

    async userLocation(isNew = false) {
      this.userLocations = []
      this.userDatas = []

      this.$http('/instCustomerLocation').then(async (res) => {
        res.data.map(item => {
          const currentDate = DateTime.now().toISO()
          const diff = DateTime.fromISO(currentDate).diff(DateTime.fromISO(item.createdAt), 'minutes')
          item.duration = parseInt(diff.minutes)

          if (item.duration < 30) {

            this.userLocations.push(item)
            this.userDatas.push(item)

          }
        })

        this.userDatas.reverse()


        this.customerData = this.userDatas


        if (this.autopilot && this.userDatas[0].status === 'online' && isNew) {
          this.selectedDriver = null;
          this.selectedDriver = await this.calcLoc2(this.userDatas[0], '/calcLoc/auto')

          this.customerPhone = this.userDatas[0]

          let data = {
            drivers: this.selectedDriver,
            customer: this.customerPhone.userPhone
          }

          this.$socket.emit('autoTrip', data)

        }


      })
    },

    async getDrivers() {
      axios('/driverTrack').then(res => {
        this.drivers = res.data
      })
    },

    async getDestinations() {
      await this.$http.get('/destinations').then(res => {
        this.destinations = res.data
      })
    },


    setIcon(data) {
      return this.icons[data.status]
    },
    setStatus(data) {
      return data.status == 'open' ? 'Açık' : 'Kapalı'
    },
    setLocation(data) {
      return { lat: data.lat, lng: data.lng }
    },

    setVariant(data) {
      let statusArray = {
        'online': 'success',
        'offline': 'danger',
        'busy': 'warning',
        'offline': 'danger',
        'trip': 'info',
        'disconnected': 'secondary'
      }

      return statusArray[data]

    },
    goto() {
      const container = document.getElementById('map')
      container.scrollIntoView({ behavior: 'smooth' })
    },

  },
}
</script>

<style >
.infowi .infowi .infowindow {
  width: 250px;
  height: 60px;
  display: flex !important;
  flex-direction: column !important;

  border-radius: 10px;
}
.gm-style .gm-style-iw-t::after {
  top: -40px !important;
}
.gm-style-iw {
  top: -50px !important;
}

.style-chooser .vs__search {
  height: 28px;
  border: none;
}

.pagination {
  display: flex;
  margin: 0.1rem 0.25rem 0;
  justify-content: space-around;
}
</style>