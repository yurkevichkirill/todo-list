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
    saveItemsInStorage(project);
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
    for(const project of projects){
        saveItemInStorage(project);
    }
}

function saveItemsInStorage(project){
    localStorage.setItem(`${project.title}`, JSON.stringify(project.todoItems));
}

function getProjFromStorage(){
    const projectsFromStorage = JSON.parse(localStorage.getItem("projects"));
    if(!projectsFromStorage){
        return [];
    }
    return projectsFromStorage;
}

export function fillProjects(){
    for(const project of getProjFromStorage()){
        projects.push(project);
        fillTodos(project);
    }
}

function fillTodos(project){
    for(const todo of getItemsFromStorage(project)){
        project.todoItems.push(todo);
    }
}

function getItemsFromStorage(project){
    const todosFromStorage = JSON.parse(localStorage.getItem(`${project.title}`));
    if(!todosFromStorage){
        return [];
    }
    return todosFromStorage;
}