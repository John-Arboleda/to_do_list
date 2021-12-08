import handlers from './handlers.js';

class ToDoList {
  constructor() {
    this.data = [];
  }

  createTask(description) {
    const task = {};
    task.description = description;
    task.completed = false;
    if (this.data.length > 0) {
      task.index = this.data.length + 1;
    } else {
      task.index = 1;
    }
    return task;
  }

  displayTask(taskObj) {
    handlers.newTask(taskObj);
    const checkbox = document.querySelector(`#cont${taskObj.index} .checkbox`);
    const self = this;
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        taskObj.completed = true;
      } else {
        taskObj.completed = false;
      }
      self.updateList(taskObj);
    });
    const deleteBtn = document.querySelector(`#cont${taskObj.index} div button`);
    deleteBtn.addEventListener('click', () => {
      self.data = handlers.removeItem(taskObj, self.data);
      self.displayList();
    });
    const inputDescription = document.querySelector(`#cont${taskObj.index} .input-description`);
    inputDescription.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        taskObj.description = inputDescription.value;
        self.updateList(taskObj);
        handlers.taskList.innerHTML = '';
        self.displayList();
      }
    });
  }

  addTask(task) {
    this.data.push(task);
    handlers.saveLocalSorage(this.data);
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
    handlers.saveLocalSorage(this.data);
  }
}

export default ToDoList;