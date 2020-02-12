<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-10 col-lg-8">
      <div class="card card-sm">
        <b-form @submit.prevent="loadTracks">
          <div class="card-body row no-gutters align-items-center">
            <div class="col-auto">
              <i class="fas fa-search h4 text-body"></i>
            </div>
            <!--end of col-->

            <div class="col">
              <input
                class="form-control form-control-lg form-control-borderless"
                type="search"
                placeholder="Buscar canciones"
                v-model="query"
                required
              />
            </div>
            <!--end of col-->
            <div class="col-auto">
              <button class="btn btn-lg btn-primary" type="submit">
                Buscar
              </button>
            </div>

            <!--end of col-->
          </div>
        </b-form>
      </div>
    </div>
    <!--end of col-->
    <b-col cols="12" v-if="!isAuth">
      <h4>
        Para poder guardar canciones
        <router-link to="/signup"> registrate</router-link> o
        <router-link to="/signin"> ingresa</router-link>
      </h4>
    </b-col>

    <b-col cols="12">
      <b-row>
        <b-spinner v-if="loading" label="Cargando..."></b-spinner>
        <tracks-table
          v-else-if="searched"
          :items="tracks"
          emptyMessage="No se han encontrado resultados!"
        >
          <template v-slot:actions="data">
            <b-button-group>
              <b-button @click="addPlaylist(data.data)">
                Agregar a Playlist
              </b-button>
            </b-button-group>
          </template>
        </tracks-table>
      </b-row>
    </b-col>
    <play-list-selector />
  </div>
</template>

<script>
import api from '@/services/api'
import PlayListSelector from '@/components/PlayListSelector'
import { mapGetters } from 'vuex'
import TracksTable from '@/components/TracksTable'


export default {
  components: {
    PlayListSelector,
    TracksTable
  },
  data() {
    return {
      query: "",
      loading: false,
      page: 1,
      tracks: [],
      searched: false
    }
  },
  computed: {
    ...mapGetters({ isAuth: 'isAuth' }),
  },
  methods: {
    async loadTracks() {
      if (!this.query || this.loading) {
        return
      }
      this.loading = true
      const { data: { data } } = await api.playlist.findTracks(this.query, this.page)
      this.searched = true
      this.tracks = data
      this.loading = false
    },
    async changePage(page) {
      this.page = page
      await this.loadTracks()
    },
    addPlaylist(track) {
      this.$root.$emit('add-track-to-playlist', { track })
    }
  }
}
</script>
