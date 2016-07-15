import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoService {

    // Placeholder for last id for auto-incrementing purposes
    lastId: number = 0;

    // Todo's
    todos: Todo[] = [];

    constructor() {}

    // POST /todos
    addTodo(todo: Todo) : TodoService {
        if (!todo.id) {
            todo.id = ++this.lastId;
        }

        this.todos.push(todo);
        return this;
    }

    // DELETE /todos/:id
    deleteTodoById(id: number): TodoService {
        this.todos = this.todos.filter(todo => todo.id !== id);
        return this;
    }

    // PUT /todos/:id
    updateTodoById(id: number, values: Object = {}): Todo {
        let todo = this.getTodoById(id);
        if (!todo) {
            return null;
        }

        Object.assign(todo, values);
        return todo;
    }

    // GET /todos
    getAllTodos() : Todo[] {
        return this.todos;
    }

    getTodoById(id: number) : Todo {
        return this.todos.filter(todo => todo.id === id).pop();
    }

    toggleTodoComplete(todo: Todo) {
        let updatedTodo = this.updateTodoById(todo.id, { complete: !todo.complete });

        return updatedTodo;
    }
}
