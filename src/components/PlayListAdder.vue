<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group
      id="input-group-1"
      label="Nombre de la lista"
      label-for="input-1"
    >
      <b-form-input
        id="input-1"
        v-model="name"
        type="text"
        required
        placeholder="Escribe un nombre para la lista"
        name="name"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Crear</b-button>
  </b-form>
</template>

<script>
import api from '@/services/api'

export default {
  data() {
    return { loading: false, name: '' }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      const { success, data, error } = await api.playlist.createPlayList(this.name)
      if (success) {
        this.$store.commit('ADD_PLAYLIST', data)
        this.$root.$emit('add-playlist-to-track', data)
        this.$emit('added')
      } else {
        alert(error)
      }
      this.loading = false
    }
  }
}
</script>