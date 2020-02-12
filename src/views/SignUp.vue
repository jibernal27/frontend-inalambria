<template>
  <b-row class="justify-content-center">
    <b-col cols="12">
      <h1 class="text-center">Crea una nueva cuenta</h1>
    </b-col>
    <b-col cols="12" md="10" lg="8">
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Nombre de usuario"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            required
            minlength="6"
            placeholder="Escribe un nombre de usuario"
            name="username"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Contrasena" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            minlength="8"
            placeholder="Contrasena"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Confirma la contrasena"
          label-for="input-2"
        >
          <b-form-input
            id="input-3"
            v-model="form.paswordConfirm"
            type="password"
            required
            minlength="8"
            placeholder="Contrasena"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Registrase</b-button>
      </b-form>
      <b-col>
        <p>
          Si ya tiene cuenta,
          <router-link to="/signin"> acceda aquí</router-link>
        </p>
      </b-col>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import api from '@/services/api'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        paswordConfirm: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapActions({ setToken: 'setToken', setProfile: 'setProfile' }),
    async onSubmit() {
      this.loading = true
      const { data, success, error } = await api.user.signUp(this.form.username, this.form.password)
      if (success) {
        await this.setProfile(data)
        await this.setToken(data.auth)
        this.$router.push({ name: 'home' })
      } else {
        alert(error)
      }
      this.loading = false
    }
  }
}
</script>
