export function generateExample(){
    if(localStorage.getItem("isInitialized")){
        return;
    }

    const initialization = [
        {
            "todoItems": [
            {
                "title": "run",
                "description": "3 rings at medium tempo",
                "dueDate": "2025-07-14",
                "priority": "Low",
                "isDone": true,
                "isFavourite": false
            },
            {
                "title": "gym",
                "description": "make high intensity full body training",
                "dueDate": "2025-07-15",
                "priority": "Medium",
                "isDone": false,
                "isFavourite": true
            }
            ],
            "title": "sport"
        },
        {
            "todoItems": [
            {
                "title": "english",
                "description": "B1 level",
                "dueDate": "2025-12-30",
                "priority": "High",
                "isDone": false,
                "isFavourite": true
            }
            ],
            "title": "study"
        }
    ]

    localStorage.setItem("projects", JSON.stringify(initialization));

    localStorage.setItem("isInitialized", "true");
}
