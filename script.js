const main = document.getElementById("main");
const tabs = document.getElementById("tabs");
const allTasksTab = document.getElementById("allTasksTab");
const sidebarLabels = document.getElementById("sidebarLabels");
const sidebarLists = document.getElementById("sidebarLists");

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

  createTaskContainer(task, list, listcontainer) {
    const taskContainer = createDOMElement("div", "taskContainer");

    const labels = createDOMElement("ul", "labels");

    this.addLabels(labels, task);

    const taskDiv = createDOMElement("div", "task");

    this.addPriority(task, taskDiv);

    const left = createDOMElement("div", "left");

    const titleRow = createDOMElement("div", "titleRow");

    const checkbox = createDOMElement("input", "checkbox");
    checkbox.setAttribute("type", "checkbox");
    
    checkbox.addEventListener("click", () => {
      labels.classList.toggle("complete");
      taskDiv.classList.toggle("complete");
      
      const listContainer = taskContainer.closest(".listContainer");
      const listIncompleteContainer = listContainer.querySelector(".list.active");
      const listCompleteSection = listContainer.querySelector(".list.inactive");
      const listCompleteContainer = listContainer.querySelector(".tasksInactiveContainer");
      if (checkbox.checked === true) {
        // mark task complete and move to complete array in list
        list.markTaskComplete(task);
        listCompleteContainer.appendChild(taskContainer);

        if(list.tasksComplete.length > 0) {
          listCompleteSection.classList.remove("hidden");
        }
      } else if (checkbox.checked === false) {
        // mark task incomplete and move to incomplete array in list
        list.markTaskIncomplete(task);
        const listIncompleteContainer = listContainer.querySelector(".list.active");
        listIncompleteContainer.appendChild(taskContainer);
        
        if(list.tasksComplete.length == 0) {
          listCompleteSection.classList.add("hidden");
        }
      }
      
    });

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
    
    /* MODAL */
    const modal = createDOMElement("div", "modal");
    
    
    editIcon.addEventListener("click", () =>{
      modal.classList.toggle("show-modal");
    });

    taskContainer.appendChild(labels);
    taskContainer.appendChild(taskDiv);
    taskContainer.appendChild(preview);
    taskContainer.appendChild(modal);
    this.modal(task, list, modal);
    listcontainer.appendChild(taskContainer);
    
    if(listcontainer.classList.contains("tasksInactiveContainer")){
      labels.classList.toggle("complete");
      taskDiv.classList.toggle("complete");
      checkbox.checked = true;
    }
    
    deleteIcon.addEventListener("click", () => {
      const listContainer = taskContainer.closest(".listContainer");
      const listIncompleteContainer = listContainer.querySelector(".list.active");
      const listCompleteSection = listContainer.querySelector(".list.inactive");
      const listCompleteContainer = listContainer.querySelector(".tasksInactiveContainer");
      
      const taskIndex = list.tasksIncomplete.indexOf(task);
      if (listIncompleteContainer.contains(taskContainer)) {
        list.tasksIncomplete.splice(taskIndex, 1);

        listIncompleteContainer.removeChild(taskContainer);
        console.log(this);
      } else if (listCompleteContainer.contains(taskContainer)) {
        list.tasksComplete.splice(taskIndex, 1);

        listCompleteContainer.removeChild(taskContainer);
      }

      if (list.tasksIncomplete.length === 0 && list.tasksComplete.length === 0) {
        alert("Are you sure?");
        list.deleteList(list, listContainer);
        //list.deleteAllTasks(listContainer, tasksInactiveContainer);
      }
    });
    
  }
  
  addLabels(labels, task) {
    task.labels.forEach((lbl) => {
      const li = createDOMElement("li", "label");
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
  
  modal(task, list, modal) {
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
      const index = list.tasksIncomplete.indexOf(task);
      task.title = modalTitle.textContent;
      task.notes = modalNotes.textContent;
      
      list.updateTask(task);
      
    });

    const lowerBar = createDOMElement("div", "lowerBar");

    const modalPriority = createDOMElement("div", "priority", task.priority);
    this.addPriority(task, modalPriority);

    const modalLabels = createDOMElement("ul");
    task.labels.forEach((lbl) => {
      const li = document.createElement("li");
      li.textContent = lbl;
      //      lbl = lbl.toLowerCase();
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
        modal.classList.toggle("show-modal");
      }
    }

    // check if task details have changed
    closeBtn.addEventListener("click", () => {
      // close modal
      modal.classList.toggle("show-modal");

      // if text has not been saved, revert to default value
      if (modalTitle.textContent != titleDefValue) {
        modalTitle.textContent = titleDefValue;
      }

      if (modalNotes.textContent != notesDefValue) {
        modalTitle.textContent = titleDefValue;
      }
    });

    window.addEventListener("click", windowOnClick);
  }
  
  toggleModal() {
    //console.log("this");
      modal.classList.toggle("show-modal");
    }
}

