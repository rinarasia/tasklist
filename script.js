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

/*const pageTitle = createDOMElement("div", "pageTitle", "Page Title");

main.appendChild(pageTitle);*/
/*
function logForm(form) {
  console.log(form);
}

function newForm(header, className, ...inputs) {
  const newForm = document.createElement('form');
  
  if(className) newForm.classList.add(className);
  
  newForm.method = "post";
  
  const formTitle = createDOMElement('div', '', 'form-title');
  const formHeader = createDOMElement('h4');
  formHeader.textContent = header;
  
  formTitle.appendChild(formHeader);
  newForm.appendChild(formTitle);
  
  for (const value of inputs) {
        const label = createDOMElement('label');
        label.textContent = value;
        label.setAttribute('for', `${value}`);

        const input = createDOMElement('input', `${value}`);
        input.setAttribute('name', `${value}`);
        input.setAttribute('type', 'text');

        newForm.appendChild(label);
        newForm.appendChild(input);
    }
  
  const confirmTaskAdd = createDOMElement('input', 'add-task-button', 'confirm');
  confirmTaskAdd.textContent = 'Add Task';
  confirmTaskAdd.setAttribute('type', 'submit');
  
  newForm.appendChild(confirmTaskAdd);
  
  newForm.addEventListener('submit', function (e) {
    //prevent the normal submission of the form
    e.preventDefault();
    for (const value of inputs) {
      console.log(value);      
    }
    
});
  
  return newForm;
}

const taskForm = newForm('Add Task', 'addTask', 'task-title', 'task-details', 'task-priority');
main.appendChild(taskForm);
*/

/*
textContent.forEach((textCont) => {
  textCont.addEventListener('click', (evt) => {
    const previewRow = evt.firstChild('.previewRow');
    previewRow.classList.toggle('hidden');
  });
});
*/

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
  
  printList(list){
    this.lists.forEach((list) => {
      const listContainer = createDOMElement("div", "listContainer");
      const listHeader = createDOMElement("div", "listHeader");
      const listTitle = createDOMElement("h3", "", list.title);
      const listDelete = createDOMElement("i", "listDelete");
      listDelete.classList.add("bi");
      listDelete.classList.add("bi-x-circle");      
      
      listHeader.appendChild(listTitle);
      listHeader.appendChild(listDelete);

      listContainer.appendChild(listHeader);
      
      list.printTasks(listContainer);
      
      this.deleteList(list, listDelete, listHeader, listContainer);
      
      main.appendChild(listContainer);
      /*console.log(list);*/
    });
    
    if(library.lists.length > 1) {
      main.classList.remove('single-list');
      main.classList.add('multiple-lists');
    } else if (library.lists.length === 1) {
      main.classList.remove('multiple-lists');
      main.classList.add('single-list');
    }
  }
  
  deleteList(list, listDelete, listHeader, listContainer) {
    const index = this.lists.indexOf(list);
    listDelete.addEventListener("click", () => {
      const index = this.lists.indexOf(list);
      const position = this.lists[index];
      /*console.log(position.title);*/
      this.lists.splice(index, 1);
      
      listContainer.removeChild(listHeader);
      this.lists.slice(index, 1);
      
      list.deleteAllTasks(listContainer);
      main.removeChild(listContainer);
      console.log(library.lists);
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

  printTasks(listContainer) {
    this.tasks.forEach((task) => {
      this.displayTask(listContainer, task);
    });
  }

  deleteAllTasks(listContainer) {
    while(listContainer.firstChild) {
      listContainer.firstChild.remove();
      this.tasks.pop();
    }
  }

  firstBooks() {
    firstList.addTask(new Task("Second task that is really long so I can see the characer limit hello pls help me with this project so I can pass","I don't know these are some details about this task. I don't know these are some details about this task. I don't know these are some details about this task.","Dec 3","low",["School", "Work", "Personal", "Home", "Other"]));
    firstList.addTask(new Task("This is a great task!", "I don't know", "Dec 3", "low", ["School","Other"]));
    /*firstList.printTasks();*/
  };

  displayTask(listContainer, task) {
    const index = this.tasks.indexOf(task);
    
    const taskContainer = createDOMElement("div", "taskContainer");

    const topRow = createDOMElement("div", "topRow");

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

    const modalContent = createDOMElement("div", "modal-content");

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

    const modalPriority = createDOMElement("div", "modalPriority", task.priority);
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
    
    deleteIcon.addEventListener("click", () => {
      const index = this.tasks.indexOf(task);
      const position = this.tasks[index];
      /*console.log(position.title);*/
      this.tasks.splice(index, 1);
      
      listContainer.removeChild(taskContainer);
      
      if(this.tasks.length === 0) {
        this.deleteAllTasks(listContainer);
        console.log("yes it does");
      }
     
      
      console.log(this.tasks.length);
      
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
    const index = this.tasks.indexOf(task);
    
    checkbox.addEventListener("click", () => {
      labels.classList.toggle("complete");
      taskDiv.classList.toggle("complete");

      if(checkbox.checked === true) {
        this.completeTask(task);
      } else if(checkbox.checked === false) {
        this.revertTask(task);
      }
      console.log(this.completed);
      console.log(library.lists);
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
  "Work"
);

const task2 = new Task("This is at index 2", "I don't know", "Dec 3", "low", [
  "School",
  "Work",
  "Other"
]);

const firstList = new List("First List");
/*firstList.firstBooks();*/
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

const fourthList = new List("Personal Tasks");

const task6 = new Task("This is really cool", "hehe some notes here", "Dec 1", "low", [
  "Work", "Other"]);

fourthList.addTask(task6);
library.addList(fourthList);
library.printList();


/*console.log(library.lists);*/