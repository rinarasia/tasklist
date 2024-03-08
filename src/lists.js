export class List {
    constructor(title) {
      this.title = title;
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push(task);
      this.tasks.forEach((task, index) => { task["taskIndex"] = index });
    }
    
    deleteTask(task) {
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
      //console.log(this.tasks);
    }
  }