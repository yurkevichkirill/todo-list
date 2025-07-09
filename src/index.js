import "./styles.css";
import { addProjectDOM } from "./createDOM.js";
import { createAllTasks } from "./all-tasks.js";
import { createFavourTasks } from "./important.js";
import { createTodayTasks } from "./today.js";
import { createWeekTasks } from "./week.js";

createAllTasks();
addProjectDOM();

document.querySelector(".today-div").addEventListener("click", () => {
    createTodayTasks();
});

document.querySelector(".week-div").addEventListener("click", () => {
    createWeekTasks();
});

document.querySelector(".important-div").addEventListener("click", () => {
    createFavourTasks();
});