<template>
  <b-row class="justify-content-center">
    <b-col cols="12">
      <h1 class="text-center">Accede a tu cuenta</h1>
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
            placeholder="Escribe un nombre de usuario"
            name="username"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Contrasena" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            required
            type="password"
            placeholder="Contrasena"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Acceder</b-button>
      </b-form>
      <b-col>
        <p>
          Si not tiene cuenta,
          <router-link to="/signup"> registrese aquí</router-link>
        </p>
      </b-col>
    </b-col>
  </b-row>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapActions({ signIn: 'signIn' }),
    async onSubmit() {
      this.loading = true
      const { success, error } = await this.signIn(this.form)
      if (!success) {
        alert(error)
      } else {
        this.$router.push({ name: 'home' })
      }
      this.loading = false
    }
  }
}
</script>
