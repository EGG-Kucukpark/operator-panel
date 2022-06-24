<template>
  <b-card>
    <b-card-title>
      <h1>Sürücü Yönlendirme</h1>
    </b-card-title>
    <b-row>
      <div style="margin-left: 12px; align-items: center" class="row">
        <h1>Otopilot</h1>
        <b-form-checkbox v-model="autopilot" @change="autopilotChanged" style="margin-left: 10px" class="custom-control-success" name="check-button" switch />
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
            :options="drivers"
            class="style-chooser"
            :selectable="(option) => option.status == 'online'"
            placeholder="Lütfen Sürücü Seçiniz "
          >
            <template slot="no-options">Sonuç yok.</template>

            <template v-if="option.status == 'online'" slot="option" slot-scope="option">{{ option.name }}</template>

            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">{{ option.name }}</div>
            </template>
          </v-select>
        </b-form-group>

        <b-form-group label="Müşteri Numarası" label-for="musteri" class="col-lg-4 col-sm-12">
          <v-select
            v-model="selectedCustomer"
            :filterable="true"
            :disabled="autopilot"
            label="userPhone"
            taggable
            :options="customers"
            class="style-chooser"
            :selectable="isApptoday === false ? (option) => option.status == 'online' : (option) => option.status != ''"
            placeholder="Lütfen Müşteri Seçiniz "
          >
            <template slot="no-options">Sonuç yok.</template>

            <li slot="list-footer" class="pagination">
              <b-button variant="flat-info">Güncel Müşteriler</b-button>
              <!--      <b-button variant="flat-primary" @click="customerData = userAppToday, isApptoday = true">
                                Randevulu Müşteriler</b-button> -->
            </li>

            <template slot="option" slot-scope="option">
              <div v-if="isApptoday === false" class="selected d-center">{{ option.userName }} / {{ option.userPhone }} / {{ option.duration }} DK</div>

              <div v-else class="selected d-center">
                {{ option.name }} / {{ option.phone }} / {{ option.time }} /
                {{ option.driver }}
              </div>
            </template>

            <!--  <template slot="selected-option" slot-scope="option">
                            <div v-if="isApptoday === false" class="selected d-center">{{ option.userName }} / {{
                                option.userPhone
                            }}</div>
                            <div v-else class="selected d-center">{{ option.name }} / {{ option.phone }} / {{
                                option.time
                            }} / {{ option.driver }}</div>
                        </template>
 -->
          </v-select>
        </b-form-group>

        <b-form-group label="Müşteri Notu" label-for="musteri" class="col-lg-4 col-sm-12">
          <b-form-input :disabled="autopilot" v-model="note" placeholder="Müşteri veya Operator notunu giriniz." />
        </b-form-group>

        <b-form-group style="align-items: center; display: flex; justify-content: center" class="col-12">
          <b-button :disabled="autopilot" style="margin-top: 23px" variant="success" type="submit"> Sürücüye Yönlendir </b-button>
        </b-form-group>
      </b-card-text>
    </b-form>
  </b-card>
</template>

<script>
import toastBus from "@/eventBus";
export default {
  props: {
    drivers: {
      type: Array,
      required: true,
    },
    customers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      autopilot: false,
      isApptoday: false,
      isCalled: false,
      selectedDriver: null,
      selectedCustomer: null,
      userAppToday: null,
      note: null,
    };
  },

  async mounted() {
    await this.$socket.emit("autoTripData");
    this.$socket.on("autoTripMsg", (data) => {
      this.autopilot = data;
    });
    this.getAppointments();
  },

  methods: {
    autopilotChanged() {
      this.$socket.emit("autoTrip", this.autopilot);
      this.$socket.emit("customerLocation", this.autopilot);
    },
    driverRedirect() {
      let driver = {
        driverID: "",
        name: "",
        phone: "",
      };
      let customer = "";
      const { note } = this;

      if (this.isApptoday) {
        driver = {
          driverID: this.selectedCustomer.driver_id,
          name: this.selectedCustomer.driver,
          phone: this.selectedCustomer.driverPhone,
        };
        customer = this.selectedCustomer._id;
      } else {
        driver = this.selectedDriver;
        customer = this.selectedCustomer._id;
      }

      const data = {
        driver,
        customer,
        note,
      };

      toastBus.$emit("toast", { type: "redirect" });
      if (this.isApptoday) {
        this.$socket.emit("customerAppointmentStart", data);
      } else {
        this.$socket.emit("customerLocationApp", data);
      }

      this.selectedDriver = "";
      this.customerPhone = "";
      this.note = "";
    },

    getAppointments() {
      this.$http.get("https://www.turkpark.com.tr:2222/allAppointments?date=today").then((res) => {
        this.userAppToday = res.data;
      });
    },
  },
};
</script>
