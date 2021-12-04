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
  return updatedList;
}

export default removeItem;