import _ from 'lodash';
import './reset.css';
import './style.css';

class ToDoList {
  constructor() {
    this.data = [];
  }

  create_task (description) {
    const task = {};
    task.description = description;
    task.completed = false;
    if (this.data.length > 0) {
      const lastItem = this.data[this.data.length - 1];
      const lastIndex = lastItem.index;
      task.index = lastIndex + 1;
    } else {
      task.index = 1;
    }
    return task;
  }

  add_task(task) {
    this.data.push(task);
    localStorage.setItem('toDoList', JSON.stringify(this.data));
    this.display_task(task);
  }

  display_task(taskObj) {
    const taskList = document.getElementById('main-list');
    const task = document.createElement('LI');
    if (taskObj.completed) {
      task.innerHTML = 
      `<label><input type="checkbox" checked id="cbox${taskObj.index}
      ">${taskObj.description}</label>`;
    } else {
      task.innerHTML = 
      `<label><input type="checkbox" id="cbox${taskObj.index}
      ">${taskObj.description}</label>`;
    }
    task.classList.add('task-item');
    taskList.appendChild(task);
  }

  display_list() {
    this.data.forEach((task) => {
      this.display_task(task);
    });
  }
}

const toDoList = new ToDoList();

const fake_list = [
  {
    description: "Wash dishes",
    completed: false,
    index: 1
  },
  {
    description: "Buy Groceries",
    completed: false,
    index: 2
  },
  {
    description: "Walk the dog",
    completed: false,
    index: 3
  },
]

function populate (a_list) {
  a_list.forEach(task => {
    const new_task = toDoList.create_task(task.description);
    toDoList.add_task(new_task);
  })
}


document.querySelector('#add-item').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const description = document.getElementById('add-item');
    const task = toDoList.create_task(description.value);
    toDoList.add_task(task);
    localStorage.setItem('toDoList', JSON.stringify(toDoList.data));
    description.value = '';
  };
});

window.onload = () => {
  toDoList.data = JSON.parse(localStorage.getItem('toDoList' || '[]'));
  if (toDoList.data === null) {
    toDoList.data = [];
    populate (fake_list);
    return;
  }
  toDoList.display_list();
};
