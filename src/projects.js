import { addListTab } from "./dom"
import { Task } from "./tasks"
import { List } from "./lists"

    class Project {
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

    const project = new Project();
    const task1 = new Task(
    "So cool holiday party",
    "Dressy but work appropriate",
    "12/3/2024",
    "high",
    ["Work"]
    );

    const task2 = new Task(
    "This is at index 2",
    "I don't know",
    "January 10, 2024",
    "low",
    ["School", "Work", "Other"]
    );

    const firstList = new List("First List");

    firstList.addTask(task1);
    firstList.addTask(task2);

    project.addList(firstList);

    const newTask = new Task(
    "new task!",
    "hehe some notes here",
    "June 5, 2024",
    "low",
    ["School"]
    );

    firstList.addTask(newTask);

    const secondList = new List("List Number Two");

    const task3 = new Task(
    "Second List's first task",
    "hehe some notes here",
    "March 14, 2024",
    "low",
    ["School", "Personal"]
    );

    const task4 = new Task(
    "Second List's second task",
    "hehe some notes here",
    "September 18, 2024",
    "low",
    ["School", "Home"]
    );
    secondList.addTask(task3);
    secondList.addTask(task4);

    project.addList(secondList);

    const thirdList = new List("Personal Tasks");

    const task5 = new Task(
    "This is really cool",
    "hehe some notes here",
    "October 11, 2024",
    "low",
    ["Work", "Other"]
    );

    thirdList.addTask(task5);
    project.addList(thirdList);


    export { project }