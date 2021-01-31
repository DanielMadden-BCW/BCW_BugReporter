import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

let deletingAll = false
let timeout

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getNotes)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.close)
      .delete('/:id/delete', this.delete)
      .delete('', this.deleteAll)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await bugsService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      return res.send(await bugsService.getById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      return res.send(await notesService.getNotes(req.params.id, req.query))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      return res.send(await bugsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async close(req, res, next) {
    try {
      return res.send(await bugsService.close(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      return res.send(await bugsService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async deleteAll(req, res, next) {
    try {
      if (req.query.confirm && !deletingAll) {
        deletingAll = true
        timeout = setTimeout(function() { deletingAll = false }, 10000)
        return res.send('request delete again within the next 10 seconds to confirm')
      } else if (req.query.confirm && deletingAll) {
        clearInterval(timeout)
        deletingAll = false
        return res.send(await bugsService.deleteAll())
      } else return res.send('confirm necessary')
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      return res.send(await bugsService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
