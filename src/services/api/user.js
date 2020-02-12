import axios from './../client'
import { parseError } from './helper'

export default {
  async signUp(username, password) {
    try {
      const response = await axios.post('user/signup', { username, password })
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  },
  async signIn(username, password) {
    try {
      const response = await axios.post('user/signin', { username, password })
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  },
  async profile() {
    try {
      const response = await axios.get('user/profile')
      return { success: true, data: response.data }
    } catch (error) {
      return parseError(error)
    }
  }
}
