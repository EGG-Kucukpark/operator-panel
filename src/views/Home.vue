<template>
  <div>
    <b-card no-body>
      <b-button @mouseenter="$refs.bilgiler.toggle()" variant="success">Detaylar</b-button>
    </b-card>

    <b-collapse ref="bilgiler" id="bilgiler">
      <b-row @mouseleave="$refs.bilgiler.toggle()" class="match-height">
        <b-col lg="4" sm="12">
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
                  </b-media>
                </div>
              </b-card-body>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col lg="4" sm="12">
          <b-card>
            <b-card-title>
              <h1>Offline Sürücüler</h1>
            </b-card-title>
            <b-card-text class="row">
              <b-card-body>
                <div v-for="driver in drivers" :key="driver.id" class="transaction-item mb-1">
                  <b-media v-if="driver.status == 'offline'" no-body>
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
                  </b-media>
                </div>
              </b-card-body>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col lg="4" sm="12">
          <b-card>
            <b-card-title>
              <h1>Meşgul Sürücüler</h1>
            </b-card-title>
            <b-card-text class="row">
              <b-card-body>
                <div v-for="driver in drivers" :key="driver.id" class="transaction-item mb-1">
                  <b-media v-if="driver.status == 'busy'" no-body>
                    <b-media-aside>
                      <b-avatar rounded size="42" variant="warning">
                        <feather-icon size="18" icon="Navigation2Icon" />
                      </b-avatar>
                    </b-media-aside>

                    <b-media-body>
                      <h6 class="transaction-title">{{ driver.name }}</h6>
                      <small>{{ driver.phone }}</small>
                    </b-media-body>
                  </b-media>
                </div>
              </b-card-body>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col lg="12" md="12">
          <b-card>
            <b-card-title>
              <h1>Arama Yönlendirme</h1>
            </b-card-title>
            <b-card-text class="row">
              <b-form-group class="col-lg-4 col-sm-12" label="Sürücü Numarası" label-for="surucu">
                <v-select
                  v-model="driverPhone"
                  :filterable="true"
                  label="name"
                  :options="drivers"
                  :reduce="option => option.phone"
                  placeholder="Lütfen Sürücü Seçiniz "
                >
                  <template slot="no-options">Sonuç yok.</template>
                  <template
                    slot="option"
                    slot-scope="option"
                    v-if="option.status == 'online'"
                  >{{ option.name }}</template>

                  <template slot="selected-option" slot-scope="option">
                    <div class="selected d-center">{{ option.name }}</div>
                  </template>
                </v-select>
                {{ driverPhone }}
              </b-form-group>

              <b-form-group label="Müşteri Numarası" label-for="musteri" class="col-lg-4 col-sm-12">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-form-select
                      style=" border-top-right-radius:0;  border-bottom-right-radius: 0;"
                      v-model="PrecustomerPhone"
                    >
                      <option value="+90">+90</option>
                      <option value="+91">+31</option>
                    </b-form-select>
                  </b-input-group-prepend>
                  <cleave
                    id="musteri"
                    v-model="customerPhone"
                    class="form-control"
                    :raw="false"
                    :options="options.phone"
                    placeholder="1234 567 8900"
                  />
                </b-input-group>
              </b-form-group>

              <b-form-group class="col-lg-4 col-sm-12">
                <b-button
                  @click="call()"
                  style="margin-top:23px ;"
                  variant="success"
                >{{ isCalled ? 'Arama Yapılıyor...' : 'Arama Yap' }}</b-button>
              </b-form-group>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-collapse>

    <b-card no-body>
      <GmapMap
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
        ref="mapRef"
        :center="center"
        :zoom="12"
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
          :clickable="true"
          icon="../public/../assets/customer.png"
          @click="openWindow2(m)"
        />

        <gmap-info-window
          @closeclick="window_open = false"
          :opened="window_open"
          :position="infowindow"
          class="infowindow"
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
          @closeclick="window_open2 = false"
          :opened="window_open2"
          :position="infowindow2"
        >
          <div class="infowindow" style="display:flex; flex-direction:column">
            <h3>{{ openedData2.userName }}</h3>
            <p>
              {{ openedData2.userPhone }} /
              <a :href="'tel:' + openedData2.userPhone">Arama Yap</a>
            </p>

            <p style="font-weight:500">
              En yakın Araç :
              <b-spinner small v-if="!driverShow" variant="second"></b-spinner>
              <span v-else>{{ openedData2.driver.name }} / {{ openedData2.driver.distanceText }}</span>
            </p>

            <p style="font-weight:500">Bekleme Süresi: {{ openedData2.duration }} / dk</p>

            <b-button
              v-if="openedData2.driver != null"
              @click="customerPhone = openedData2.userPhone, driverPhone = openedData2.driver.phone, call()"
              variant="success"
            >{{ openedData2.driver.name }} {{ isCalled ? 'Arama Yapılıyor...' : 'Arama Yönlendir' }}</b-button>
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
import store from '../store'
import { DateTime } from 'luxon'

