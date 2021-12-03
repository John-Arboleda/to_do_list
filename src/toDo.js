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
    if (taskObj.completed) {
      task.innerHTML = `<label><input type="checkbox" checked id="cbox${taskObj.index}
      ">${taskObj.description}</label>`;
    } else {
      task.innerHTML = `<label><input type="checkbox" id="cbox${taskObj.index}
      ">${taskObj.description}</label>`;
    }
    task.classList.add('task-item');
    taskList.appendChild(task);
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
}

export default ToDoList;