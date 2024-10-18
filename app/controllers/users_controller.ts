import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async login({ request, auth,  response }: HttpContext) {
    const email = request.body().email
    const password = request.body().password
    const user = await User.findBy('email', email)

    if (!user) {
      return response.abort('Invalid credentials')
    }

    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      return response.abort('Invalid credentials')
    }

    await auth.use('web').login(user)
    response.redirect('/todos')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const fullName = request.body().full_name
    const email = request.body().email
    const password = request.body().password

    User.create({
      fullName: fullName,
      email: email,
      password: password,
    })
    return response.redirect().toRoute('login')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
