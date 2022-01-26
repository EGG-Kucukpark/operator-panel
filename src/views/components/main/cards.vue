<template>
  <b-row class="match-height" />
</template>

<script>
export default {
  props: ['drivers, userDatas'],

  methods: {
    toParent(data) {
      this.$emit('toParent', data)
    },
  },
}
</script>

<style>
</style>
