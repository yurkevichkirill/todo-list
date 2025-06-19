import { projects } from "./todos";
import { Project, addProject } from "./todos";

export function addProjectDOM(){
    const addProjectBtn = document.querySelector(".add-project");
    addProjectBtn.addEventListener("click", () => {
        addProjectForm(addProjectBtn);
    });
}

function addProjectForm(addProjectBtn){
    const parentDiv = addProjectBtn.parentNode;

    const addProjectForm = document.createElement("div");
    parentDiv.insertBefore(addProjectForm, addProjectBtn);

    const inputProject = document.createElement("input");
    inputProject.placeholder = "Enteer project's name";
    addProjectForm.appendChild(inputProject);

    const btnDiv = document.createElement("div");
    addProjectForm.appendChild(btnDiv);

    const add = document.createElement("button");
    add.textContent = "Add";
    addButtonProject(add, inputProject);
    btnDiv.appendChild(add);

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancelButtonProject(cancel, addProjectForm);
    btnDiv.appendChild(cancel);
}

function addButtonProject(add, inputProject){
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
        appendNewProject(projectTitle);
        cleanAddProjectDOM();
        console.log(projects);        
    });
}

function appendNewProject(title){
    const addProjectBtn = document.querySelector(".add-project");
    const newProject = createNewProjectDOM(title);
    const parentDiv = addProjectBtn.parentNode;

    parentDiv.insertBefore(newProject, addProjectBtn);
}

function createNewProjectDOM(title){
    const newProject = document.createElement("div");
    newProject.textContent = title;
    return newProject;
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