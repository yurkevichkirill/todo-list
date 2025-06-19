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
        appendNewProject(projectTitle);
        cleanAddProjectDOM(addProjectForm);
        console.log(projects);        
    });
}

function appendNewProject(title){
    const projectTabs = document.querySelector(".projects-tabs");
    const newProject = createNewProjectDOM(title);
    projectTabs.appendChild(newProject);
}

function createNewProjectDOM(title){
    const newProject = document.createElement("button");
    newProject.id = `${title}`;
    addProjectAction(newProject);
    newProject.textContent = title;
    return newProject;
}

function addProjectAction(newProject){
    newProject.addEventListener("click", () => {
        addItemDOM(newProject);
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