import removeItem from './handlers.js';

class ToDoList {
  constructor() {
    this.data = [];
  }

  createTask(description) {
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

  /* eslint-disable-next-line class-methods-use-this */
  displayTask(taskObj) {
    const taskList = document.getElementById('main-list');
    const task = document.createElement('LI');
    const taskId = `cont${taskObj.index}`;
    task.innerHTML = `<div><input type="checkbox" class="checkbox" ${taskObj.completed ? 'checked' : ''}>
      <input type="input" value="${taskObj.description}" class="input-description"></div>
      <div><button class="delete-btn">&#128465</button></div>`;
    task.classList.add('task-item');
    task.setAttribute('id', taskId);
    taskList.appendChild(task);
    const checkbox = document.querySelector(`#${taskId} .checkbox`);
    const self = this;
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        taskObj.completed = true;
      } else {
        taskObj.completed = false;
      }
      self.updateList(taskObj);
    });
    const deleteBtn = document.querySelector(`#${taskId} div button`);
    deleteBtn.addEventListener('click', () => {
      self.data = removeItem(taskObj, self.data);
      localStorage.setItem('toDoList', JSON.stringify(self.data));
      taskList.innerHTML = '';
      self.displayList();
    });
    const inputDescription = document.querySelector(`#${taskId} .input-description`);
    inputDescription.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        taskObj.description = inputDescription.value;
        self.updateList(taskObj);
        localStorage.setItem('toDoList', JSON.stringify(self.data));
        taskList.innerHTML = '';
        self.displayList();
      }
    });
  }

  addTask(task) {
    this.data.push(task);
    localStorage.setItem('toDoList', JSON.stringify(this.data));
    this.displayTask(task);
  }

  displayList() {
    this.data.forEach((task) => {
      this.displayTask(task);
    });
  }

  updateList(taskObj) {
    const taskIndex = this.data.findIndex((task) => task.index === taskObj.index);
    this.data[taskIndex] = taskObj;
    localStorage.setItem('toDoList', JSON.stringify(this.data));
  }
}

export default ToDoList;