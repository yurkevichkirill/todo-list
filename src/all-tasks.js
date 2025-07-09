import { printProjects, allTasksDOM } from "./addProjectDOM";
import { printAllTasks } from "./addItemDOM";
import plus from "./icons/plus.svg";
import all_tasks from "./icons/all-tasks.svg";
import today from "./icons/today.svg";
import week from "./icons/week.svg";
import star from "./icons/star.svg";

export function createAllTasks(){
    const app = document.querySelector(".app");
    app.innerHTML = `
       <div class="menu">
            <div class="home">
                <div class="home-header">Home</div>
                <div class="underline"></div>
                <div class="home-tabs">
                    <div class="home-div all-tasks-div">
                        <img src=${all_tasks} alt="all-tasks" class="home-img">
                        <button class="all-tasks">All Tasks</button>
                    </div>
                    <div class="home-div today-div">
                        <img src=${today} alt="today" class="home-img">
                        <button class="today">Today</button>
                    </div>
                    <div class="home-div week-div">
                        <img src=${week} alt="week" class="home-img">
                        <button class="week">Week</button>
                    </div>
                    <div class="home-div important-div">
                        <img src="${star}" alt="important" class="home-img">
                        <button class="important">Important</button>
                    </div>
                </div>
            </div>
            <div class="projects">
                <div class="projects-header">Projects</div>
                <div class="underline"></div>
                <div class="projects-tabs"></div>
                <div class="add-project-div">
                    <img src=${plus} alt="plus" class="plus">
                    <button class="add-project">Add Project</button>
                </div>
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