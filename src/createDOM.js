import { addProjectForm } from "./addProjectDOM";

export function addProjectDOM(){
    const addProjectDiv = document.querySelector(".add-project-div");
    addProjectDiv.addEventListener("click", () => {
        addProjectForm(addProjectDiv);
    });

}

