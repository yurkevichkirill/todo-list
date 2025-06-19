export class ToDoItem{
    constructor(title, description, dueDate, priority, checklist){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklist = checklist;
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
}

export function addToDo(project, todo){
    project.todoItems.push(todo);
}