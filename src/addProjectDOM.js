import { projects } from "./todos";
import { Project, addProject } from "./todos";
import { addItemDOM } from "./addItemDOM";

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
        console.log(projects);        
    });
}

function appendNewProject(newProject){
    const projectTabs = document.querySelector(".projects-tabs");
    const newProjectDOM = createNewProjectDOM(newProject);
    projectTabs.appendChild(newProjectDOM);
}

function createNewProjectDOM(newProject){
    const newProjectBtn = document.createElement("button");
    newProjectBtn.id = `${newProject.title}`;
    addProjectAction(newProjectBtn);
    newProjectBtn.textContent = newProject.title;
    return newProjectBtn;
}

function addProjectAction(newProjectBtn){
    newProjectBtn.addEventListener("click", () => {
        addItemDOM(newProjectBtn);
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