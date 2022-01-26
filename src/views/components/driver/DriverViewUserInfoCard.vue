<template>
  <b-card>
    <b-row>
      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            size="104px"
            src="/public/../assets/customer.png"
            rounded
            variant="success"
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ userData.general.name }}
              </h4>
              <span class="card-text">{{ userData.general.phone }}</span>
            </div>
          </div>
        </div>

        <!-- User Stats -->
        <div class="d-flex align-items-center mt-2">
          <div class="d-flex align-items-center mr-2">
            <b-form-rating
              no-border
              value="3"
              show-value
              inline
              variant="warning"
            />
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">isim</span>
            </th>
            <td class="pb-50">
              {{ userData.general.name }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Toplam KM</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ Math.ceil(totalKm) }} KM
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="StarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Toplam Sürüş</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ Math.ceil(totalTrips) }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Telefon Numarası</span>
            </th>
            <td class="pb-50 text-capitalize">
              <a :href="'tel:' + userData.general.name">{{ userData.general.phone }}</a>
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>

export default {

  props: {
    userData: {
      type: Object,
      required: true,
    },
  },

  computed: {
    totalKm() {
      const data = this.userData.general.phone
      let total = 0

      this.userData.trip.filter(item => {
        if (item.driverPhone === data) {
          total += item.distance
        }
      })

      return total
    },

    totalTrips() {
      const data = this.userData.general.phone
      let total = 0
      this.userData.trip.filter(item => {
        if (item.driverPhone === data) {
          total += 1
        }
      })
      return total
    },
  },

}
</script>
