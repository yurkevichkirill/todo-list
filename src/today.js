import { printToday } from "./addItemDOM";

export function createTodayTasks(){
    const app = document.querySelector(".app");
    document.querySelector(".project-head").textContent = "Today";
    printToday();
}