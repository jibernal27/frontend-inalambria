<template>
  <b-col cols="6" sm="12">
    <b-row>
      <b-col cols="12">
        <a :href="track.link" target="_blank">
          <h5>{{ track.title }}</h5>
        </a>
      </b-col>
      <b-col cols="12">
        <b-img :src="imageUrl" fluid :alt="track.title" />
      </b-col>
      <b-col cols="12" v-id="isAuth">
        <b-button-group>
          <b-button @click="addPlaylist">
            Agregar a Playlist
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    track: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters({ isAuth: 'isAuth' }),
    imageUrl() {
      const { album } = this.track
      if (album) {
        return album.cover
      }
      return null
    }
  },
  methods: {
    addPlaylist() {
      this.$root.$emit('add-track-to-playlist', { track: this.track })
    }
  }
}
</script>
