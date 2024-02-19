const main = document.getElementById("main");
const tabs = document.getElementById("tabs");
const listAll = document.getElementById("listAll");
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
    this.complete = "false";
  }

  createTaskContainer(list, task) {
    const taskContainer = createDOMElement("div", "taskContainer");

    const labels = createDOMElement("ul", "labels");

    this.addLabels(labels, task);

    const taskDiv = createDOMElement("div", "task");

    this.addPriority(task, taskDiv);

    const left = createDOMElement("div", "left");

    const titleRow = createDOMElement("div", "titleRow");

    const checkbox = createDOMElement("input", "checkbox");
    checkbox.setAttribute("type", "checkbox");

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
    
    list.test(checkbox, taskDiv);
  }

  createTask(list, task, tasksInactiveContainer, listActiveContainer) {
    const taskContainer = createDOMElement("div", "taskContainer");

    const labels = createDOMElement("ul", "labels");

    this.addLabels(labels, task);

    const taskDiv = createDOMElement("div", "task");

    this.addPriority(task, taskDiv);

    const left = createDOMElement("div", "left");

    const titleRow = createDOMElement("div", "titleRow");

    const checkbox = createDOMElement("input", "checkbox");
    checkbox.setAttribute("type", "checkbox");

    this.addCheckbox(
      list,
      task,
      checkbox,
      labels,
      taskDiv,
      taskContainer,
      listActiveContainer,
      tasksInactiveContainer
    );

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

    //editIcon.addEventListener("click", toggleModal);

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
    /*
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
        toggleModal();
      }
    }

    // check if task details have changed
    closeBtn.addEventListener("click", () => {
      // close modal
      toggleModal();

      // if text has not been saved, revert to default value
      if (modalTitle.textContent != titleDefValue) {
        modalTitle.textContent = titleDefValue;
      }

      if (modalNotes.textContent != notesDefValue) {
        modalTitle.textContent = titleDefValue;
      }
    });

    window.addEventListener("click", windowOnClick);
*/
    /********************** MODAL *****************************/

    taskContainer.appendChild(labels);
    taskContainer.appendChild(taskDiv);
    taskContainer.appendChild(preview);
    //taskContainer.appendChild(modal);

    listActiveContainer.appendChild(taskContainer);

    deleteIcon.addEventListener("click", () => {
      const index = list.tasks.indexOf(task);
      if (listActiveContainer.contains(taskContainer)) {
        list.tasks.splice(index, 1);

        listActiveContainer.removeChild(taskContainer);
        console.log(this);
      } else if (tasksInactiveContainer.contains(taskContainer)) {
        list.completed.splice(index, 1);

        tasksInactiveContainer.removeChild(taskContainer);
      }
      //this.hideListInactive(list, tasksInactiveContainer);

      if (list.tasks.length === 0 && list.completed.length === 0) {
        alert("Are you sure?");
        main.removeChild(listActiveContainer);
        //list.deleteAllTasks(listContainer, tasksInactiveContainer);
      }
    });
  }

  hideListInactive(list, tasksInactiveContainer) {
    const listInactiveContainer = tasksInactiveContainer.closest(".list");
    if (list.completed.length === 0) {
      listInactiveContainer.classList.add("hidden");
    }
  }

  addCheckbox(
    list,
    task,
    checkbox,
    labels,
    taskDiv,
    taskContainer,
    listContainer,
    tasksInactiveContainer
  ) {
    checkbox.addEventListener("click", () => {
      labels.classList.toggle("complete");
      taskDiv.classList.toggle("complete");

      const listInactiveContainer = tasksInactiveContainer.closest(".list");
      const index = list.tasks.indexOf(task);
      if (checkbox.checked === true) {
        // remove task from tasks array
        list.tasks.splice(index, 1);

        // add task to completed
        list.completed.push(task);

        // move task container to tasks completed
        tasksInactiveContainer.appendChild(taskContainer);
        if (list.completed.length > 0) {
          listInactiveContainer.classList.remove("hidden");
        }
      } else if (checkbox.checked === false) {
        // add task to tasks array
        list.tasks.push(task);

        // remove task from completed
        list.completed.splice(index, 1);

        // add task to active list container
        listContainer.appendChild(taskContainer);
        console.log(list.completed);
        this.hideListInactive(list, tasksInactiveContainer);
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
}

/*----------------------- LIBRARY CLASS --------------------*/
class Library {
  constructor() {
    this.lists = [];
    this.labels = ["School", "Work", "Home", "Personal", "Other"];
  }

  printLabels() {
    library.labels.forEach((label) => {
      const sidebarLbl = createDOMElement("li", "label", label);
      sidebarLabels.appendChild(sidebarLbl);

      sidebarLbl.addEventListener("click", () => {
        main.textContent = "";
        this.lists.forEach((list) => {
          const index = this.lists.indexOf(list);
          const selectedList = library.lists[index];
          this.printLabelList(selectedList, sidebarLbl);
        });
      });
    });
  }

  addList(list) {
    this.lists.push(list);

    this.addListTab(list);
  }

  addListTab(list) {
    const tabLi = createDOMElement("li", "tab", list.title);
    tabs.appendChild(tabLi);

    listAll.addEventListener("click", () => {
      this.clearLibrary();
      library.lists.forEach((list) => {
        this.printSingleList(list);
      });
    });

    tabLi.addEventListener("click", () => {
      const index = this.lists.indexOf(list);
      const selectedList = library.lists[index];

      this.clearLibrary();
      this.printSingleList(selectedList);
    });
  }

  printListHeaders(
    list,
    listContainer,
    listActiveContainer,
    listInactiveContainer
  ) {
    const listActiveHeader = createDOMElement("h3", "list-header");
    const listActiveTitle = createDOMElement("div", "title", list.title);
    const listDeleteBtn = createDOMElement("i", "delete");
    listDeleteBtn.classList.add("bi");
    listDeleteBtn.classList.add("bi-x-circle");

    this.listDeleteBtn(
      list,
      listDeleteBtn,
      listContainer,
      listActiveContainer,
      listInactiveContainer
    );
    listActiveHeader.appendChild(listActiveTitle);
    listActiveHeader.appendChild(listDeleteBtn);

    listActiveContainer.appendChild(listActiveHeader);
  }

  createList(list, listContainer, listActiveContainer, listInactiveContainer) {
    library.printListHeaders(
      list,
      listContainer,
      listActiveContainer,
      listInactiveContainer
    );
    const index = this.lists.indexOf(list);
    const input = createDOMElement("input");
    input.classList.add("inputCheckbox");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", index);
    input.checked = false;

    const listInactiveTitle = createDOMElement(
      "label",
      "list-header",
      "Tasks Completed:"
    );
    listInactiveTitle.htmlFor = index;

    listInactiveContainer.appendChild(input);
    listInactiveContainer.appendChild(listInactiveTitle);
  }

  clearLibrary() {
    while (listAll.nextElementSibling) {
      listAll.nextElementSibling.remove();
    }
    library.lists.forEach((list) => {
      this.addListTab(list);
    });

    main.textContent = "";
  }

  printAllLists() {
    this.printLabels();
    this.lists.forEach((list) => {
      const index = this.lists.indexOf(list);
      const selectedList = library.lists[index];
      this.printSingleList(selectedList);
    });
  }

  printLabelList(list, sidebarLbl) {
    const listContainer = createDOMElement("div", "listContainer");

    const listActiveContainer = createDOMElement("div", "list");
    listActiveContainer.classList.add("active");

    const listInactiveContainer = createDOMElement("div", "list");
    listInactiveContainer.classList.add("inactive");
    listInactiveContainer.classList.add("hidden");

    const tasksInactiveContainer = createDOMElement(
      "div",
      "tasksInactiveContainer"
    );

    this.createList(
      list,
      listContainer,
      listActiveContainer,
      listInactiveContainer
    );

    list.filterbyLabel(
      sidebarLbl,
      tasksInactiveContainer,
      listActiveContainer,
      listInactiveContainer
    );

    listContainer.appendChild(listActiveContainer);
    listInactiveContainer.appendChild(tasksInactiveContainer);
    listContainer.appendChild(listInactiveContainer);
    main.appendChild(listContainer);
  }

  printSingleList(list) {
    const listContainer = createDOMElement("div", "listContainer");

    const listActiveContainer = createDOMElement("div", "list");
    listActiveContainer.classList.add("active");

    const listInactiveContainer = createDOMElement("div", "list");
    listInactiveContainer.classList.add("inactive");
    //listInactiveContainer.classList.add("hidden");

    const tasksInactiveContainer = createDOMElement(
      "div",
      "tasksInactiveContainer"
    );

    this.createList(
      list,
      listContainer,
      listActiveContainer,
      listInactiveContainer
    );

    list.printTasks(
      tasksInactiveContainer,
      listActiveContainer,
      listInactiveContainer
    );

    list.printCompletedTasks(tasksInactiveContainer, listInactiveContainer);

    listContainer.appendChild(listActiveContainer);
    listInactiveContainer.appendChild(tasksInactiveContainer);
    listContainer.appendChild(listInactiveContainer);
    main.appendChild(listContainer);
  }

  listDeleteBtn(
    list,
    listDeleteBtn,
    listContainer,
    listActiveContainer,
    listInactiveContainer
  ) {
    listDeleteBtn.addEventListener("click", (e) => {
      const index = this.lists.indexOf(list);

      this.lists.splice(index, 1);

      const tabLi = document.querySelectorAll(".tab");
      const array = Array.from(tabLi);

      const tabIndex = array[index];
      array[index].remove();

      list.deleteAllTasks(
        listContainer,
        listActiveContainer,
        listInactiveContainer
      );
    });
  }
}

/*----------------------- LIST CLASS -----------------------*/

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

  filterbyLabel(
    sidebarLbl,
    tasksInactiveContainer,
    listActiveContainer,
    listInactiveContainer
  ) {
    this.tasks.forEach((task) => {
      if (task.labels.includes(sidebarLbl.innerHTML)) {
        task.createTask(
          this,
          task,
          tasksInactiveContainer,
          listActiveContainer,
          listInactiveContainer
        );
      }
    });
  }

  revertTask(task) {
    const index = this.completed.indexOf(task);
    this.completed.splice(index, 1);
  }

  printTasks(
    tasksInactiveContainer,
    listActiveContainer,
    listInactiveContainer
  ) {
    this.tasks.forEach((task) => {
      console.log(task.complete);
      task.createTask(this, task, tasksInactiveContainer, listActiveContainer);
//task.createTaskContainer(this, task);
    });
    if (this.completed.length > 0) {
      listInactiveContainer.classList.remove("hidden");
    }
  }

  printCompletedTasks(tasksInactiveContainer, listInactiveContainer) {
    this.completed.forEach((task) => {
      task.createTask(
        this,
        task,
        tasksInactiveContainer,
        listInactiveContainer
      );
      const test = listInactiveContainer.closest("taskContainer");
      console.log(tasksInactiveContainer);
    });
  }

  showcompleted(taskCompletedContainer) {
    this.completed.forEach((task) => {
      this.displayTask(taskCompletedContainer, task);
      console.log(this.completed);
    });
  }

  deleteAllTasks(listContainer, listActiveContainer, listInactiveContainer) {
    while (listActiveContainer.firstChild) {
      listActiveContainer.firstChild.remove();
      this.tasks.pop();
    }

    while (listInactiveContainer.firstChild) {
      listInactiveContainer.firstChild.remove();
      this.completed.pop();
    }
    main.removeChild(listContainer);
    //main.removeChild(listActiveContainer);
    //main.removeChild(listInactiveContainer);
  }

  deleteActiveTasks(listActiveContainer) {
    while (listActiveContainer.firstChild) {
      listActiveContainer.firstChild.remove();
      this.tasks.pop();
    }
    main.removeChild(listActiveContainer);
  }

  deleteInactiveTasks(listInactiveContainer) {
    while (listInactiveContainer.firstChild) {
      listInactiveContainer.firstChild.remove();
      this.completed.pop();
    }
    main.removeChild(listInactiveContainer);
  }

  firstBooks() {
    firstList.addTask(
      new Task(
        "Second task that is really long so I can see the characer limit hello pls help me with this project so I can pass",
        "I don't know these are some details about this task. I don't know these are some details about this task. I don't know these are some details about this task.",
        "Dec 3",
        "low",
        ["School", "Work", "Personal", "Home", "Other"]
      )
    );
    firstList.addTask(
      new Task("This is a great task!", "I don't know", "Dec 3", "low", [
        "School",
        "Other"
      ])
    );
  }
  
  test(checkbox, taskDiv) {
    if(checkbox.checked) {
      console.log("true");
    } else {
      console.log("False");
    }
  }
  
  
}

/*----------------------- END LIST CLASS ------------------*/

const task1 = new Task(
  "So cool holiday party",
  "Dressy but work appropriate",
  "12/3",
  "high",
  ["Work"], 
  true
);

const task2 = new Task("This is at index 2", "I don't know", "Dec 3", "low", [
  "School",
  "Work",
  "Other"
], false);

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
/*firstList.displayTask(newTask);*/

/*firstList.printTasks();*/

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
/*secondList.printTasks();*/

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
/*
listAll.addEventListener("click", () => {
  main.textContent = "";
  library.printListHeaders();
  library.printAllLists();
});






      const filterValue = "Work";
      const filteredBooks = selectedList.tasks.filter((val) =>
        val.labels.includes(filterValue)
      );
      console.log(filteredBooks);
*/
