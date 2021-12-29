<template>
    <b-tabs lazy>
        <b-tab title="Abone Listesi">
            <subs />
        </b-tab>
        <b-tab title="Red Listesi">
            <unsubs />
        </b-tab>
    </b-tabs>
</template>
<script>
import subs from './components/customers/subs.vue'
import unsubs from './components/customers/unsubs.vue'
export default {
    components: {
        subs,
        unsubs
    }

}

</script>