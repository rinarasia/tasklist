import { Task } from "./tasks"
import { List } from "./lists"
import { project } from "./projects"


const main = document.getElementById("main");
const tabs = document.getElementById("tabs");
const sortAscBtn = document.getElementById("sortAsc");
const sortDescBtn = document.getElementById("sortDesc");
const sortDateAddedBtn = document.getElementById("sortDateAdded");

function createDOMElement(elementName, className, elementText, elementValue) {
    const newElement = document.createElement(elementName);
    if (className) newElement.classList.add(className);
    if (elementText) newElement.textContent = elementText;
    if (elementValue) newElement.value = elementValue;
  
    return newElement;
  }
  
  function createTaskContainer(task) {
    const taskContainer = createDOMElement("div", "task-container");
  
    const date = new Date(task.date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const displayDate = month + "/" + day;
  
    const labels = createDOMElement("ul", "labels");
  
    //   this.addLabels(labels, task);
  
    const taskDiv = createDOMElement("div", "task");
  
    //   this.addPriority(task, taskDiv);
  
    const left = createDOMElement("div", "left");
  
    const titleRow = createDOMElement("div", "titleRow");
  
    const checkbox = createDOMElement("input", "checkbox");
    checkbox.setAttribute("type", "checkbox");
  
    if (task.complete === false) {
      checkbox.checked = false;
    } else if (task.complete === true) {
      checkbox.checked = true;
      labels.classList.add("complete");
      taskDiv.classList.add("complete");
    }
  
    checkbox.addEventListener("click", () => {
      labels.classList.toggle("complete");
      taskDiv.classList.toggle("complete");
  
      if (checkbox.checked === false) {
        task.complete = false;
        saveTaskToLocalStorage(task);
      } else if (checkbox.checked === true) {
        task.complete = true;
        saveTaskToLocalStorage(task);
      }
      /*
      // increase or decrease count when task is checked
      const listContainer = taskContainer.closest(".list-container");
      
      const listToDo = listContainer.querySelector(".list.todo");
      const countToDoDiv = listToDo.querySelector(".count");
      let countToDo = parseInt(countToDoDiv.innerHTML.replace(/[^0-9\.]/g, ''));
      
      const listComplete = listContainer.querySelector(".list.complete");
      const countCompleteDiv = listComplete.querySelector(".count");
      let countComplete = parseInt(countCompleteDiv.innerHTML.replace(/[^0-9\.]/g, ''));
      */
    });
  
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = task.title;
  
    left.appendChild(checkbox);
    left.appendChild(title);
  
    const right = createDOMElement("div", "right");
  
    const dueDate = createDOMElement("div", "dueDate", displayDate);
  
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
  
    left.addEventListener("click", () => {
      viewIcon.classList.toggle("bi-eye");
      viewIcon.classList.toggle("bi-eye-fill");
      preview.classList.toggle("hidden");
      notes.classList.toggle("hidden");
      taskContainer.appendChild(preview);
    });
  
    viewIcon.addEventListener("click", () => {
      viewIcon.classList.toggle("bi-eye");
      viewIcon.classList.toggle("bi-eye-fill");
      preview.classList.toggle("hidden");
      notes.classList.toggle("hidden");
      taskContainer.appendChild(preview);
    });
  
    /* MODAL */
    editIcon.addEventListener("click", () => {
      const modal = createDOMElement("div", "modal");
      //      this.modal(task, list, modal);
      modal.classList.toggle("show-modal");
      taskContainer.appendChild(modal);
    });
  
    taskContainer.appendChild(labels);
    taskContainer.appendChild(taskDiv);
  
    deleteIcon.addEventListener("click", () => {
      deleteTaskFromList(task);
      saveToLocalStorage();
      const listContainer = taskContainer.closest(".list-container");
      taskContainer.remove();
      countTasks(listContainer);
    });
  
    return { taskContainer };
  }
  
  function createListContainer(list) {
    const listContainer = createDOMElement("div", "list-container");
  
    const index = project.lists.indexOf(list);
    listContainer.id = "list" + index;
    //console.log(listContainer);
    let { listToDo, countToDo, tasksToDo } = createListToDo(list);
    let { listComplete, countComplete, tasksComplete } = createListComplete(list);
  
    // initialize counters
    let numToDo = 0;
    let numComplete = 0;
  
    list.tasks.forEach((task) => {
      let { taskContainer } = createTaskContainer(task);
  
      if (task.complete === false) {
        tasksToDo.appendChild(taskContainer);
        ++numToDo;
        countToDo.innerHTML = "(" + numToDo + ")";
      } else if (task.complete === true) {
        tasksComplete.appendChild(taskContainer);
        ++numComplete;
        countComplete.innerHTML = "(" + numComplete + ")";
        listComplete.classList.remove("hidden");
      }
  
      // when task is checked, move to appropriate list container
      let checkbox = taskContainer.querySelector(".checkbox");
      checkbox.addEventListener("change", () => {
        if (checkbox.checked === false) {
          tasksToDo.appendChild(taskContainer);
        } else if (checkbox.checked === true) {
          tasksComplete.appendChild(taskContainer);
        }
        countTasks(taskContainer);
      });
    });
  
    listToDo.appendChild(tasksToDo);
    listContainer.appendChild(listToDo);
  
    listComplete.appendChild(tasksComplete);
    listContainer.appendChild(listComplete);
  
    main.appendChild(listContainer);
  }
  
  function createListToDo(list) {
    const listToDo = createDOMElement("div", "list");
    listToDo.classList.add("todo");
  
    const listHeader = createDOMElement("div", "list-header");
    const listToDoDetails = createDOMElement("div", "list-details");
    const listTitle = createDOMElement("div", "list-title", list.title);
    listTitle.classList.add("todo");
    const countToDo = createDOMElement("div", "count", "(0)");
  
    listTitle.appendChild(countToDo);
    listToDoDetails.appendChild(listTitle);
    listHeader.appendChild(listToDoDetails);
    listToDo.appendChild(listHeader);
  
    const tasksToDo = createDOMElement("div", "collapsible");
    tasksToDo.classList.add("expand");
  
    listHeader.addEventListener("click", () => {
      listHeader.classList.toggle("open");
      tasksToDo.classList.toggle("expand");
    });
  
    return { listToDo, countToDo, tasksToDo };
  }
  
  function createListComplete(list) {
    const listComplete = createDOMElement("div", "list");
    listComplete.classList.add("complete");
    listComplete.classList.add("hidden");
  
    const listHeader = createDOMElement("div", "list-header");
    const listCompleteDetails = createDOMElement("div", "list-details");
    const listTitle = createDOMElement("div", "list-title", "Tasks Complete");
    listTitle.classList.add("complete");
    const countComplete = createDOMElement("div", "count");
  
    listTitle.appendChild(countComplete);
    listCompleteDetails.appendChild(listTitle);
    listHeader.appendChild(listCompleteDetails);
    listComplete.appendChild(listHeader);
  
    const tasksComplete = createDOMElement("div", "collapsible");
  
    listHeader.addEventListener("click", () => {
      listHeader.classList.toggle("open");
      tasksComplete.classList.toggle("expand");
    });
  
    return { listComplete, countComplete, tasksComplete };
  }
  
  function countTasks(container) {
    const listContainer = container.closest(".list-container");
    const listToDo = listContainer.querySelector(".list.todo");
    const countToDo = listToDo.querySelectorAll(".task-container").length;
    const listToDoTitle = listToDo.querySelector(".list-title.todo");
  
    const listComplete = listContainer.querySelector(".list.complete");
    const countComplete = listComplete.querySelectorAll(".task-container").length;
    const listCompleteTitle = listComplete.querySelector(".list-title.complete");
  
    const countToDoID = listToDo.querySelector(".count");
    const countCompleteID = listComplete.querySelector(".count");
    countToDoID.innerHTML = "(" + countToDo + ")";
    countCompleteID.innerHTML = "(" + countComplete + ")";
    listToDoTitle.appendChild(countToDoID);
    listCompleteTitle.appendChild(countCompleteID);
  
    // hide list complete if no tasks are complete
    if (countComplete === 0) {
      listComplete.classList.add("hidden");
    } else if (countComplete > 0) {
      listComplete.classList.remove("hidden");
    }
  }
  
  function increaseCount(count, countDiv) {
    count++;
    countDiv.innerHTML = "(" + count + ")";
    return count;
  }
  
  function decreaseCount(count, countDiv) {
    count--;
    countDiv.innerHTML = "(" + count + ")";
    return count;
  }
  
  function addListTab(list) {
    const tabLi = createDOMElement("li", "tab", list.title);
    // tabLi.id = project.lists.indexOf(list);
    tabs.appendChild(tabLi);
    const listIndex = project.lists.indexOf(list);
    tabLi.addEventListener("click", () => {
      tabLi.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
  
      printSelectedList(listIndex);
      resetRadioBtns();
      clearLabels();
      clearTabs();
      tabLi.classList.add("active");
      hideArrows();
    });
  
    allTasksTab.addEventListener("click", () => {
      allTasksTab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
      printAllLists();
      clearLabels();
      clearTabs();
      allTasksTab.classList.add("active");
      hideArrows();
    });
  }
  
  function resetRadioBtns() {
    const radioBtns = document.querySelectorAll('input[type="radio"]');
    radioBtns.forEach((btn) => (btn.checked = false));
    sortDateAddedBtn.checked = true;
  }
  
  function deleteTaskFromList(task) {
    const listIndex = task.listIndex;
    const selectedList = project.lists[listIndex].tasks;
    const taskIndex = selectedList.indexOf(task);
    selectedList.splice(taskIndex, 1);
  }
  
  function printAllLists() {
    main.textContent = "";
    project.lists.forEach((list) => {
      createListContainer(list);
    });
  }

  function printSelectedList(listIndex) {
    main.textContent = "";
    const selectedList = project.lists[listIndex];
    createListContainer(selectedList);
  }
  
  function clearTabs() {
    const getAllTabs = document.querySelectorAll(".tab");
    getAllTabs.forEach((tab) => {
      tab.classList.remove("active");
    });
  }
  
  function clearLabels() {
    const getAllLabels = document.querySelectorAll(".sidebarLbl");
    getAllLabels.forEach((label) => {
      label.classList.remove("active");
    });
  }

  export { addListTab, printAllLists }