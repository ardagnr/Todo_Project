import { NextFunction, Request, Response } from 'express';
import TodoService from '../business-logic/todo';

const todoService = new TodoService;

class TodoController{
// Create a new todo
  async createTodo  (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { title, dueDate } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const newTodo = await todoService.createTodo(userId, title, dueDate);
      res.status(201).json(newTodo);
    } catch (err: any) {
      next(err);
    }
  };

  // List all todos for the user
  async getTodos (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      // Fetch todos from the database
      const todos = await todoService.getTodosByUser(userId);

      res.status(200).json(todos);
    } catch (err: any) {
      next(err);
    }
  };

  // Update a todo
  async updateTodo (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { todoId } = req.params;
      const { title, completed, dueDate } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      if (!todoId || isNaN(Number(todoId))) {
        res.status(400).json({ message: 'Invalid todo ID' });
        return;
      }

      const updatedTodo = await todoService.updateTodo(Number(todoId), userId, { title, completed, dueDate });

      if (!updatedTodo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }

      res.status(200).json(updatedTodo);
    } catch (err: any) {
      next(err);
    }
  };

  // Delete a todo
  async deleteTodo (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { todoId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      if (!todoId || isNaN(Number(todoId))) {
        res.status(400).json({ message: 'Invalid todo ID' });
        return;
      }

      const isDeleted = await todoService.deleteTodo(Number(todoId), userId);

      if (!isDeleted) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }

      res.status(204).send();
    } catch (err: any) {
      next(err);
    }
  };

  // List completed todos
  async getCompletedTodos (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const completedTodos = await todoService.getCompletedTodos(userId);
      res.status(200).json(completedTodos);
    } catch (err: any) {
      next(err);
    }
  };
}

export default TodoController;

