import { addProjectForm } from "./addProjectDOM";

export function addProjectDOM(){
    const addProjectBtn = document.querySelector(".add-project");
    addProjectBtn.addEventListener("click", () => {
        addProjectForm(addProjectBtn);
    });

}

