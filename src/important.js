import { printFavours } from "./addItemDOM";

export function createFavourTasks(){
    const app = document.querySelector(".app");
    document.querySelector(".project-head").textContent = "Important";
    printFavours();
}