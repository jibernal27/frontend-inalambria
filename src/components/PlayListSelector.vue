<template>
  <b-modal
    title="Seleccionar listas"
    v-model="show"
    centered
    scrollable
    ok-title="Guardar"
    cancel-title="Cancelar"
    @ok="addToLists"
    @hidden="resetModal"
  >
    <b-container>
      <b-row>
        <b-col cols="12">
          <play-list-adder v-if="addNew" @added="addNew = false" />
          <b-button @click="addNew = true" v-else>
            Agregar nueva
          </b-button>
        </b-col>
        <ul v-for="p in playlists" :key="p.id">
          <input
            :id="p.id"
            :value="p"
            name="playlist"
            type="checkbox"
            v-model="checkdLists"
          />
          <label :for="p.id"
            ><span>{{ p.name }}</span></label
          >
        </ul>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayListAdder from "@/components/PlayListAdder.vue";
import api from '@/services/api'

export default {
  components: {
    PlayListAdder
  },
  data() {
    return {
      show: false,
      track: null,
      checkdLists: [],
      loading: false,
      addNew: false
    }
  },
  computed: {
    ...mapGetters({ playlists: 'playlists' })
  },
  mounted() {
    this.$root.$on('add-track-to-playlist', this.setTrack)
    this.$root.$on('add-playlist-to-track', this.addToSelected)
  },
  methods: {
    setTrack({ track }) {
      this.track = track
      this.show = true
    },
    async addToLists() {
      this.loading = true
      await Promise.all(this.checkdLists.map(l => api.playlist.addToPlayList(l.id, [{ track: this.track.id }])))
      alert('Added')
      this.loading = false
    },
    addToSelected(playList) {
      if (!this.checkdLists.some(s => s.id === playList.id)) {
        this.checkdLists = [...this.checkdLists, playList]
      }
    },
    resetModal() {
      this.track = null
      this.checkdLists = []
    }
  }
}
</script>

<style scoped>
ul {
  display: inline;
}
</style>