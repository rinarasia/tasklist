const logo = document.getElementById('logo');
const leftSidebar = document.getElementById('leftSidebar');
const rightSidebar = document.getElementById('rightSidebar');
/*logo.addEventListener('click', ()=> {
  leftSidebar.classList.toggle('hidden');
  rightSidebar.classList.toggle('hidden');
});*/

const leftSidebarIcon = document.getElementById("leftSidebarIcon");
/*const menuItem = document.querySelectorAll("menuItem");*/

function toggleSidebar() {
  /*leftSidebar.classList.toggle("active");*/
  leftSidebarIcon.classList.toggle("open");
  leftSidebar.classList.toggle('closed');
  /*menuItem.forEach((item) => {
    item.classList.toggle("hidden");
    console.log("Hi");
  });*/
}



const main = document.getElementById("main");

const lbl1 = "School";
const lbl2 = "Work";
const lbl3 = "Home";
const lbl4 = "Personal";
const lbl5 = "Other";

function createDOMElement(elementName, className, elementText, elementValue) {
  const newElement = document.createElement(elementName);
  if (className) newElement.classList.add(className);
  if (elementText) newElement.textContent = elementText;
  if (elementValue) newElement.value = elementValue;

  return newElement;
}


class Task {
  constructor(title, notes, dueDate, priority, labels) {
    this.title = title;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
    this.labels = labels;
  }
}

class Library {
  constructor() {
    this.lists = [];
  }

  addList(list) {
    this.lists.push(list);
  }
  
  createList(list, listContainer, listActiveContainer, listInactiveContainer){
      const listActiveHeader = createDOMElement("h3", "list-header");
      const listActiveTitle = createDOMElement("div", "title", list.title);
      const listDeleteBtn = createDOMElement("i", "delete");
      listDeleteBtn.classList.add("bi");
      listDeleteBtn.classList.add("bi-x-circle");      
      
      this.listDeleteBtn(list, listDeleteBtn, listContainer, listActiveContainer, listInactiveContainer);
      listActiveHeader.appendChild(listActiveTitle);
      listActiveHeader.appendChild(listDeleteBtn);

      listActiveContainer.appendChild(listActiveHeader);
    
      const index = this.lists.indexOf(list);
      const input = createDOMElement("input");
      input.classList.add("inputCheckbox");
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", index);
      input.checked = false;
    
      const listInactiveTitle = createDOMElement("label", "list-header", "Tasks Completed:");
      listInactiveTitle.htmlFor = index;
    
      listInactiveContainer.appendChild(input);
      listInactiveContainer.appendChild(listInactiveTitle);
    
    
       
    //listInactiveContainer.appendChild(listInactiveHeader);
   
  }

  printList(list) {
    this.lists.forEach((list) => {
      const listContainer = createDOMElement("div", "listContainer");
      
      const listActiveContainer = createDOMElement("div", "list");
      listActiveContainer.classList.add("active");
      
      const listInactiveContainer = createDOMElement("div", "list");      
      listInactiveContainer.classList.add("inactive");
      listInactiveContainer.classList.add("hidden");
      
      const tasksInactiveContainer = createDOMElement("div", "tasksInactiveContainer");      
      
      this.createList(list, listContainer, listActiveContainer, listInactiveContainer);
      list.printTasks(tasksInactiveContainer, listActiveContainer, listInactiveContainer);
      
      listContainer.appendChild(listActiveContainer);
      
      listInactiveContainer.appendChild(tasksInactiveContainer);
      listContainer.appendChild(listInactiveContainer);
      main.appendChild(listContainer);
      
    });
  }
  
  listDeleteBtn(list, listDeleteBtn, listContainer, listActiveContainer, listInactiveContainer) {
    listDeleteBtn.addEventListener("click", () => {
      const index = this.lists.indexOf(list);
      
      this.lists.splice(index, 1);
     
      list.deleteAllTasks(listContainer, listActiveContainer, listInactiveContainer);
    });
  }  
  
}

class List {
  constructor(title) {
    this.title = title;
    this.tasks = [];
    this.completed = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }
  
