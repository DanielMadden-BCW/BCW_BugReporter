import { dbContext } from '../db/DbContext'

class NotesService {
  async getNotes(bugId, query = {}) {
    return await dbContext.Notes.find({ bug: bugId, ...query }).populate('bug')
  }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async delete(id, userId) {
    const check = await dbContext.Notes.findById(id).populate('bug')
    if (!check) return 'no comment by id'
    if (check.creatorId !== userId && check.bug.creatorId !== userId) return 'you are not the owner of this comment, nor the owner of the bug report'
    return await dbContext.Notes.findByIdAndDelete(id)
  }

  async edit(id, userId, body) {
    const check = await dbContext.Notes.findById(id)
    if (!check) return 'no comment by id'
    if (check.creatorId !== userId) return 'you are not the owner of this comment'
    return await dbContext.Notes.findByIdAndUpdate(id, body, { new: true, upsert: false })
  }
}

export const notesService = new NotesService()
