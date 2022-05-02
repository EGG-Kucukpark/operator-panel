<template>
    <b-tabs pills>
        <b-card>
            <b-tab title="Kayıtlar">
                <Logs />
            </b-tab>
              <b-tab title="Sürücü Kayıtlar">
                <DriverLogs />
            </b-tab>
            <b-tab title="Detaylı Kayıtlar">
                <Detailed />
            </b-tab>
        </b-card>
    </b-tabs>
</template>

<script>
import Logs from '../../components/settings/logs/logs.vue'
import Detailed from '../../components/settings/logs/detailed_logs.vue'
import DriverLogs from '../../components/settings/logs/driver_logs.vue'
export default {
    components: {
        Logs,
        Detailed,
        DriverLogs
    },
}
</script>

  