<template>
  <b-row class="justify-content-center" v-if="!loading && playList">
    <b-col cols="12">
      <h1 class="text-center">{{ playList.name }}</h1>
    </b-col>
    <tracks-table
      :items="playList.tracks"
      emptyMessage="Esta lista no tiene canciones, agrega una!"
    >
      <template v-slot:actions="data">
        <b-button-group>
          <b-button variant="danger" @click="removeTrack(data.data)">
            Eliminar
          </b-button>
        </b-button-group>
      </template>
    </tracks-table>
  </b-row>
  <b-spinner v-else label="Cargando..."></b-spinner>
</template>

<script>
import api from '@/services/api'
import TracksTable from '@/components/TracksTable'
export default {
  components: {
    TracksTable
  },
  data() {
    return {
      id: null,
      playList: {
        tracks: []
      },
      loading: false
    }
  },
  mounted() {
    const playList = this.$route.params.id
    if (playList != undefined) {
      this.id = playList
      this.loadTracks()
    }
  },
  methods: {
    async loadTracks() {
      this.loading = true
      const { data, success, error } = await api.playlist.getTracks(this.id)
      if (success) {
        this.playList = data
      } else {
        alert(error)
      }
      this.loading = false
    },
    async removeTrack(track) {
      const doDelete = await confirm('Desea eliminar esta canción de la lista?')
      if (doDelete) {
        const { success, error } = await api.playlist.removeTrack(this.id, track.id)
        if (success) {
          const current = this.playList.tracks
          const index = current.indexOf(track)
          if (index > -1) {
            current.splice(index, 1)
          }
          this.playList = { ...this.playList, tracks: current }

        } else {
          alert(error)
        }
      }

    }
  }
}
</script>
