import { ToDoItem, addToDo} from "./todos";
import { getProjectTitle } from "./addProjectDOM";
import { getProjectByTitle } from "./todos";

export function addItemDOM(projectBtn){
    createProjectHead(projectBtn);
    const addItemBtn = createAddItemBtn();
    createTaskAction(addItemBtn);
}

function createProjectHead(projectBtn){
    const todoWork = getTodoWork();
    todoWork.innerHTML = ``;
    const projectHead = document.createElement("div");
    projectHead.className = "project-head";
    projectHead.textContent = projectBtn.textContent;
    todoWork.appendChild(projectHead);
}

function createAddItemBtn(){
    const todoWork = getTodoWork();
    const addItemBtn = document.createElement("button");
    addItemBtn.textContent = "Add Task";
    todoWork.appendChild(addItemBtn);
    return addItemBtn;
}

function getTodoWork(){
    return document.querySelector(".todo-work");
}

function createTaskAction(addItemBtn){
    addItemBtn.addEventListener("click", () => {
        addItemForm(addItemBtn);
    })
}

function addItemForm(addItemBtn){
    if(isAddItemActive()){
        return;
    }
    const itemFormDiv = document.createElement("div");
    itemFormDiv.className = "add-item";
    itemFormDiv.innerHTML = `
    <form>
        <div class="formItem">
            <label for="title">Title:</label>
            <input type="text" id="title" required>
        </div>
        <div class="formItem">
            <label for="details">Datails(optional)</label>
            <input type="text" id="details">
        </div>
        <div class="formItem">
            <label for="date">Date:</label>
            <input type="date" id="date" required>
        </div>
        <div class="formItem">
            <label for="priority">Priority</label>
            <select name="priority" id="priority">
                <option value="low">Low</option>
                <option value="medium" selected>Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        <div class="item-btns">
            <button class="item-add" type=submit>Add</button>
            <button class="item-cancel" type=reset>Cancel</button>
        </div>
    </form>
    `
    const parentDiv = addItemBtn.parentNode;
    parentDiv.insertBefore(itemFormDiv, addItemBtn);
    addItemCancel();
    formAddItem();
}

function isAddItemActive(){
    if(document.querySelector(".add-item")){
        return true;
    }
    return false;
}

function addItemCancel(){
    const cancel = document.querySelector(".item-cancel");
    cancel.addEventListener("click", () => {
        removeAddItemForm();
    });
}

function removeAddItemForm(){
    const itemFormDiv = document.querySelector(".add-item");
    itemFormDiv.remove();
}

function formAddItem(){
    const add = document.querySelector(".item-add");
    add.addEventListener("click", (event) => {
        createTodoDOM(event);
    })
}

function createTodoDOM(event){
    event.preventDefault();

    const titleInput = document.querySelector("#title").value;
    const descriptionInput = document.querySelector("#details").value;
    const dateInput = document.querySelector("#date").value;
    const priorityInput = document.querySelector("#priority").value;
    const defaultDone = false;
    const defaultFavour = false;
    
    const todo = new ToDoItem(titleInput, descriptionInput, dateInput, priorityInput, defaultDone, defaultFavour);
    const projectTitle = getProjectTitle();
    const project = getProjectByTitle(projectTitle);
    addToDo(project, todo);

    removeAddItemForm();
}

