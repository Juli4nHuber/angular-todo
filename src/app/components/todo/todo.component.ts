import { Component } from '@angular/core';
import { filterType, todoModel } from '../../models/todo';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent {
  faPencil = faPencil;
  faTrash = faTrash;
  faPlus = faPlus;
  faCheck = faCheck

  todoList: todoModel[] = [
    {
      id: 1,
      title: 'Comprar leche',
      isCompleted: false,
      isEditing: false
    },
    {
      id: 2,
      title: 'Comprar pan',
      isCompleted: false,
      isEditing: false
    },
    {
      id: 3,
      title: 'Comprar queso',
      isCompleted: false,
      isEditing: false
    }];

  todoListFilter: todoModel[] = this.todoList;

  filter: filterType = 'all';

  changeFilter(filter: filterType){
    this.filter = filter;
    if(filter == 'active'){
      return this.todoListFilter = this.todoList.filter((todo) => {
        return !todo.isCompleted;
      })
    }
    if(filter == 'completed'){
      return this.todoListFilter = this.todoList.filter((todo) => {
        return todo.isCompleted;
      })
    }
    return this.todoListFilter = this.todoList;
  }

  newTodo = new FormControl('', [Validators.required]);
  addTodo(){
    const newTodoTitle = this.newTodo.value;
    if(newTodoTitle && this.newTodo.valid){
      this.todoList.push({
        id: Date.now(),
        title: newTodoTitle,
        isCompleted: false,
        isEditing: false
      })
    }
    this.newTodo.setValue('');
  }

  updateTodoForm = new FormControl('', [Validators.required]);
  updateTodo(id: number){
    const updateTodoTitle = this.updateTodoForm.value;
    if (updateTodoTitle && this.updateTodoForm.valid) {
      const index = this.todoList.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todoList[index].title = updateTodoTitle;
        this.todoList[index].isEditing = false;
      }
    }
  }
  
  deleteTodo(id: number){
    const index = this.todoList.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
  }
}
