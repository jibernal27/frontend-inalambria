<template>
  <div>
    <b-navbar variant="info" toggleable="lg">
      <b-navbar-brand to="/">TrackCollection</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="isAuth" to="/playlists">Mis PlayLists</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="isAuth">
          <b-nav-item to="/playlists">{{ profile.username }} </b-nav-item>
          <b-nav-item to="logout">
            Cerrar sesion
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item to="/signin">
            Acceder
          </b-nav-item>
          <b-nav-item to="/signup">
            Crear cuenta
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ isAuth: 'isAuth', profile: 'profile' })
  }
}
</script>
