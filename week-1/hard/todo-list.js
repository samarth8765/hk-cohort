/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todo = [];
  }
  add(task) {
    this.todo.push(task);
  }

  remove(taskID) {
    if (taskID >= 0 && taskID < this.todo.length) {
      this.todo.splice(taskID, 1);
    }
  }

  update(taskID, updatedTask) {
    if (taskID >= 0 && taskID < this.todo.length) {
      this.todo[taskID] = updatedTask;
    }
  }

  getAll() {
    return this.todo;
  }

  get(taskID) {
    return this.todo[taskID] || null;
  }

  clear() {
    this.todo = [];
  }
}

module.exports = Todo;