export default {
  components: {
    Cleave,
    AppTimeline,
    AppTimelineItem,

  },
  data() {
    return {
      driverShow: false,
      window_open: false,
      openedData: '',
      infowindow: { lat: 10.0, lng: 10.0 },
      window_open2: false,
      openedData2: '',
      infowindow2: { lat: 10.0, lng: 10.0 },
      center: { lat: 38.444851, lng: 27.180703 },
      options: {
        phone: {
          phone: true,
          phoneRegionCode: 'US'
        }
      },

      drivers: [],
      driversSelect: [store.state.app.drivers],
      userLocations: [],
      myStyles: [
        {
          featureType: "poi.business",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },

      ],
      isCalled: false,
      driverPhone: '',
      PrecustomerPhone: '+90',
      customerPhone: '',
      icons: ['../public/../assets/car.png', '../public/../assets/car2.png', '../public/../assets/car3.png'],


    };
  },
  mounted() {

    this.$socket.on('driverLoc', (data) => {


      if (this.drivers.length == 0) {
        this.drivers.push(data);
      }
      else {
        var isExist = this.drivers.every((item, index) => {
          if (item.id == data.id) {
            item.lat = data.lat;
            item.lng = data.lng;
            item.status = data.status;
            return false;
          }
          else {
            return true;
          }
        })

        if (isExist) {
          this.drivers.push(data);
        }


      }


    });


    this.$socket.on('customerLocation', (data) => {
      this.userLocation();
    });


    this.userLocation();
  },

  methods: {
    call() {
      this.isCalled = true;
      axios('https://app.turkpark.com.tr/api/callTwo', { params: { driver: this.driverPhone, customer: this.customerPhone.replace(/\s/g, '') } }).then((res) => {
        this.isCalled = false;
        this.$toastBus.$emit('toast', 'call')
      })

    },



    openWindow(m) {
      this.openedData = m;
      this.infowindow = { lat: m.lat, lng: m.lng };
      this.window_open = true;
    },

    async openWindow2(m) {
      this.driverShow = false;
      this.openedData2 = m;
      this.infowindow2 = { lat: m.location.degreesLatitude, lng: m.location.degreesLongitude }
      this.openedData2.driver = null;
      this.calcLoc(m);
      this.window_open2 = true;

    },

    calcLoc(data) {
      this.$http.post('/calcLoc', { drivers: this.drivers, user: data }).then((res) => {
        let resData = res.data;

        resData.sort((a, b) => {
          if (a.distance < b.distance) return -1;
          if (a.distance > b.distance) return 1;
          return 0;
        });

        this.openedData2.driver = resData[0]
        this.driverShow = true;
      
      })
    },

    userLocation() {
      this.$http('/instCustomerLocation').then((res) => {
        res.data.map((item) => {
          let currentDate = DateTime.now().toISO();
          let diff = DateTime.fromISO(currentDate).diff(DateTime.fromISO(item.createdAt), 'minutes');
          item.duration = parseInt(diff.minutes);
          this.userLocations.push(item);
        })
      })

    },


    setIcon(data) {
      return this.icons[data.status == 'online' ? 0 : 1];


    },
    setStatus(data) {
      return data.status == 'open' ? 'Açık' : 'Kapalı';

    },
    setLocation(data) {

      return { lat: data.lat, lng: data.lng };
    }


  }
};
</script>

<style>
.infowindow {
  width: 250px;
  height: 60px;
  display: flex !important;
  flex-direction: column !important;

  border-radius: 10px;
}
