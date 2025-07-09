import { projects, Project, addProject, fillProjects, deleteProject, getProjectByTitle, renameProject } from "./todos";
import { addItemDOM, printAllTasks, printTodos } from "./addItemDOM";
import dots from "./icons/dots-vertical.svg";

export function addProjectForm(addProjectDiv){
    if(isAddProjActive()){
        return;
    }
    const parentDiv = addProjectDiv.parentNode;

    const addProjectForm = document.createElement("div");
    addProjectForm.className = "add-form";
    parentDiv.insertBefore(addProjectForm, addProjectDiv);

    const inputProject = document.createElement("input");
    inputProject.id = "input-project-name";
    inputProject.placeholder = "Enter project's name";
    addProjectForm.appendChild(inputProject);

    const btnDiv = document.createElement("div");
    btnDiv.className = "add-project-btns";
    addProjectForm.appendChild(btnDiv);

    const add = document.createElement("button");
    add.textContent = "Add";
    addButtonProject(add, inputProject, addProjectForm);
    btnDiv.appendChild(add);

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancelButtonProject(cancel, addProjectForm);
    btnDiv.appendChild(cancel);
}

function addButtonProject(add, inputProject, addProjectForm){
    add.addEventListener("click", () => {
        const projectTitle = inputProject.value;
        if(isTitleEmpty(projectTitle)){
            return;
        }
        if(!isUnique(projectTitle, projects)){
            return;
        }
        const newProject = new Project(projectTitle);
        addProject(newProject);
        appendNewProject(newProject);
        cleanAddProjectDOM(addProjectForm);
    });
}

function appendNewProject(newProject){
    const projectTabs = document.querySelector(".projects-tabs");
    const newProjectDOM = createNewProjectDOM(newProject);
    projectTabs.appendChild(newProjectDOM);
}

function createNewProjectDOM(newProject){
    const newProjectDiv = document.createElement("div");
    newProjectDiv.className = "project-item";
    const newProjectBtn = document.createElement("button");
    newProjectBtn.id = `${newProject.title}`;
    addProjectAction(newProjectBtn);
    newProjectBtn.textContent = newProject.title;
    const editDiv = document.createElement("div");
    editDiv.className = "edit-project-div";
    const menuImg = document.createElement("img");
    menuImg.className = "dots";
    menuImg.src = dots;
    addDotsAction(menuImg, newProject.title);
    editDiv.appendChild(menuImg);
    newProjectDiv.appendChild(newProjectBtn);
    newProjectDiv.appendChild(editDiv);
    return newProjectDiv;
}

function addDotsAction(dots, title){
    dots.addEventListener("click", () => {
        if(isDotsProjFormActive()){
            document.querySelector(`#dots-menu`).remove();
        }
        else{
            displayDotsProjForm(dots, title);
        }

    });
}

function displayDotsProjForm(dots, title){
    const dotsProjForm = document.createElement("div");
    dotsProjForm.className = "dots-project-form";
    dotsProjForm.id = `dots-menu`;

    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Rename";

    renameBtn.addEventListener("click", () => {
        renameBtnAction(title);
        removeDotsMenu();
    });

    const underline = document.createElement("div");
    underline.className = "underline";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        const projectBtn = dots.parentNode.previousElementSibling;
        deleteBtnAction(projectBtn.textContent);
        removeDotsMenu();
    });

    dotsProjForm.append(renameBtn, underline, deleteBtn);

    dots.after(dotsProjForm);
}

function removeDotsMenu(){
    if(document.querySelector(".dots-project-form")){
        document.querySelector(".dots-project-form").remove();
    }
}

function deleteBtnAction(title){
    deleteProject(getProjectByTitle(title));
    location.reload();
}

function renameBtnAction(title){
    renameProjectForm(title);
}

function renameProjectForm(title){
    if(isRenameProjActive(title)){
        return;
    }
    const parentDiv = document.querySelector(`#${title}`).parentNode;

    const renameProjectForm = document.createElement("div");
    renameProjectForm.className = `${title}-rename-form`;
    parentDiv.after(renameProjectForm);

    const inputProject = document.createElement("input");
    inputProject.id = `${title}-rename-inp`;
    inputProject.value = `${title}`;
    renameProjectForm.appendChild(inputProject);
    inputProject.focus();

    const btnDiv = document.createElement("div");
    renameProjectForm.appendChild(btnDiv);

    const rename = document.createElement("button");
    rename.textContent = "Rename";
    renameProjectAction(rename, title);
    btnDiv.appendChild(rename);

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancelButtonProject(cancel, renameProjectForm);
    btnDiv.appendChild(cancel);
}

function isRenameProjActive(title){
    if(document.querySelector(`.${title}-rename-form`)){
        return true;
    }
    return false;
}

function renameProjectAction(rename, title){
    rename.addEventListener("click", () => {
        const newTitle = document.querySelector(`#${title}-rename-inp`).value;
        renameProject(title, newTitle);
        renameProjectHead(title, newTitle);    
        renameBtn(title, newTitle);
        renameId(title, newTitle);
        removeRenameForm(title);
    })
}

function renameProjectHead(title, newTitle){
    if(document.querySelector(".project-head").textContent === title){
        document.querySelector(".project-head").textContent = newTitle;
    }
}

function renameBtn(title, newTitle){
    document.querySelector(`#${title}`).textContent = newTitle;
}

function renameId(title, newTitle){
    document.querySelector(`#${title}`).id = newTitle;
}

function removeRenameForm(title){
    document.querySelector(`.${title}-rename-form`).remove();
}

function isDotsProjFormActive(){
    if(document.querySelector(`#dots-menu`)){
        return true;
    }
    return false;
}

function addProjectAction(newProjectBtn){
    newProjectBtn.addEventListener("click", () => {
        addItemDOM(newProjectBtn);
        printTodos();
    })
}

function cancelButtonProject(cancel, addProjectForm){
    cancel.addEventListener("click", () => {
        cleanAddProjectDOM(addProjectForm);
    })
}

function cleanAddProjectDOM(addProjectForm){
    addProjectForm.remove();
}

function isUnique(title, arr){
    for(const project of arr){
        if(project.title === title){
            return false;
        }
    }
    return true;
}

function isTitleEmpty(title){
    if(title === ''){
        return true;
    }
    return false;
}

function isAddProjActive(){
    if(document.querySelector(".add-form")){
        return true;
    }
    return false;
}

export function getTitle(){
    return document.querySelector(".project-head").textContent;
}

export function printProjects(){
    fillProjects();
    for(const project of projects){
        appendNewProject(project);
    }
}

export function getProjects(){
    return projects;
}

export function allTasksDOM(){
    const allTasksBtn = document.querySelector(".all-tasks");
    allTasksBtn.addEventListener("click", () => {
        printAllTasks();
    });
}
