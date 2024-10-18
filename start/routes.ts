/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TodosController = () => import('#controllers/todos_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.on('/').render('pages/home')

// router.get('/todos', [TodosController, 'index'])

router.resource('todos', TodosController).use('*', middleware.auth())

router.get('/login', [UsersController, 'index']).as('login')
router.post('/login', [UsersController, 'login'])
router.get('/register', [UsersController, 'create'])
router.post('/register', [UsersController, 'store'])
