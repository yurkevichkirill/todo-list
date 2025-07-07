import { printProjects, allTasksDOM } from "./addProjectDOM";
import { printAllTasks } from "./addItemDOM";

export function createAllTasks(){
    const app = document.querySelector(".app");
    app.innerHTML = `
       <div class="menu">
            <div class="home">
                <div class="home-header">Home</div>
                <div class="home-tabs">
                    <button class="all-tasks">All Tasks</button>
                    <button class="today">Today</button>
                    <button class="week">Week</button>
                    <button class="important">Important</button>
                </div>
            </div>
            <div class="projects">
                <div class="projects-header">Projects</div>
                <div class="projects-tabs"></div>
                <button class="add-project">Add Project</button>
            </div>
        </div>
        <div class="todo-work">
            <div class="project-head">All Tasks</div>
            <div class="tasks"></div>            
        </div>
    `
    allTasksDOM();
    printProjects();
    printAllTasks();
}