/* eslint-disable-next-line no-unused-vars */
import _ from 'lodash';
import './reset.css';
import './style.css';
import ToDoList from './toDo.js';
import handlers from './handlers.js';

const toDoList = new ToDoList();

document.querySelector('#add-item').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const description = document.getElementById('add-item');
    const task = toDoList.createTask(description.value);
    toDoList.addTask(task);
    handlers.saveLocalSorage(toDoList.data);
    //localStorage.setItem('toDoList', JSON.stringify(toDoList.data));//local storage function
    description.value = '';
  }
});

document.querySelector('#delete-all').addEventListener('click', () => {
  toDoList.data.forEach((task) => {
    if (task.completed) {
      toDoList.data = removeItem(task, toDoList.data);
      handlers.saveLocalSorage(toDoList.data);
      //localStorage.setItem('toDoList', JSON.stringify(toDoList.data));//local storage function
      //const taskList = document.getElementById('main-list');
      handlers.taskList.innerHTML = '';
      toDoList.displayList();
    }
  });
});

window.onload = () => {
  toDoList.data = JSON.parse(localStorage.getItem('toDoList' || '[]'));//get list function
  if (toDoList.data === null) {
    toDoList.data = [];
    return;
  }
  toDoList.displayList();
};
