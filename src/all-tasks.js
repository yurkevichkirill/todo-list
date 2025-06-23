import { printProjects } from "./addProjectDOM";

export function createAllTasks(){
    const app = document.querySelector(".app");
    app.innerHTML = `
        <div class="menu">
            <div class="home">
                <div class="home-header">Home</div>
                <div class="home-tabs">
                    <button class="all-tasks">All Tasks</button>
                    <button class="today">Today</button>
                    <button class="week">Next 7 Days</button>
                    <button class="important">Important</button>
                </div>
            </div>
            <div class="projects">
                <div class="projects-header">Projects</div>
                <div class="projects-tabs"></div>
                <button class="add-project">Add Project</button>
            </div>
        </div>
        <div class="todo-work">All Tasks</div>
    `
    printProjects();
}