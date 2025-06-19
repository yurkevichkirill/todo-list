export function createAllTasks(){
    const app = document.querySelector(".app");
    app.innerHTML = `
        <div class="menu">
            <div class="home">
                <div class="home-header">Home</div>
                <div class="home-tabs">
                    <div class="all-tasks">All Tasks</div>
                    <div class="today">Today</div>
                    <div class="week">Next 7 Days</div>
                    <div class="important">Important</div>
                </div>
            </div>
            <div class="projects">
                <div class="projects-header">Projects</div>
                <div class="projects-tabs"></div>
                <button class="add-project">Add Project</button>
            </div>
        </div>
        <div class="todo-work">
            <h1>All Tasks</h1>
        </div>
    `
}