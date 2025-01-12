import { NextFunction, Request, Response } from 'express';
import * as todoLogic from '../business-logic/todo';

// Create a new todo
export const createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, dueDate } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const newTodo = await todoLogic.createTodo(userId, title, dueDate);
    res.status(201).json(newTodo);
  } catch (err: any) {
    next(err);
  }
};

// List all todos for the user
export const getTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Fetch todos from the database
    const todos = await todoLogic.getTodosByUser(userId);

    res.status(200).json(todos);
  } catch (err: any) {
    next(err);
  }
};

// Update a todo
export const updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    const updatedTodo = await todoLogic.updateTodo(Number(todoId), userId, { title, completed, dueDate });

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
export const deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    const isDeleted = await todoLogic.deleteTodo(Number(todoId), userId);

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
export const getCompletedTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const completedTodos = await todoLogic.getCompletedTodos(userId);
    res.status(200).json(completedTodos);
  } catch (err: any) {
    next(err);
  }
};
