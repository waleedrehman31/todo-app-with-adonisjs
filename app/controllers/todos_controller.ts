import Todo from '#models/todo'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const todos = await Todo.all()
    return view.render('pages/todo/index', { todos })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/todo/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const title = request.body().title
    Todo.create({ title })
    return response.redirect().toRoute('todos.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const todo = await Todo.find(params.id)
    return view.render('pages/todo/show', { todo })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const todo = await Todo.find(params.id)
    return view.render('pages/todo/edit', { todo })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const title = request.body().title
    const todo = await Todo.findOrFail(params.id)
    todo.title = title
    await todo.save()
    return response.redirect().toRoute('todos.show', [params.id])
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    console.log(params)
    const todo = await Todo.findOrFail(params.id)
    todo.delete()
    return response.redirect().toRoute('todos.index')
  }
}
