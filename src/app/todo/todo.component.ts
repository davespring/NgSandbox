import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm }    from '@angular/forms';
import { Todo } from './todo';

@Component({
    moduleId: module.id,
    selector: 'todo',
    templateUrl: 'todo.component.html',
    styleUrls: ['todo.component.css']
})

export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  lastId: number = 0;
  
  // New Todo from input
  newTodo: Todo = new Todo();

  constructor(){}
  ngOnInit(){
    console.log("TodoComponent Initialized")
  }

  // This would go in the todo.service
  // and we could then change the addTodoFinal to addTodo
  addTodo(todo: Todo){
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  addTodoFinal(){
    this.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  getAllTodos(): Todo[]{
    return this.todos;
  }

  removeTodo(id: number){
    this.todos = this.todos
      .filter(todo => todo.id != id);

    if(this.todos.length == 0){
      this.lastId = 0;
    }
  }



  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });

    return updatedTodo;
  }


  // Update todo item text-decoration
  strikeThrough(todo: Todo){
    if(todo.complete){
      return "line-through";
    }else{
      return "";
    }
  }

}