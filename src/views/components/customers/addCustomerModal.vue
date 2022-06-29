<template>
  <b-modal id="modal-customer-add" cancel-variant="outline-secondary" ok-title="Login" cancel-title="Close" centered title="Login Form">
    <b-form>
      <b-form-group>
        <label for="fullname">Ad Soyad:</label>
        <b-form-input id="fullname" type="input" placeholder="Ad Soyad" />
      </b-form-group>
      <b-form-group>
        <label for="phone">Telefon:</label>
        <b-form-input id="phone" type="input" placeholder="Telefon" />
      </b-form-group>
      <b-form-group>
        <label for="email">Email:</label>
        <b-form-input id="email" type="email" placeholder="E-Posta" />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      fullname: null,
      email: null,
      phone: null,
    };
  },
};
</script>
