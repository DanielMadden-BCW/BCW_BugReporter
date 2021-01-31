import { AppState } from '../AppState'
import { api } from './AxiosService'

const baseURL = '/api/notes/'

class NoteService {
  async getNotes(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.bugNotes = res.data
  }

  async createNote(data) {
    await api.post(baseURL, data)
    this.getNotes(data.bug)
  }

  async deleteNote(note) {
    await api.delete(baseURL + note.id)
    this.getNotes(note.bug.id)
  }

  async editNote(update, note) {
    await api.put(baseURL + note.id, update)
    this.getNotes(note.bug.id)
  }
}

export const noteService = new NoteService()