/*----------------------- LIBRARY CLASS --------------------*/
class Library {
  constructor() {
    this.lists = [];
    this.labels = [lbl1, lbl2, lbl3, lbl4, lbl5];
  }
  
  addList(list) {
    this.lists.push(list);

    this.addListTab(list);
  }
  
  printAllLists() {
    this.printLabels();
    this.lists.forEach((list) => {
      list.printSingleList(list);
    });
  }

  printLabels() {
    library.labels.forEach((label) => {
      const sidebarLbl = createDOMElement("li", "sidebarLbl", label);
      sidebarLabels.appendChild(sidebarLbl);

      sidebarLbl.addEventListener("click", () => {
        main.textContent = "";
        this.lists.forEach((list) => {
          //list.classList.remove("active");
          const index = this.lists.indexOf(list);
          const selectedList = library.lists[index];
          list.printSingleList(selectedList, sidebarLbl);
        });
        this.clearLabels();
        this.clearTabs(); 
        sidebarLbl.classList.add("active");
      });
    });
  }

  addListTab(list) {
    const tabLi = createDOMElement("li", "tab", list.title);
    tabs.appendChild(tabLi);

    allTasksTab.addEventListener("click", () => {
      main.textContent = "";
      this.clearLabels();
      this.clearTabs();
      allTasksTab.classList.add("active");
      library.lists.forEach((list) => {
        list.printSingleList(list);
      });
    });

    tabLi.addEventListener("click", (e) => {
      main.textContent = "";
      const index = this.lists.indexOf(list);
      const selectedList = library.lists[index];
      list.printSingleList(selectedList);
      
      this.clearLabels();
      this.clearTabs();     
      tabLi.classList.add("active");
    });
  }

  clearTabs() {
    const getAllTabs = document.querySelectorAll(".tab");
      getAllTabs.forEach((tab) =>{
        tab.classList.remove("active");
      });
  }
  
  clearLabels() {
    const getAllLabels = document.querySelectorAll(".sidebarLbl");
        getAllLabels.forEach((label) => {
          label.classList.remove("active");
        });
  }
  
}

/*----------------------- LIST CLASS -----------------------*/

class List {
  constructor(title) {
    this.title = title;
    this.tasksIncomplete = [];
    this.tasksComplete = [];
  }

  addTask(task) {
    this.tasksIncomplete.push(task);
  }

  markTaskComplete(task) {
    this.tasksComplete.push(task);
    const index = this.tasksIncomplete.indexOf(task);
    this.tasksIncomplete.splice(index, 1);
  }
  
  markTaskIncomplete(task) {
    this.tasksIncomplete.push(task);
    const index = this.tasksComplete.indexOf(task);
    this.tasksComplete.splice(index, 1);
  }
  
  updateTask(task) {
    let newTitle = task.title;
console.log(newTitle);
      //let newNotes = list.tasksIncomplete[index].notes;
      //newNotes = task.notes;

      //title.textContent = newTitle;
      //notes.textContent = newNotes;
      //titleDefValue = newTitle;
  }
  
