import { ToDoItem, addToDo, getProjectByTitle, getAllTasks, sortTasksByDate, editTodo, deleteTodo, addToFavours, getFavours, changeDone, getToday, getCurrentWeek} from "./todos";
import { getTitle } from "./addProjectDOM";
import deleteURL from "./icons/delete.svg";
import favourURL from "./icons/star.svg";
import editURL from "./icons/text-box-edit-outline.svg";
import check from "./icons/check.svg";
import plus from "./icons/plus.svg";

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
    const addItemDiv = document.createElement("div");
    addItemDiv.className = "add-item-div";

    const addItemImg = document.createElement("img");
    addItemImg.src = plus;
    addItemImg.alt = "plus";
    addItemImg.className = "plus";

    const addItemBtn = document.createElement("button");
    addItemBtn.className = "add-task-btn";
    addItemBtn.textContent = "Add Task";

    addItemDiv.append(addItemImg, addItemBtn);

    todoWork.appendChild(addItemDiv);
    return addItemDiv;
}

function isAddItemBtn(){
    if(document.querySelector(".add-item-div")){
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
            <input type="text" id="title" required placeholder = "What to do?">
        </div>
        <div class="formItem">
            <label for="details">Datails(optional):</label>
            <input type="text" id="details" placeholder = "eg: I'm just gonna procrastinate, aren't I?">
        </div>
        <div class="formItem">
            <label for="date">Date:</label>
            <input type="date" id="date" required>
        </div>
        <div class="formItem">
            <label for="priority">Priority</label>
            <select name="priority" id="priority">
                <option value="Low">Low</option>
                <option value="Medium" selected>Medium</option>
                <option value="High">High</option>
            </select>
        </div>
        <div class="item-btns">
            <button class="item-add" type=submit>Add</button>
            <button class="item-cancel-add" type=reset>Cancel</button>
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
    const cancel = document.querySelector(".item-cancel-add");
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
    const projectTitle = getTitle();
    const project = getProjectByTitle(projectTitle);
    addToDo(project, todo);

    printTodos();

    removeAddItemForm();
}

function clearProjectTodos(){
    const tasks = document.querySelector(".tasks");
    tasks.innerHTML = ``;
}

export function printTodos(){
    clearProjectTodos();
    const title = getTitle();
    if(title === "All tasks"){
        printAllTasks();
    }
    else if(title === "Today"){
        printToday();
    }
    else if(title === "Week"){
        printWeek();
    }
    else if(title === "Important"){
        printFavours();
    }
    else{
        printProjectTodos();
    }
}

function printProjectTodos(){
    const tasks = document.querySelector(".tasks");
    const currentProject = getProjectByTitle(getTitle());
    for(const todo of currentProject.todoItems){
        const todoDiv = createTaskDOM(todo);
        tasks.appendChild(todoDiv);
    }   
}

function createTaskDOM(todo){
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    todoDiv.id = `${todo.title}`;
    addPriorityColor(todo, todoDiv);

    const todoMain = document.createElement("div");
    todoMain.className = "todo-main";
    todoDiv.appendChild(todoMain);

    const todoStart = document.createElement("div");
    todoStart.className = "todo-start";
    todoMain.append(todoStart);

    const executed = document.createElement("div");
    executed.className = "executed";
    changeDoneStatus(todo, executed);
    todoStart.appendChild(executed);

    const todoTitle = document.createElement("div");
    todoTitle.className = "todo-title";
    todoTitle.textContent = todo.title;
    todoStart.appendChild(todoTitle);
    
    const todoBtns = document.createElement("div");
    todoBtns.className = "todo-btns";
    todoMain.appendChild(todoBtns);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    const editImg = document.createElement("img");
    editImg.src = editURL;
    editImg.alt = "edit";
    editImg.className = "edit-img";
    editBtn.appendChild(editImg);
    todoBtns.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    const deleteImg = document.createElement("img");
    deleteImg.src = deleteURL;
    deleteImg.alt = "delete";
    deleteImg.className = "delete-img";
    deleteBtn.appendChild(deleteImg);
    todoBtns.appendChild(deleteBtn);

    const favourBtn = document.createElement("button");
    favourBtn.className = "favour-btn";
    const favourImg = document.createElement("img");
    favourImg.className = "favour-img";
    favourImg.classList.add("non-favour");
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
    makeDoneAction(todo, executed);

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
    optionLow.value = 'Low';
    optionLow.textContent = 'Low';

    const optionMedium = document.createElement('option');
    optionMedium.value = 'Medium';
    optionMedium.textContent = 'Medium';
    optionMedium.selected = true;

    const optionHigh = document.createElement('option');
    optionHigh.value = 'High';
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
    cancelButton.className = 'item-cancel-edit';
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
    const cancel = document.querySelector(".item-cancel-edit");
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
        printTodos();
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
        favourImg.classList.remove("non-favour");
        favourImg.classList.add("yellow-star");
    }
    else if (todo.isFavourite === false){
        favourImg.classList.remove("yellow-star");
        favourImg.classList.add("non-favour");
    }
}

function makeDoneAction(todo, executed){
    executed.addEventListener("click", () => {
        makeDoneDOM(todo, executed);
    })
}

function makeDoneDOM(todo, executed){
    changeDone(todo);
    changeDoneStatus(todo, executed);
}

function changeDoneStatus(todo, executed){
    if(todo.isDone === true){
        const isDone = isDoneStatus();
        executed.append(isDone);
    }
    else if (todo.isDone === false){
        executed.innerHTML = "";
    }
}

function isDoneStatus(){
    const isDone = document.createElement("img");
    isDone.src = check;
    isDone.className = "check";
    return isDone;
}

function addPriorityColor(todo, todoDiv){
    if(todo.priority === "Low"){
        todoDiv.style.borderLeft = "4px solid greenyellow";
    }
    else if(todo.priority === "Medium"){
        todoDiv.style.borderLeft = "4px solid orange";
    }
    else if(todo.priority === "High"){
        todoDiv.style.borderLeft = "4px solid red";
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
    if(document.querySelector(".add-item-div")){
        document.querySelector(".add-item-div").remove();
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
    removeAddTask();
}

export function printToday(){
    const today = getToday();
    const tasks = document.querySelector(".tasks");
    clearProjectTodos();
    for(const task of today){
        const todoDiv = createTaskDOM(task);
        tasks.appendChild(todoDiv);
    }
    removeAddTask();
}

export function printWeek(){
    const week = getCurrentWeek();
    const tasks = document.querySelector(".tasks");
    clearProjectTodos();
    for(const task of week){
        const todoDiv = createTaskDOM(task);
        tasks.appendChild(todoDiv);
    }
    removeAddTask();
}