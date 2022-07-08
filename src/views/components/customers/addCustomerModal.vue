<template>
  <b-modal ref="newcustomermodal" @hide="cleanInputs" id="modal-customer-add" cancel-variant="outline-secondary" hide-footer centered title="Müşteri Ekle">
    <validation-observer ref="loginForm" #default="{ invalid }">
      <b-form>
        <validation-provider #default="{ errors }" name="Ad Soyad" rules="required">
          <b-form-group>
            <label for="fullname">Ad Soyad:</label>
            <b-form-input v-model="fullname" id="fullname" placeholder="Ad Soyad" />
          </b-form-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <validation-provider name="Telefon" rules="required|min:13">
          <b-form-group>
            <label for="phone">Telefon:</label>
            <b-form-input v-mask="['05## ### ####']" @keydown.delete="phoneCheck" v-model="phone" id="phone" placeholder="Telefon" />
          </b-form-group>
        </validation-provider>
        <validation-provider #default="{ errors }" name="E-Posta" rules="email">
          <b-form-group>
            <label for="email">Email:</label>
            <b-form-input v-model="email" id="email" placeholder="E-Posta" />
          </b-form-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form>
      <hr />

      <b-button @click="userCheck" variant="primary" type="submit" block :disabled="invalid">
        <span>Müşteri Ekle</span>
      </b-button>
    </validation-observer>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import { mask } from "vue-the-mask";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    mask,
  },
  data() {
    return {
      fullname: null,
      email: null,
      phone: "05",

      required,
      email,
    };
  },
  methods: {
    userCheck() {
      this.$http
        .post("/webUsers/checkUser", {
          phone: this.phone.replaceAll(" ", ""),
        })
        .then((response) => {
          if (response) {
            this.$toastBus.$emit("Notification", {
              variant: "danger",
              title: "Müşteri zaten mevcut",
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.newUser();
          }
        });
    },
    newUser() {
      this.$http
        .post("/webUsers", {
          fullname: this.fullname,
          email: this.email,
          phone: this.phone.replaceAll(" ", ""),
        })
        .then((response) => {
          this.$store.dispatch("newCustomer", response.data);
          this.$toastBus.$emit("Notification", {
            variant: "success",
            title: "Müşteri eklendi",
          });
          this.$refs.newcustomermodal.hide();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    phoneCheck(event) {
      if (this.phone.length < 3) event.preventDefault();
    },
    cleanInputs() {
      this.fullname = null;
      this.email = null;
      this.phone = "05";
    },
  },
};
</script>