  printSingleList(list, label) {
    const listContainer = createDOMElement("div", "listContainer");

    const listIncompleteContainer = createDOMElement("div", "list");
    listIncompleteContainer.classList.add("active");
   
    const listIncompleteHeader = createDOMElement("h3", "list-header");
    const listIncompleteTitle = createDOMElement("div", "title", list.title);
    const listDeleteBtn = createDOMElement("i", "delete");
    listDeleteBtn.classList.add("bi");
    listDeleteBtn.classList.add("bi-x-circle");
    listDeleteBtn.addEventListener("click", () => {
      this.deleteList(list, listContainer);
    });
    
    listIncompleteHeader.appendChild(listIncompleteTitle);
    listIncompleteHeader.appendChild(listDeleteBtn);
    listIncompleteContainer.appendChild(listIncompleteHeader);
    
    const listCompleteSection = createDOMElement("div", "list");
    listCompleteSection.classList.add("inactive");
    listCompleteSection.classList.add("hidden");
    
    const index = library.lists.indexOf(list);
    const input = createDOMElement("input");
    input.classList.add("inputCheckbox");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", index);
    input.checked = false;
    
    const listCompleteTitle = createDOMElement("label","list-header","Tasks Completed:");
    listCompleteTitle.htmlFor = index;

    listCompleteSection.appendChild(input);
    listCompleteSection.appendChild(listCompleteTitle);
    
    const listCompleteContainer = createDOMElement("div", "tasksInactiveContainer");
    
    let labelMatch = false;
    
    list.tasksIncomplete.forEach((task) => {
      if (!label || task.labels.includes(label.innerHTML)){
        task.createTaskContainer(task, list, listIncompleteContainer);
        if (label) labelMatch = true;
      } 
    })
    
    list.tasksComplete.forEach((task) => {
      task.createTaskContainer(task, list, listCompleteContainer);
    })
    
    if(list.tasksComplete.length > 0) {
      listCompleteSection.classList.remove("hidden");
    }
    
    // If label is provided and no tasks match the label, hide the list container
    if (label && !labelMatch) {
      listContainer.classList.add("hidden");
    }

    listCompleteSection.appendChild(listCompleteContainer);
    listContainer.appendChild(listIncompleteContainer);
    listContainer.appendChild(listCompleteSection);
    main.appendChild(listContainer);
  }
  
  deleteList(list, listContainer){
      const index = library.lists.indexOf(list);
      library.lists.splice(index, 1);

      // remove list tab
      const tabLi = document.querySelectorAll(".tab");
      const array = Array.from(tabLi);
      array.shift(); // account for All Tasks tab
      array[index].remove();
      
      // remove list from main
      main.removeChild(listContainer);
  }
  
}

/*----------------------- END LIST CLASS ------------------*/

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

const library = new Library();

library.addList(firstList);

const newTask = new Task("new task!", "hehe some notes here", "Dec 1", "low", [
  "School"
]);

firstList.addTask(newTask);


const secondList = new List("List Number Two");

const task3 = new Task(
  "Second List's first task",
  "hehe some notes here",
  "Dec 1",
  "low",
  ["School", "Personal"]
);

const task4 = new Task(
  "Second List's second task",
  "hehe some notes here",
  "Dec 1",
  "low",
  ["School", "Home"]
);
secondList.addTask(task3);
secondList.addTask(task4);

library.addList(secondList);

const thirdList = new List("Personal Tasks");

const task5 = new Task(
  "This is really cool",
  "hehe some notes here",
  "Dec 1",
  "low",
  ["Work", "Other"]
);

thirdList.addTask(task5);
library.addList(thirdList);
library.printAllLists();

function searchTasks() {
  let input, filter, main, tasks, a, i, txtValue, taskContainer, listContainer;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  main = document.getElementById("main");
  tasks = main.getElementsByClassName("task");

  for (i = 0; i < tasks.length; i++) {
    a = tasks[i].getElementsByClassName("title")[0];
    txtValue = a.textContent || a.innerText;
    taskContainer = tasks[i].closest(".taskContainer");

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      taskContainer.style.display = "";
    } else {
      taskContainer.style.display = "none";
    }
  }
}

const time = document.getElementById("time");
const dateInfo = document.getElementById("date");
const date = new Date();
let day = date.getDate();
let month = date.toLocaleString('default', { month: 'long' });
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${month} ${day}, ${year}`;

displayClock();
function displayClock(){
  var display = new Date().toLocaleTimeString('default', {hour: '2-digit', minute:'2-digit'});
  time.innerHTML = display;
  dateInfo.innerHTML = currentDate;
  setTimeout(displayClock, 1000); 
}

//dateInfo.textContent = currentDate;
//console.log(dateInfo.textContent); // "17-6-2022"