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
    localStorageSave();
}

export function addToDo(project, todo){
    project.todoItems.push(todo);
}

export function getProjectByTitle(title){
    for(const project of projects){
        if(project.title === title){
            return project;
        }
    }
}

function localStorageSave(){
    localStorage.setItem("projects", JSON.stringify(projects));
}