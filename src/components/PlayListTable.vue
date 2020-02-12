<template>
  <div>
    <b-table
      striped
      hover
      responsive
      :items="playlists"
      :fields="fields"
      show-empty
    >
      <template v-slot:empty="">
        <h4>No tienes listas de reproducción, agrega una</h4>
      </template>
      <template v-slot:cell(createdAt)="data">
        <span>{{ data.value | moment("LLL") }}</span>
      </template>
      <template v-slot:cell(actions)="data">
        <b-button-group>
          <b-button variant="default">
            <router-link :to="`playlists/${data.item.id}`"> Detalle</router-link>
          </b-button>
          <b-button variant="danger" @click="deletePlayList(data.item)">
            Eliminar
          </b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/services/api'

export default {
  data() {
    return {
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: 'Nombre' },
        { key: 'createdAt', label: 'Creada' },
        { key: 'actions', label: 'Acciones' }
      ]
    }
  },
  computed: {
    ...mapGetters({ playlists: 'playlists' })
  },
  methods: {
    async deletePlayList(playlist) {
      const doDelete = await confirm('Desea eliminar esta lista?')
      if (doDelete) {
        this.loading = true
        const { success, error } = await api.playlist.deletePlayList(playlist.id)
        if (success) {
          this.$store.commit('DELETE_PLAYLIST', playlist)
        } else {
          alert(error)
        }
        this.loading = false
      }
    }
  }
}
</script>