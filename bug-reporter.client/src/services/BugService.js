import { AppState } from '../AppState'
import { api } from './AxiosService'

const baseURL = '/api/bugs/'

class BugService {
  async getBugs() {
    const res = await api.get(baseURL)
    AppState.bugs = res.data
  }

  async getBug(id) {
    const res = await api.get(baseURL + id)
    AppState.bug = res.data
  }

  async createBug(data) {
    const res = await api.post(baseURL, data)
    return res.data.id
  }

  async editBug(update, bugId) {
    await api.put(baseURL + bugId, update)
    this.getBug(bugId)
  }

  async closeBug(bugId) {
    await api.delete(baseURL + bugId)
    this.getBug(bugId)
  }
}

export const bugService = new BugService()
