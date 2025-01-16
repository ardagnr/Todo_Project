import { Router } from 'express';
import TodoController from '../controllers/todo';

const todoController = new TodoController;

const router = Router();

router.get('/', todoController.getTodos);

router.post('/', todoController.createTodo);

router.put('/:todoId', todoController.updateTodo);

router.delete('/:todoId', todoController.deleteTodo);

router.get('/completed', todoController.getCompletedTodos);

export default router;
