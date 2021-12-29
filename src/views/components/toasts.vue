<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import toastBus from '@/eventBus'
export default {
    components: {
        ToastificationContent
    },
    mounted() {

        toastBus.$on('toast', (data) => {

            if (typeof (data) === "object") { this.notification(data) } else {
                switch (data) {
                    case 'success':
                        this.basarili()
                        break;
                    case "call":
                        this.call()
                        break;
                    default:
                        this.basarisiz()
                        break;

                }
            }


        }

        );
    },


    methods: {

        basarili() {

            this.$toast({
                component: ToastificationContent,
                position: "top-right",
                props: {
                    title: `İşlem Durumu `,
                    icon: "BriefcaseIcon",
                    variant: "success",
                    text: ` İşlem Başarılı.`,
                },
            });
        },

        basarisiz() {
            this.$toast({
                component: ToastificationContent,
                position: "top-right",
                props: {
                    title: `Yeni Mesaj! `,
                    icon: "BriefcaseIcon",
                    variant: "danger",
                    text: `İşlem Başarısız.`,
                },
            });
        },

        notification(data) {
            var audio = new Audio('/audio/notification.mp3');
            audio.play();
            this.$toast({
                component: ToastificationContent,
                position: "top",
                props: {
                    title: `Yeni Mesaj! `,
                    icon: "MessageSquareIcon",
                    variant: "warning",
                    text: `${data.pushName} (${data.key.remoteJid.slice(0, data.key.remoteJid.indexOf('@'))}), tarafından yeni mesaj geldi!`,
                },
            });
        },

        call() {

            this.$toast({
                component: ToastificationContent,
                position: "top",
                props: {
                    title: `Arama Yapıldı! `,
                    icon: "PhoneIcon",
                    variant: "success",
                    text: `Arama Başarıyla Gerçekleşti.`,
                },
            });
        },

    }
}
</script>