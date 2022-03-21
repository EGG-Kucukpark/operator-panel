<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div style="max-width:800px" class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">Hey Taksi Operator Paneli</h2>
        </b-link>

        <!-- form -->
        <validation-observer ref="loginForm" #default="{ invalid }">
          <b-form class="auth-login-form mt-2" @submit.prevent="login">
            <b-alert v-if="error" variant="danger" show>
              <h4 class="alert-heading">Hata!</h4>
              <div class="alert-body">
                <span>Lütfen girdiğiniz bilgileri kontrol ediniz.</span>
              </div>
            </b-alert>
            <!-- email -->
            <b-form-group label-for="phone" label="Telefon Numarası">
              <validation-provider #default="{ errors }" name="Telefon Numarası" rules="required">
                <b-input-group>
                  <b-input-group-prepend
                    :style="errors.length > 0 ? 'border-color: red' : ''"
                    is-text
                  >TR (+90)</b-input-group-prepend>
                  <cleave
                    id="phone"
                    v-model="phone"
                    class="form-control"
                    @input="error = false"
                    :raw="false"
                    style="border-radius: 5px !important;"
                    :style="errors.length > 0 ? 'border-color: red' : ''"
                    :options="options.phone"
                    placeholder="535 514 1450"
                  />
                </b-input-group>

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <validation-provider #default="{ errors }" name="Şifre" rules="required">
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    @input="error = false"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false : null"
                    name="login-password"
                    placeholder="Şifre"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button variant="primary" type="submit" block :disabled="invalid">
              <b-spinner v-if="clicked"></b-spinner>
              <span v-else style="font-size:20px">Giriş Yap</span>
            </b-button>
          </b-form>
        </validation-observer>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Cleave
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      phone: '',
      password: '',
      status: '',
      error: false,
      clicked:false,
      // validation rules
      required,
      email,
      options: {
        phone: {
          phone: true,
          phoneRegionCode: 'US',
        },
      },
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },

  methods: {

    login() {

      this.clicked = true
      this.$http.post('/operator/login', {
        phone: '90' + this.phone.replace(/\D/g, ''),
        password: this.password

      }).then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.data.token)
        this.$router.push('/')
        this.clicked = false
      }).catch(err => {
        this.error = true
        this.clicked = false
      })


    },


  }
}
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>

@import "@core/scss/vue/pages/page-auth.scss";
