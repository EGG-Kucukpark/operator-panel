<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <!-- Bookmarks Container -->
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">

      <dark-Toggler class="d-none d-lg-block" />
      <notification-dropdown />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import { BDropdownItem, BLink, BNavbarNav } from 'bootstrap-vue'
import locale from './com/loc.vue'
import DarkToggler from './com/DarkToggler.vue'
import NotificationDropdown from './com/NotificationDropdown.vue'
import UserDropdown from './com/UserDropdown.vue'

export default {
  components: {
    BLink,
    BNavbarNav,
    BDropdownItem,
    locale,
    DarkToggler,
    NotificationDropdown,
    UserDropdown,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  methods: {},
}
</script>
