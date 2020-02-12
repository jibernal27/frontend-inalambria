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
  }
}
