class ToDoList {
  constructor() {
    this.data = [];
  }

  create_task(description) {
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
  display_task(taskObj) {
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

  add_task(task) {
    this.data.push(task);
    localStorage.setItem('toDoList', JSON.stringify(this.data));
    this.display_task(task);
  }

  display_list() {
    this.data.forEach((task) => {
      this.display_task(task);
    });
  }
}

export default ToDoList;