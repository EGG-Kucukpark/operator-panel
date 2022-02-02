<template>
  <div>
    <b-card no-body>
      <b-button variant="success" @click="$refs.bilgiler.toggle()">Detaylar</b-button>
    </b-card>

    <b-collapse id="bilgiler" ref="bilgiler">
      <b-row class="match-height">
        <!-- <b-col lg="12" md="12">

          <Cards
            :drivers="drivers"
            :userDatas="userDatas"
            @toParent="center = data, goto(), zoom = 20"
          />

        </b-col>-->

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
              <h1>Müşteriler</h1>
            </b-card-title>
            <b-card-text class="row">
              <b-card-body>
                <div v-for="x in userDatas" :key="x.id" class="transaction-item mb-1">
                  <b-media no-body>
                    <b-media-aside>
                      <b-avatar rounded size="42" variant="success">
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

            <b-form @submit.prevent="driverRedirect">
              <b-card-text class="row">
                <b-form-group class="col-lg-4 col-sm-12" label="Sürücü Numarası" label-for="surucu">
                  <v-select
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
                    label="userPhone"
                    taggable
                    :required="!customerPhone"
                    :options="userDatas"
                    class="style-chooser"
                    placeholder="Lütfen Müşteri Seçiniz "
                  >
                    <template slot="no-options">Sonuç yok.</template>

                    <template slot="option" slot-scope="option">
                      <div
                        class="selected d-center"
                      >{{ option.userName }} / {{ option.userPhone }} / {{ option.duration }} DK</div>
                    </template>

                    <template slot="selected-option" slot-scope="option">
                      <div class="selected d-center">{{ option.userName }} / {{ option.userPhone }}</div>
                    </template>
                  </v-select>
                </b-form-group>

                <b-form-group label="Müşteri Notu" label-for="musteri" class="col-lg-4 col-sm-12">
                  <b-form-input v-model="note" placeholder="Müşteri veya Operator notunu giriniz." />
                </b-form-group>

                <b-form-group
                  style="align-items:center; display:flex; justify-content:center"
                  class="col-12"
                >
                  <b-button
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
            <b-form-rating no-border value="3" readonly show-value inline variant="warning" />
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

            <b-button
              v-if="openedData2.driver != null"
              variant="success"
              @click="driverRedirect2(openedData2.driver, openedData2.userPhone)"
            >{{ openedData2.driver.name }} Taksi Yönlendir</b-button>
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
import store from '../store'
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
      required,
      openedData: '',
      infowindow: { lat: 10.0, lng: 10.0 },
      window_open2: false,
      openedData2: '',
      infowindow2: { lat: 10.0, lng: 10.0 },
      center: { lat: 38.444851, lng: 27.180703 },
      options: {
        phone: {
          phone: true,
          phoneRegionCode: 'US',
        },
      },
      zoom: 12,

      drivers: [],
      driversSelect: [store.state.app.drivers],
      userLocations: [],
      userDatas: [],
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
      isCalled: false,
      selectedDriver: '',
      PrecustomerPhone: '+90',
      customerPhone: '',
      icons: ['../public/../assets/car-online.png', '../public/../assets/car-offline.png', '../public/../assets/car-trip.png', '../public/../assets/car-busy.png'],

    }
  },

  mounted() {
    this.$socket.on('driverLoc', data => {
      if (this.drivers.length == 0) {
        this.drivers.push(data)
      } else {
        const isExist = this.drivers.every((item, index) => {
          if (item.id == data.id) {
            item.lat = data.lat
            item.lng = data.lng
            item.status = data.status
            return false
          }

          return true
        })

        if (isExist) {
          this.drivers.push(data)
        }
      }
    })

    this.$socket.on('customerLoc', data => {
      setTimeout(() => {
        this.userLocation()
      }, 1000)
    })

    this.$socket.on('startTripNot', data => {
      this.userLocation()

    })

    this.userLocation()


  },

  methods: {


    call() {
      this.isCalled = true
      axios('https://app.turkpark.com.tr/api/callTwo', { params: { driver: this.driverPhone, customer: this.customerPhone.replace(/\s/g, '') } })
    },

    driverRedirect() {
      const driver = this.selectedDriver
      const customer = this.customerPhone.userPhone.replace(/\s/g, '')
      const { note } = this



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
        this.$socket.emit('customerLocationApp', data)


      } else {
        toastBus.$emit('toast', { type: 'error' })
      }
    },

    driverRedirect2(driverData, user) {
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

    openWindow(m) {
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

    calcLoc(data) {


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

          this.openedData2.driver = resData[0]
          this.driverShow = true
        })

      }


    },

    userLocation() {
      this.userLocations = []
      this.userDatas = []

      this.$http('/instCustomerLocation').then(res => {
        res.data.map(item => {
          const currentDate = DateTime.now().toISO()
          const diff = DateTime.fromISO(currentDate).diff(DateTime.fromISO(item.createdAt), 'minutes')
          item.duration = parseInt(diff.minutes)

          if (item.duration < 15) {

            this.userLocations.push(item)
            this.userDatas.push(item)

          }

        })

        this.userDatas.reverse()
      })
    },

    setIcon(data) {
      return this.icons[data.status == 'online' ? 0 : data.status == 'offline' ? 1 : data.status == 'busy' ? 3 : 2]
    },
    setStatus(data) {
      return data.status == 'open' ? 'Açık' : 'Kapalı'
    },
    setLocation(data) {
      return { lat: data.lat, lng: data.lng }
    },

    goto() {
      const container = document.getElementById('map')
      container.scrollIntoView({ behavior: 'smooth' })
    },

  },
}
</script>

<style >
.infowi .infowindow {
  width: 250px;
  height: 60px;
  display: flex !important;
  flex-direction: column !important;

  border-radius: 10px;
}

.style-chooser .vs__search {
  height: 28px;
  border: none;
}
</style>
