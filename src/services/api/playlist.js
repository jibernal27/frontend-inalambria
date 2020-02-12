import axios from './../client'
import { parseError } from './helper'

export default {
  async findTracks(query, page) {
    try {
      const response = await axios.get('search', { params: { query, page } })
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  },
  async listPlayList(params) {
    try {
      const response = await axios.get('playlists', { params })
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  },
  async createPlayList(name) {
    try {
      const response = await axios.post('playlists', { name })
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  },
  async addToPlayList(id, tracks) {
    try {
      const response = await axios.post(`playlists/${id}`, { tracks })
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  },
  async deletePlayList(id) {
    try {
      const response = await axios.delete(`playlists/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  },
  async getTracks(id) {
    try {
      const response = await axios.get(`playlists/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  },

  async removeTrack(id, trackId) {
    try {
      const response = await axios.delete(`playlists/${id}/tracks/${trackId}`)
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  }
}
