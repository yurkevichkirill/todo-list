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
    constructor(todoItems, title, dueDate){
        this.todoItems = todoItems;
    }
}
