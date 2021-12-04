function removeItem (taskObj, oldList) {
  //const newList = new ToDoList();
  const updatedList = [];
  let count = 1;
  oldList.filter((task) => {
    if (task.index != taskObj.index){ 
      //const newTask = newList.createTask(description.value);
      task.index = count;
      updatedList.push(task);
      count += 1;
    }
  });
  return updatedList;
}

export default removeItem;