import { projects, Project, addProject, fillProjects } from "./todos";
import { addItemDOM, printAllTasks, printProjectTodos } from "./addItemDOM";
import dots from "./icons/dots-vertical.svg";

export function addProjectForm(addProjectBtn){
    if(isAddProjActive()){
        return;
    }
    const parentDiv = addProjectBtn.parentNode;

    const addProjectForm = document.createElement("div");
    addProjectForm.className = "add-form";
    parentDiv.insertBefore(addProjectForm, addProjectBtn);

    const inputProject = document.createElement("input");
    inputProject.placeholder = "Enter project's name";
    addProjectForm.appendChild(inputProject);

    const btnDiv = document.createElement("div");
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
        const newProject = new Project(projectTitle, new Date());
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
        if(isDotsProjFormActive(title)){
            document.querySelector(`#${title}-dots-menu`).remove();
        }
        else{
            displayDotsProjForm(dots, title);
        }
    });
}

function displayDotsProjForm(dots, title){
    const dotsProjForm = document.createElement("div");
    dotsProjForm.className = "dots-project-form";
    dotsProjForm.id = `${title}-dots-menu`;
    dotsProjForm.innerHTML = `
    <button>Rename</button>
    <button>Delete</button>
    `
    dots.after(dotsProjForm);
}
function isDotsProjFormActive(title){
    if(document.querySelector(`#${title}-dots-menu`)){
        return true;
    }
    return false;
}

function addProjectAction(newProjectBtn){
    newProjectBtn.addEventListener("click", () => {
        addItemDOM(newProjectBtn);
        printProjectTodos();
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

export function getProjectTitle(){
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
        console.log(projects);
    });
}
