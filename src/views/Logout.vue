<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted() {
    this.logOut()
    this.$router.push({ name: 'signin' })
  },
  methods: {
    ...mapActions({ logOut: 'logOut' })
  }
}
</script>