  completeTask(task) {
    this.completed.push(task);
  }
  
  revertTask(task) {
    const index = this.completed.indexOf(task);
    this.completed.splice(index,1);
  }

  printTasks(tasksInactiveContainer, listContainer, taskCompletedContainer) {
    this.tasks.forEach((task) => {
      this.displayTask(task, tasksInactiveContainer, listContainer, taskCompletedContainer);
    });
  }
  
  showcompleted(taskCompletedContainer) {
    this.completed.forEach((task) => {
      this.displayTask(taskCompletedContainer, task);
      console.log(this.completed);
    });
  }

  deleteAllTasks(listContainer, listActiveContainer, listInactiveContainer) {
    while(listActiveContainer.firstChild) {
      listActiveContainer.firstChild.remove();
      this.tasks.pop();
    }
    
    while(listInactiveContainer.firstChild) {
      listInactiveContainer.firstChild.remove();
      this.completed.pop();
    }
    main.removeChild(listContainer);
    //main.removeChild(listActiveContainer);
    //main.removeChild(listInactiveContainer);
    
  }
  
  deleteActiveTasks(listActiveContainer){
    while(listActiveContainer.firstChild) {
      listActiveContainer.firstChild.remove();
      this.tasks.pop();
    }
    main.removeChild(listActiveContainer);
  }
  
  deleteInactiveTasks(listInactiveContainer){
    while(listInactiveContainer.firstChild) {
      listInactiveContainer.firstChild.remove();
      this.completed.pop();
    }
    main.removeChild(listInactiveContainer);
  }

  firstBooks() {
    firstList.addTask(new Task("Second task that is really long so I can see the characer limit hello pls help me with this project so I can pass","I don't know these are some details about this task. I don't know these are some details about this task. I don't know these are some details about this task.","Dec 3","low",["School", "Work", "Personal", "Home", "Other"]));
    firstList.addTask(new Task("This is a great task!", "I don't know", "Dec 3", "low", ["School","Other"]));
    /*firstList.printTasks();*/
  };

