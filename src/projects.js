export class Project {
    constructor() {
      this.lists = [];
    }
  
    addList(list) {
      this.lists.push(list);
      addListTab(list);
      //Assign each task their parent project's index & task index
      this.lists.forEach((list, index) => list.tasks.forEach(task => { task["listIndex"] = index }));
    }
  }