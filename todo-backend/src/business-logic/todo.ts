import Todo from '../models/todoModel';

// Add a new todo
export const createTodo = async (userId: number, title: string, dueDate: string) => {
  const todo = await Todo.create({
    title,
    dueDate,
    userId,
    completed: false,
  });
  return todo;
};

// List all todos for a specific user
export const getTodosByUser = async (userId: number) => {
  const todos = await Todo.findAll({
    where: { userId },
  });
  return todos;
};

// Update a specific todo
export const updateTodo = async (todoId: number, userId: number, updates: Partial<{ title: string; completed: boolean; dueDate: string }>) => {
  const todo = await Todo.findOne({ where: { id: todoId, userId } });

  if (!todo) {
    throw new Error('Todo not found or you do not have permission to modify it');
  }

  await todo.update(updates);
  return todo;
};

// Delete a specific todo
export const deleteTodo = async (todoId: number, userId: number) => {
  const todo = await Todo.findOne({ where: { id: todoId, userId } });

  if (!todo) {
    throw new Error('Todo not found or you do not have permission to delete it');
  }

  await todo.destroy();
  return { message: 'Todo deleted successfully' };
};

// Filter completed todos
export const getCompletedTodos = async (userId: number) => {
  const todos = await Todo.findAll({
    where: { userId, completed: true },
  });
  return todos;
};
