{
    let tasks = [];

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
        ];
        render();
    };

    const toggleDone = (taskIndex) => {
        tasks = tasks.map((task, index) =>
            index === taskIndex ? { ...task, done: !task.done } : task
        );
        render();
    };

    const callManagmantButtonsEvent = () => { };

    const callToggleDoneEvents = () => {
        const toggleDoneStatusButton = document.querySelectorAll(".js-doneButton");
        toggleDoneStatusButton.forEach((toggleButton, taskIndex) => {
            toggleButton.addEventListener("click", () => {
                toggleDone(taskIndex);
            });
        });
    };


    const callRemoveTaskEvents = () => {
        const removeTaskButton = document.querySelectorAll(".js-removeTaskButton");
        removeTaskButton.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const renderManagmentTasksButton = () => { };

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <button class="tasksList__button tasksList__button--done js-doneButton">${task.done ? "✔" : ""}</button> <li class="taskList__listItem ${task.done ? 'taskList__listItem--done' : ''}"> ${task.content}
            </li><button class="tasksList__button js-removeTaskButton">X</button>
            `};

        document.querySelector(".js-tasksList").innerHTML = htmlString;

    };

    const render = () => {
        renderTasks();
        renderManagmentTasksButton();

        callRemoveTaskEvents();
        callToggleDoneEvents();
        callManagmantButtonsEvent();
    };

    const updateTasks = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
            },
        ];

        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskField = document.querySelector(".js-inputNewTask");
        const newTaskContent = newTaskField.value.trim();

        if (newTaskContent !== "") {
            updateTasks(newTaskContent);
            newTaskField.value = "";
            newTaskField.focus();
        } else {
            newTaskField.focus();
        };
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
};