import Todo from '../models/todoModel';

class TodoService{
  // Add a new todo
  async createTodo (userId: number, title: string, dueDate: string) {
    const todo = await Todo.create({
      title,
      dueDate,
      userId,
      completed: false,
    });
    return todo;
  };

  // List all todos for a specific user
  async  getTodosByUser (userId: number) {
    const todos = await Todo.findAll({
      where: { userId },
    });
    return todos;
  };

  // Update a specific todo
  async  updateTodo (todoId: number, userId: number, updates: Partial<{ title: string; completed: boolean; dueDate: string }>){
    const todo = await Todo.findOne({ where: { id: todoId, userId } });

    if (!todo) {
      throw new Error('Todo not found or you do not have permission to modify it');
    }

    await todo.update(updates);
    return todo;
  };

  // Delete a specific todo
  async  deleteTodo (todoId: number, userId: number){
    const todo = await Todo.findOne({ where: { id: todoId, userId } });

    if (!todo) {
      throw new Error('Todo not found or you do not have permission to delete it');
    }

    await todo.destroy();
    return { message: 'Todo deleted successfully' };
  };

  // Filter completed todos
  async  getCompletedTodos (userId: number) {
    const todos = await Todo.findAll({
      where: { userId, completed: true },
    });
    return todos;
  };
}

export default TodoService;