  displayTask(task, tasksInactiveContainer, listContainer, taskCompletedContainer) {
    const index = this.tasks.indexOf(task);
    
    const taskContainer = createDOMElement("div", "taskContainer");

    const labels = createDOMElement("ul", "labels");

    this.addLabels(labels, task);

    const taskDiv = createDOMElement("div", "task");

    this.addPriority(task, taskDiv);

    const left = createDOMElement("div", "left");

    const titleRow = createDOMElement("div", "titleRow");
    
    const checkbox = createDOMElement("input", "checkbox");
    checkbox.setAttribute("type", "checkbox");

    this.addCheckbox(task, checkbox, labels, taskDiv);

    titleRow.appendChild(checkbox);
    
    const titleDiv = createDOMElement("div", "titleDiv");

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = task.title;

    titleDiv.appendChild(title);
    titleRow.appendChild(titleDiv);

    left.appendChild(titleRow);

    const right = createDOMElement("div", "right");

    const dueDate = createDOMElement("div", "dueDate", task.dueDate);

    const viewIcon = createDOMElement("i", "bi");
    viewIcon.classList.add("bi-eye");

    const editIcon = createDOMElement("i", "bi");
    editIcon.classList.add("bi-pencil-square");

    editIcon.addEventListener("click", toggleModal);

    const deleteIcon = createDOMElement("i", "bi");
    deleteIcon.classList.add("bi-trash");   

    right.appendChild(dueDate);
    right.appendChild(viewIcon);
    right.appendChild(editIcon);
    right.appendChild(deleteIcon);

    const preview = createDOMElement("div", "preview");
    preview.classList.add("hidden");

    const notes = createDOMElement("div", "notes", task.notes);
    notes.classList.add("hidden");

    preview.appendChild(notes);

    taskDiv.appendChild(left);
    taskDiv.appendChild(right);

    titleDiv.addEventListener("click", () => {
      viewIcon.classList.toggle("bi-eye");
      viewIcon.classList.toggle("bi-eye-fill");
      preview.classList.toggle("hidden");
      notes.classList.toggle("hidden");
    });
    
    viewIcon.addEventListener("click", () => {
      viewIcon.classList.toggle("bi-eye");
      viewIcon.classList.toggle("bi-eye-fill");
      preview.classList.toggle("hidden");
      notes.classList.toggle("hidden");
    });

    /********************** MODAL *****************************/   
    const modal = createDOMElement("div", "modal");

    function toggleModal() {
      modal.classList.toggle("show-modal");
    }

    const modalContent = createDOMElement("div", "content");

    const closeBtn = createDOMElement("i", "closeBtn");
    closeBtn.classList.add("bi");
    closeBtn.classList.add("bi-x-circle");

    const modalTitleLbl = createDOMElement("label", "", "Task:");
    modalTitleLbl.setAttribute("for", "title");

    const modalTitle = createDOMElement("span", "title");
    modalTitle.setAttribute("contenteditable", "true");
    modalTitle.textContent = task.title;
    
    let titleDefValue = task.title;

    const modalNotesLbl = createDOMElement("label", "", "Notes:");
    modalNotesLbl.setAttribute("for", "notes");

    const modalNotes = createDOMElement("span", "notes");
    modalNotes.setAttribute("contenteditable", "true");
    modalNotes.textContent = task.notes;
    
    let notesDefValue = task.notes;

    const saveBtn = createDOMElement("button", "saveBtn", "Save");

    saveBtn.addEventListener("click", () => {
      task.title = modalTitle.textContent;
      task.notes = modalNotes.textContent;

      let newTitle = this.tasks[index].title;
      newTitle = task.title;

      let newNotes = this.tasks[index].notes;
      newNotes = task.notes;

      title.textContent = newTitle;
      notes.textContent = newNotes;
      titleDefValue = newTitle;
    }); 
    
    const lowerBar = createDOMElement("div", "lowerBar");

    const modalPriority = createDOMElement("div", "priority", task.priority);
    this.addPriority(task, modalPriority);

    const modalLabels = createDOMElement("ul");
    task.labels.forEach((lbl) => {
      const li = document.createElement("li");
      li.textContent = lbl;
      /*      lbl = lbl.toLowerCase();*/
      this.colorLabels(li, lbl);
      modalLabels.appendChild(li);
    });

    const modalDueDate = createDOMElement("div", "dueDate", task.dueDate);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitleLbl);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalNotesLbl);
    modalContent.appendChild(modalNotes);

    lowerBar.appendChild(modalPriority);
    lowerBar.appendChild(modalLabels);
    lowerBar.appendChild(modalDueDate);

    modalContent.appendChild(lowerBar);
    modalContent.appendChild(saveBtn);

    modal.appendChild(modalContent);

    function windowOnClick(event) {
      if (event.target === modal) {
        toggleModal();
      }
    }

    // check if task details have changed
    closeBtn.addEventListener("click", () => {
      // close modal
      toggleModal();
      
      // if text has not been saved, revert to default value
      if(modalTitle.textContent != titleDefValue) {
        modalTitle.textContent = titleDefValue;
      };
      
      if(modalNotes.textContent != notesDefValue) {
        modalTitle.textContent = titleDefValue;
      }
    });
    
    window.addEventListener("click", windowOnClick);

    /********************** MODAL *****************************/

    taskContainer.appendChild(labels);
    taskContainer.appendChild(taskDiv);
    taskContainer.appendChild(preview);
    taskContainer.appendChild(modal);
    
    listContainer.appendChild(taskContainer);
    
    checkbox.addEventListener("click", () => {   
      const listInactiveContainer = tasksInactiveContainer.closest(".list");

      if(checkbox.checked === true) {
        // move task container to tasks completed
        tasksInactiveContainer.appendChild(taskContainer);
        
        // remove task from tasks array
        this.tasks.splice(index, 1);        
        if(this.completed.length > 0){
          listInactiveContainer.classList.remove("hidden");
        }
      } else if(checkbox.checked === false) {
        // add task to tasks array
        this.tasks.push(task);
        console.log(this.completed);
        // add task to active list container
        listContainer.appendChild(taskContainer);
        if(this.completed.length === 0){
          listInactiveContainer.classList.add("hidden");
        }
      }
      
      
      
    });
    
    deleteIcon.addEventListener("click", () => {      
      if(listContainer.contains(taskContainer)){
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
        
        listContainer.removeChild(taskContainer);
        console.log(this);
      } else if (tasksInactiveContainer.contains(taskContainer)){
        const index = this.completed.indexOf(task);
        this.completed.splice(index, 1);
        
        tasksInactiveContainer.removeChild(taskContainer);
      }
      
      if(this.tasks.length === 0 && this.completed.length === 0) {
        alert("Are you sure?");
        this.deleteAllTasks(listContainer, tasksInactiveContainer);
      }
    });

  }

  addPriority(task, el) {
    switch (task.priority) {
      case "low":
        el.classList.add("low");
        break;
      case "medium":
        el.classList.add("medium");
        break;
      case "high":
        el.classList.add("high");
        break;
    }
  }

  addCheckbox(task, checkbox, labels, taskDiv) {
    //const index = this.tasks.indexOf(task);
    
    checkbox.addEventListener("click", () => {
      labels.classList.toggle("complete");
      taskDiv.classList.toggle("complete");

      if(checkbox.checked === true) {
        this.completeTask(task);
      } else if(checkbox.checked === false) {
        this.revertTask(task);
      }
      
    });
  }
  
  printTasksCompleted(taskCompletedContainer) {
    this.completed.forEach((task) => {
      this.displayTask(taskCompletedContainer, task);
      console.log(this.completed);
    });
  }


  addLabels(labels, task) {
    task.labels.forEach((lbl) => {
      const li = document.createElement("li");
      li.textContent = lbl;

      this.colorLabels(li, lbl);

      labels.appendChild(li);
    });
  }

  colorLabels(li, lbl) {
    switch (lbl) {
      case lbl1:
        li.classList.add("lbl1");
        break;
      case lbl2:
        li.classList.add("lbl2");
        break;
      case lbl3:
        li.classList.add("lbl3");
        break;
      case lbl4:
        li.classList.add("lbl4");
        break;
      case lbl5:
        li.classList.add("lbl5");
        break;
    }
  }

  
}



