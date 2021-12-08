export default (() => {

  const taskList = document.getElementById('main-list');

  function newTask(taskObj) {
    const task = document.createElement('LI');
    const taskId = `cont${taskObj.index}`;
    task.innerHTML = `<div><input type="checkbox" class="checkbox" ${taskObj.completed ? 'checked' : ''}>
      <input type="input" value="${taskObj.description}" class="input-description"></div>
      <div><button class="delete-btn">&#128465</button></div>`;
    task.classList.add('task-item');
    task.setAttribute('id', taskId);
    taskList.appendChild(task);
  }

  function saveLocalSorage(data) {
    localStorage.setItem('toDoList', JSON.stringify(data));
  }

  function removeItem(taskObj, oldList) {
    const updatedList = [];
    let count = 1;
    oldList.forEach((task) => {
      if (task.index !== taskObj.index) {
        task.index = count;
        updatedList.push(task);
        count += 1;
      }
    });
    saveLocalSorage(updatedList);
    taskList.innerHTML = '';
    return updatedList;
  }

  return {
    taskList,
    newTask,
    saveLocalSorage,
    removeItem,
  };
})();
