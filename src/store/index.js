import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api'
import axios from '@/services/client'

Vue.use(Vuex)

const state = {
  user: null,
  playlist: []
}
const mutations = {
  SET_PROFILE(state, profile) {
    state.user = profile
  },
  SET_PLAY_LIST(state, playlist) {
    state.playlist = playlist
  },
  ADD_PLAYLIST(state, playlist) {
    state.playlist = [...state.playlist, playlist]
  },
  DELETE_PLAYLIST(state, playlist) {
    const playlistsState = state.playlist
    const index = playlistsState.indexOf(playlist)
    if (index > -1) {
      playlistsState.splice(index, 1)
    }
    state.playlist = playlistsState
  }
}
const actions = {
  async setToken({ dispatch }, auth) {
    axios.defaults.headers.common['Authorization'] = auth
    localStorage.setItem('token', auth)
    await dispatch('loadData')
  },
  async setProfile({ commit }, data) {
    commit('SET_PROFILE', data)
  },
  async signIn({ commit, dispatch }, { username, password }) {
    const response = await api.user.signIn(username, password)
    if (response.success) {
      const { data } = response
      commit('SET_PROFILE', data)
      dispatch('setToken', data.auth)
    }
    return response
  },
  async loadData({ commit }) {
    const { success, data } = await api.playlist.listPlayList()
    if (success) {
      commit('SET_PLAY_LIST', data)
    }
  },
  async checkToken({ commit, dispatch }) {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = token
      const response = await api.user.profile()
      if (response.success) {
        const { data } = response
        dispatch('setToken', token)
        commit('SET_PROFILE', data)
      } else {
        dispatch('logOut')
      }
    }
  },
  async logOut({ commit }) {
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
    commit('SET_PROFILE', null)
  }
}
const getters = {
  isAuth: ({ user }) => !!user,
  profile: ({ user }) => user,
  playlists: ({ playlist }) => playlist
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})
