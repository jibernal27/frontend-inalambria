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
    <b-col cols="12">
      <b-row>
        <track-item v-for="t in tracks" :track="t" :key="t.id" />
      </b-row>
    </b-col>
  </div>
</template>

<script>
import api from '@/services/api'
import TrackItem from '@/components/TrackItem'

export default {
  components: {
    TrackItem
  },
  data() {
    return {
      query: "",
      loading: false,
      page: 1,
      tracks: []
    }
  },
  methods: {
    async loadTracks() {
      if (!this.query || this.loading) {
        return
      }
      this.loading = true
      const { data: { data } } = await api.playlist.findTracks(this.query, this.page)
      this.tracks = data
      this.loading = false
    },
    async changePage(page) {
      this.page = page
      await this.loadTracks()
    }
  }
}
</script>