const task1 = new Task(
  "So cool holiday party",
  "Dressy but work appropriate",
  "12/3",
  "high",
  ["Work"]
);

const task2 = new Task("This is at index 2", "I don't know", "Dec 3", "low", [
  "School",
  "Work",
  "Other"
]);

const firstList = new List("First List");
/*firstList.firstBooks();*/
firstList.addTask(task1);
firstList.addTask(task2);
/*firstList.displayTask(task2);*/

/*console.log(firstList.tasks);*/
/*
firstList.tasks.forEach((task) => {
  createTask(task);
  console.log(task);
})*/

const library = new Library();

library.addList(firstList);

/*console.log(library.lists);*/

const newTask = new Task("new task!", "hehe some notes here", "Dec 1", "low", [
  "School"
]);

firstList.addTask(newTask);
/*firstList.displayTask(newTask);*/

/*firstList.printTasks();*/

const secondList = new List("List Number Two");

const task3 = new Task("Second List's first task", "hehe some notes here", "Dec 1", "low", [
  "School"
]);

const task4 = new Task("Second List's second task", "hehe some notes here", "Dec 1", "low", [
  "School"
]);
secondList.addTask(task3);
secondList.addTask(task4);
/*secondList.printTasks();*/

library.addList(secondList);

const thirdList = new List("Personal Tasks");

const task5 = new Task("This is really cool", "hehe some notes here", "Dec 1", "low", [
  "Work", "Other"]);

thirdList.addTask(task5);
library.addList(thirdList);
library.printList();

const lists = document.getElementById("pages");
const list1 = document.getElementById("list1");
const list2 = document.getElementById("list2");
const list3 = document.getElementById("list3");

list1.textContent = library.lists[0].title;
list2.textContent = library.lists[1].title;
list3.textContent = library.lists[2].title;
//console.log(library.lists[1].title);
/*console.log(library.lists);*/