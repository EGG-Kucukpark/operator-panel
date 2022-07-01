<template>
  <b-card style="border-radius: 15px" no-body :class="{ open: visible }" @mouseenter="collapseOpen" @mouseleave="collapseClose">
    <b-card-header
      :class="{ collapsed: !visible }"
      :aria-expanded="visible ? 'false' : 'true'"
      :aria-controls="collapseItemID"
      role="tab"
      data-toggle="collapse"
      @click="updateVisible(!visible)"
    >
      <slot name="header">
        <h2 class="p-1">{{ title }}</h2>
      </slot>
      <b-badge v-if="offersLength > 0" variant="warning" class="badge-glow mr-4 p-50"> Bekleyen {{ offersLength }} Adet Teklif Bulunmaktadır </b-badge>
      <b-badge v-else variant="success" class="badge-glow mr-4 p-50"> Bekleyen Teklif Bulunmamaktadır </b-badge>
    </b-card-header>

    <b-collapse :id="collapseItemID" v-model="visible" :accordion="accordion" role="tabpanel">
      <b-card-body>
        <slot />
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import { BCard, BCardHeader, BCardBody, BCollapse } from "bootstrap-vue";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCollapse,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      collapseItemID: "",
      openOnHover: this.$parent.hover,
    };
  },
  computed: {
    accordion() {
      return this.$parent.accordion ? `accordion-${this.$parent.collapseID}` : null;
    },
    offersLength() {
      const waitingOffers = this.$store.getters.getAllOffers.filter((offer) => offer.status === "waiting");
      return waitingOffers.length;
    },
  },
  created() {
    this.collapseItemID = uuidv4();
    this.visible = this.isVisible;
  },
  methods: {
    updateVisible(val = true) {
      this.visible = val;
      this.$emit("visible", val);
    },
    collapseOpen() {
      if (this.openOnHover) this.updateVisible(true);
    },
    collapseClose() {
      if (this.openOnHover) this.updateVisible(false);
    },
  },
};
</script>

<style>
.card-header::after {
  background-size: 25px !important;
  margin-right: 30px;
}
</style>
