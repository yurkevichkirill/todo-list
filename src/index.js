import "./styles.css";
import { addProjectDOM } from "./createDOM.js";
import { createAllTasks } from "./all-tasks.js";
import { createFavourTasks } from "./important.js";

createAllTasks();
addProjectDOM();

document.querySelector(".today").addEventListener("click", () => {

});

document.querySelector(".week").addEventListener("click", () => {

});

document.querySelector(".important").addEventListener("click", () => {
    createFavourTasks();
});