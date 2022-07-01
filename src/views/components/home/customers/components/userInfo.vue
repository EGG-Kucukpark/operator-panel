<template>
  <b-media no-body>
    <b-media-aside>
      <b-avatar size="42" :variant="variant">
        <feather-icon size="18" :icon="icon" />
      </b-avatar>
    </b-media-aside>
    <b-media-body>
      <h6>{{ name }}</h6>
      <small>{{ phone }}</small>
    </b-media-body>
  </b-media>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
  },
};
</script>
