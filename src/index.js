import "./styles.css";
import {ToDoItem} from "./todos.js";
import {Project} from "./todos.js";

const item = new ToDoItem("pass exam", "pass it good for a 9", new Date(), 9, false);
const item2 = new ToDoItem("meet Veronika", "walk in park and eat", new Date(), 10, false);

const project = new Project([item, item2], "Thursday", new Date());

for(const todo of project.todoItems){
    console.log(todo.dueDate);
}