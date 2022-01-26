<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="notifications.slice(0, 15).length"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Bildirimler
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          {{ notifications.slice(0, 15).length }} Yeni Bildirim
        </b-badge>
      </div>
    </li>

    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
      <b-link
        v-for="item in notifications.slice(0, 15)"
        :key="item._id"
      >
        <b-media>
          <p class="media-heading">
            <span
              class="font-weight-bolder"
            >{{ item.userName }}({{ item.userPhone }}) {{ returnMsg(item.Notype) }}</span>
          </p>
          <small
            class="notification-text"
          >{{ DateTime.fromISO(item.created_at).toFormat('dd.MM.yyyy HH:mm') }}</small>
        </b-media>
      </b-link>
    </vue-perfect-scrollbar>
  </b-nav-item-dropdown>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import { ref } from 'vue'
import { DateTime } from 'luxon'

export default {
  components: {
    VuePerfectScrollbar,

  },
  directives: {
    Ripple,
  },

  data() {
    return {
      data: true,
      componentKey: 0,
      DateTime,
      notifications: [],
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
        wheelPropagation: false,
      },

      messages: ['bildirim talebinde bulundu.', 'konumunu attı.', 'taksi iptal etti.'],

    }
  },

  mounted() {
    this.$socket.on('notification', data => {
      this.notification(data)
    })
  },
  created() {
    this.notification()
  },
  methods: {
    notification(data) {
      this.$http.get('/notifications').then(response => {
        this.notifications = response.data
      })
    },

    returnMsg(data) {
      return this.messages[data == 'customer' ? 0 : data == 'Konum' ? 1 : data == 'Konumiptal' ? 2 : 0]
    },

  },

}
</script>
