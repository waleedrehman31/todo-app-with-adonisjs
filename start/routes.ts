/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TodosController = () => import('#controllers/todos_controller')
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

// router.get('/todos', [TodosController, 'index'])
router.resource('todos', TodosController)
