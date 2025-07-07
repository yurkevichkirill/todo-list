import { compareAsc } from "date-fns";

export class ToDoItem{
    constructor(title, description, dueDate, priority, isDone, isFavourite){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
        this.isFavourite = isFavourite;
    }
}

export class Project{
    constructor(title, dueDate){
        this.todoItems = [];
        this.title = title;
        this.dueDate = dueDate;
    }
}

export let projects = [];

export function addProject(project){
    projects.push(project);
    saveProjInStorage();
}

export function addToDo(project, todo){
    project.todoItems.push(todo);
    saveProjInStorage();
}

export function getProjectByTitle(title){
    for(const project of projects){
        if(project.title === title){
            return project;
        }
    }
}

function saveProjInStorage(){
    localStorage.setItem("projects", JSON.stringify(projects));
}

function getProjFromStorage(){
    const projectsFromStorage = JSON.parse(localStorage.getItem("projects"));
    if(!projectsFromStorage){
        return [];
    }
    return projectsFromStorage;
}

export function fillProjects(){
    const projectsFromStorage = getProjFromStorage();
    for(const project of projectsFromStorage){
        projects.push(project);
    }
}

export function getAllTasks(){
    const allTasks = [];
    for(const project of projects){
        for(const todo of project.todoItems){
            allTasks.push(todo);
        }
    }
    return allTasks;
}

export function sortTasksByDate(allTasks){
    allTasks.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
}

export function deleteProject(project){
    for(let i = 0; i < projects.length; i++){
        if(projects[i] === project){
            projects.splice(i, 1);
        }
    }
    saveProjInStorage();
}

export function renameProject(title, newTitle){
    for(let i = 0; i < projects.length; i++){
        if(projects[i].title === title){
            projects[i].title = newTitle;
        }
    }
    saveProjInStorage();
}

export function editTodo(taskTitle, newTitle, newDescription, newDate, newPriority){
    for(let i = 0; i < projects.length; i++){
        for(let j = 0; j < projects[i].todoItems.length; j++){
            if(projects[i].todoItems[j].title === taskTitle){
                projects[i].todoItems[j].title = newTitle;
                projects[i].todoItems[j].description = newDescription;
                projects[i].todoItems[j].dueDate = newDate;
                projects[i].todoItems[j].priority = newPriority;
            }
        }
    }
    saveProjInStorage();
}

export function deleteTodo(todo){
    for(let i = 0; i < projects.length; i++){
        for(let j = 0; j < projects[i].todoItems.length; j++){
            if(projects[i].todoItems[j] === todo){
                projects[i].todoItems.splice(j, 1);
            }
        }
    }
    saveProjInStorage();
}

export function addToFavours(todo){
    for(let i = 0; i < projects.length; i++){
        for(let j = 0; j < projects[i].todoItems.length; j++){
            if(projects[i].todoItems[j] === todo){
                if(projects[i].todoItems[j].isFavourite === false){
                    projects[i].todoItems[j].isFavourite = true;
                }
                else{
                    projects[i].todoItems[j].isFavourite = false;
                }
            }
        }
    }
    saveProjInStorage();
}