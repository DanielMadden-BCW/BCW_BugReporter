import { dbContext } from '../db/DbContext'

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query)
  }

  async getById(id) {
    return await dbContext.Bugs.findById(id).populate('creator')
  }

  async create(data) {
    return await dbContext.Bugs.create(data)
  }

  async close(id) {
    // return await dbContext.Bugs.findByIdAndDelete(id)
    return await dbContext.Bugs.findByIdAndUpdate(id, { closed: true }, { new: true, upsert: false })
  }

  async delete(id) {
    return await dbContext.Bugs.findByIdAndDelete(id)
    // return await dbContext.Bugs.findByIdAndUpdate(id, { closed: true })
  }

  async deleteAll() {
    return await dbContext.Bugs.deleteMany({})
  }

  async edit(id, body) {
    const object = await dbContext.Bugs.findById(id)
    if (!object.closed) {
      return await dbContext.Bugs.findByIdAndUpdate(id, body, { new: true, upsert: false })
    }
  }
}

export const bugsService = new BugsService()
