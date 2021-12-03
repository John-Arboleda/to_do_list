/* eslint-disable-next-line no-unused-vars */
import _ from 'lodash';
import './reset.css';
import './style.css';
import ToDoList from './toDo.js';
import fakeList from './fakeList.js';

const toDoList = new ToDoList();

function populate(aList) {
  aList.forEach((task) => {
    const newTask = toDoList.createTask(task.description);
    toDoList.addTask(newTask);
  });
}

document.querySelector('#add-item').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const description = document.getElementById('add-item');
    const task = toDoList.createTask(description.value);
    toDoList.addTask(task);
    localStorage.setItem('toDoList', JSON.stringify(toDoList.data));
    description.value = '';
  }
});

window.onload = () => {
  toDoList.data = JSON.parse(localStorage.getItem('toDoList' || '[]'));
  if (toDoList.data === null) {
    toDoList.data = [];
    populate(fakeList);
    return;
  }
  toDoList.displayList();
};
