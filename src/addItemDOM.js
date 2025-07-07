import { ToDoItem, addToDo, getProjectByTitle, getAllTasks, sortTasksByDate, editTodo, deleteTodo, addToFavours, getFavours} from "./todos";
import { getProjectTitle } from "./addProjectDOM";
import deleteURL from "./icons/delete.svg";
import favourURL from "./icons/star-outline.svg";
import editURL from "./icons/text-box-edit-outline.svg";

export function addItemDOM(projectBtn){
    createProjectHead(projectBtn);  
    if(isAddItemBtn()){
        return;
    } 
    const addItemBtn = createAddItemBtn();
    createTaskAction(addItemBtn);
}

function createProjectHead(projectBtn){
    const todoWork = getTodoWork();
    const projectHead = document.querySelector(".project-head")
    projectHead.textContent = projectBtn.textContent;
}

function createAddItemBtn(){ 
    const todoWork = getTodoWork();
    const addItemBtn = document.createElement("button");
    addItemBtn.className = "add-task-btn";
    addItemBtn.textContent = "Add Task";
    todoWork.appendChild(addItemBtn);
    return addItemBtn;
}

function isAddItemBtn(){
    if(document.querySelector(".add-task-btn")){
        return true;
    }
    return false;
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

    printProjectTodos();

    removeAddItemForm();
}

function clearProjectTodos(){
    const tasks = document.querySelector(".tasks");
    tasks.innerHTML = ``;
}

export function printProjectTodos(){
    clearProjectTodos();
    const tasks = document.querySelector(".tasks");
    const currentProject = getProjectByTitle(getProjectTitle());
    for(const todo of currentProject.todoItems){
        const todoDiv = createTaskDOM(todo);
        tasks.appendChild(todoDiv);
    }
}

function createTaskDOM(todo){
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    todoDiv.id = `${todo.title}`;

    const todoMain = document.createElement("div");
    todoMain.className = "todo-main";
    todoDiv.appendChild(todoMain);

    const executed = document.createElement("div");
    executed.className = "executed";
    todoMain.appendChild(executed);

    const todoTitle = document.createElement("div");
    todoTitle.className = "todo-title";
    todoTitle.textContent = todo.title;
    todoMain.appendChild(todoTitle);
    
    const todoBtns = document.createElement("div");
    todoBtns.className = "todo-btns";
    todoMain.appendChild(todoBtns);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    const editImg = document.createElement("img");
    editImg.src = editURL;
    editImg.alt = "edit";
    editBtn.appendChild(editImg);
    todoBtns.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    const deleteImg = document.createElement("img");
    deleteImg.src = deleteURL;
    deleteImg.alt = "delete";
    deleteBtn.appendChild(deleteImg);
    todoBtns.appendChild(deleteBtn);

    const favourBtn = document.createElement("button");
    favourBtn.className = "favour-btn";
    const favourImg = document.createElement("img");
    changeFavourColor(todo, favourImg);
    favourImg.src = favourURL;
    favourImg.alt = "favour";
    
    favourBtn.appendChild(favourImg);
    todoBtns.appendChild(favourBtn);

    const todoInfo = document.createElement("div");
    todoInfo.textContent = `Priority: ${todo.priority} | Due Date: ${todo.dueDate}`;
    todoInfo.className = "todo-info";
    todoDiv.appendChild(todoInfo);

    const todoDescription = document.createElement("div");
    todoDescription.className = "todo-description";
    todoDescription.textContent = todo.description;
    todoDiv.appendChild(todoDescription);

    editTaskAction(todo, editBtn, todoDiv);
    deleteTaskAction(todo, deleteBtn);
    favourTaskAction(todo, favourBtn, favourImg);    

    return todoDiv;
}

function editTaskAction(todo, editBtn, todoDiv){
    editBtn.addEventListener("click", () => {
        editItemForm(todo, todoDiv);
    })
}

