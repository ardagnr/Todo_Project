import { Router } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo, getCompletedTodos } from '../controllers/todo';

const router = Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.put('/:todoId', updateTodo);

router.delete('/:todoId', deleteTodo);

router.get('/completed', getCompletedTodos);

export default router;
