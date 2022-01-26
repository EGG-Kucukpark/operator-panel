<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import toastBus from '@/eventBus'

export default {
  components: {
    ToastificationContent,
  },
  mounted() {
    toastBus.$on('toast', data => {
      console.log(data)
      data.type === 'customer' ? this.notification(data) : null
      data.type === 'Konum' ? this.konum(data) : null
      data.type === 'success' ? this.success(data) : null
      data.type === 'error' ? this.error(data) : null
      data.type === 'redirect' ? this.call(data) : null
      data.type === 'Konumiptal' ? this.konumiptal(data) : null
      data.type === 'emergency' ? this.emergency(data) : null
    })
  },

  methods: {

    success() {
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: 'İşlem Durumu ',
          icon: 'BriefcaseIcon',
          variant: 'success',
          text: ' İşlem Başarılı.',
        },
      })
    },

    error() {
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: 'Yeni Mesaj! ',
          icon: 'BriefcaseIcon',
          variant: 'danger',
          text: 'İşlem Başarısız.',
        },
      })
    },

    emergency() {
      const audio = new Audio('/audio/emergency.mp3')
      audio.play()

      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: 'İşlem Durumu ',
          icon: 'BriefcaseIcon',
          variant: 'danger',
          text: 'Şöför Alarm Verdi!!!!',
        },
      })
    },

    notification(data) {
      const audio = new Audio('/audio/notification.mp3')
      audio.play()
      this.$toast({
        component: ToastificationContent,
        position: 'top',
        props: {
          title: 'Yeni Mesaj! ',
          icon: 'MessageSquareIcon',
          variant: 'warning',
          text: `${data.msg.pushName} (${data.msg.key.remoteJid.slice(0, data.msg.key.remoteJid.indexOf('@'))}), tarafından yeni mesaj geldi!`,
        },
      })
    },

    konum(data) {
      const audio = new Audio('/audio/notification.mp3')
      audio.play()
      this.$toast({
        component: ToastificationContent,
        position: 'top',
        props: {
          title: 'Yeni Konum! ',
          icon: 'MessageSquareIcon',
          variant: 'warning',
          text: `${data.msg.pushName} (${data.msg.key.remoteJid.slice(0, data.msg.key.remoteJid.indexOf('@'))}), tarafından yeni konum geldi!`,
        },
      })
    },

    konumiptal(data) {
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title: 'Yeni Uyarı! ',
          icon: 'BriefcaseIcon',
          variant: 'danger',
          text: `${data.msg.pushName} (${data.msg.key.remoteJid.slice(0, data.msg.key.remoteJid.indexOf('@'))}), Müşteri Taksi İsteğini reddetti.`,
        },
      })
    },
    call() {
      this.$toast({
        component: ToastificationContent,
        position: 'top',
        props: {
          title: 'Yönlendirme Yapıldı! ',
          icon: 'PhoneIcon',
          variant: 'success',
          text: 'Müşteri Başarıyla Yönlendirildi.',
        },
      })
    },

  },
}
</script>