function editItemForm(todo, todoDiv){
    if(isEditItemActive()){
        return;
    }
    const itemFormDiv = document.createElement("div");
    itemFormDiv.className = "edit-item";

    const form = document.createElement('form');
    itemFormDiv.append(form);

    const titleGroup = document.createElement('div');
    titleGroup.className = 'formItem';

    const titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'title';
    titleLabel.textContent = 'Title:';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.value = todo.title || '';
    titleInput.required = true;

    titleGroup.append(titleLabel, titleInput);

    const detailsGroup = document.createElement('div');
    detailsGroup.className = 'formItem';

    const detailsLabel = document.createElement('label');
    detailsLabel.htmlFor = 'details';
    detailsLabel.textContent = 'Details(optional)';

    const detailsInput = document.createElement('input');
    detailsInput.type = 'text';
    detailsInput.id = 'details';
    detailsInput.value = todo.description || '';

    detailsGroup.append(detailsLabel, detailsInput);

    const dateGroup = document.createElement('div');
    dateGroup.className = 'formItem';

    const dateLabel = document.createElement('label');
    dateLabel.htmlFor = 'date';
    dateLabel.textContent = 'Date:';

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date';
    dateInput.value = todo.dueDate || '';
    dateInput.required = true;

    dateGroup.append(dateLabel, dateInput);

    const priorityGroup = document.createElement('div');
    priorityGroup.className = 'formItem';

    const priorityLabel = document.createElement('label');
    priorityLabel.htmlFor = 'priority';
    priorityLabel.textContent = 'Priority';

    const prioritySelect = document.createElement('select');
    prioritySelect.name = 'priority';
    prioritySelect.id = 'priority';

    const optionLow = document.createElement('option');
    optionLow.value = 'low';
    optionLow.textContent = 'Low';

    const optionMedium = document.createElement('option');
    optionMedium.value = 'medium';
    optionMedium.textContent = 'Medium';
    optionMedium.selected = true;

    const optionHigh = document.createElement('option');
    optionHigh.value = 'high';
    optionHigh.textContent = 'High';

    prioritySelect.append(optionLow, optionMedium, optionHigh);

    if (todo.priority) {
        const optionToSelect = prioritySelect.querySelector(`[value="${todo.priority}"]`);
        if (optionToSelect) {
            optionToSelect.selected = true;
            optionMedium.selected = false;
        }
    }

    priorityGroup.append(priorityLabel, prioritySelect);

    const buttonsGroup = document.createElement('div');
    buttonsGroup.className = 'item-btns';

    const editButton = document.createElement('button');
    editButton.className = 'item-edit';
    editButton.type = 'submit';
    editButton.textContent = 'Edit';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'item-cancel';
    cancelButton.type = 'reset';
    cancelButton.textContent = 'Cancel';

    buttonsGroup.append(editButton, cancelButton);

    form.append(
        titleGroup,
        detailsGroup,
        dateGroup,
        priorityGroup,
        buttonsGroup
    );

    todoDiv.after(itemFormDiv);
    editItemCancel();
    formEditItem(todo, todoDiv);
}

function isEditItemActive(){
    if(document.querySelector(".edit-item")){
        return true;
    }
    return false;
}

function editItemCancel(){
    const cancel = document.querySelector(".item-cancel");
    cancel.addEventListener("click", () => {
        removeEditItemForm();
    });
}

function removeEditItemForm(){
    const itemFormDiv = document.querySelector(".edit-item");
    itemFormDiv.remove();
}

function formEditItem(todo, todoDiv){
    const edit = document.querySelector(".item-edit");
    edit.addEventListener("click", (event) => {
        editTodoDOM(event, todo, todoDiv);
        removeEditItemForm();
    });
}

function editTodoDOM(event, todo, todoDiv){
    event.preventDefault();

    const titleInput = document.querySelector("#title").value;
    const descriptionInput = document.querySelector("#details").value;
    const dateInput = document.querySelector("#date").value;
    const priorityInput = document.querySelector("#priority").value;

    editTodo(todoDiv.id, titleInput, descriptionInput, dateInput, priorityInput);

    todoDiv.replaceWith(createTaskDOM(todo));
}

function deleteTaskAction(todo, deleteBtn){
    deleteBtn.addEventListener("click", () => {
        deleteTaskDOM(todo);
    });
}

function deleteTaskDOM(todo){
    deleteTodo(todo);
    if(document.querySelector(".project-head").textContent === "All Tasks"){
        printAllTasks();
    }
    else{
        printProjectTodos();
    }
}

function favourTaskAction(todo, favourBtn, favourImg){
    favourBtn.addEventListener("click", () => {
        addToFavourDOM(todo, favourImg);
        if(document.querySelector(".project-head").textContent === "Important"){
            printFavours();
        }
    })
}

function addToFavourDOM(todo, favourImg){
    addToFavours(todo);
    changeFavourColor(todo, favourImg);
}

function changeFavourColor(todo, favourImg){
    if(todo.isFavourite === true){
        favourImg.style.backgroundColor = "yellow";
    }
    else if (todo.isFavourite === false){
        favourImg.style.backgroundColor = "grey";
    }
}

export function printAllTasks(){
    setAllTasksHead();
    removeAddTask();
    removeAddForm();
    const allTasks = getAllTasks();
    sortTasksByDate(allTasks);
    clearProjectTodos();
    const tasks = document.querySelector(".tasks");
    for(const task of allTasks){
        const todoDiv = createTaskDOM(task);
        tasks.appendChild(todoDiv);
    }
}

function removeAddTask(){
    if(document.querySelector(".add-task-btn")){
        document.querySelector(".add-task-btn").remove();
    }
}

function removeAddForm(){
    if(document.querySelector(".add-item")){
        document.querySelector(".add-item").remove();
    }
}

function setAllTasksHead(){
    document.querySelector(".project-head").textContent = "All Tasks";
}

export function printFavours(){
    const favours = getFavours();
    const tasks = document.querySelector(".tasks");
    clearProjectTodos();
    for(const task of favours){
        const todoDiv = createTaskDOM(task);
        tasks.appendChild(todoDiv);
    }
}
