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

    taskContainer.appendChild(labels);
    taskContainer.appendChild(taskDiv);
    taskContainer.appendChild(preview);
    
    listcontainer.appendChild(taskContainer);
    
    if(listcontainer.classList.contains("tasksInactiveContainer")){
      labels.classList.toggle("complete");
      taskDiv.classList.toggle("complete");
      checkbox.checked = true;
    }
    
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
  
  printSingleList(list, label) {
    const listContainer = createDOMElement("div", "listContainer");

    const listIncompleteContainer = createDOMElement("div", "list");
    listIncompleteContainer.classList.add("active");
   
    const listIncompleteHeader = createDOMElement("h3", "list-header");
    const listIncompleteTitle = createDOMElement("div", "title", list.title);
    const listDeleteBtn = createDOMElement("i", "delete");
    listDeleteBtn.classList.add("bi");
    listDeleteBtn.classList.add("bi-x-circle");
    this.deleteListFunction(list, listContainer, listDeleteBtn)
    
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
  
  deleteListFunction(list, listContainer, listDeleteBtn) {
    listDeleteBtn.addEventListener("click", (e) => {
      // remove list from library
      const index = library.lists.indexOf(list);
      library.lists.splice(index, 1);

      // remove list tab
      const tabLi = document.querySelectorAll(".tab");
      const array = Array.from(tabLi);
      array.shift(); // account for All Tasks tab
      array[index].remove();
      
      // remove list from main
      main.removeChild(listContainer);
    });
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