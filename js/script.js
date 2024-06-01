{
    let tasks = [];

    let hideDoneTasks = false;

    const removeTask = removeTaskIndex => {
        tasks = [
            ...tasks.slice(0, removeTaskIndex),
            ...tasks.slice(removeTaskIndex + 1),
        ];
        render();
    };

    const toggleDone = toggleDoneIndex => {
        tasks = tasks.map((task, index) =>
            index === toggleDoneIndex ?
                { ...task, done: !task.done } :
                task
        );
        render();
    };

    const callToggleDoneEvents = () => {
        const toggleDoneStatusButton = document.querySelectorAll(".js-doneButton");
        toggleDoneStatusButton.forEach((toggleDoneButton, toggleDoneIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleDone(toggleDoneIndex);
            });
        });
    };

    const callRemoveTaskEvent = () => {
        const removeTaskButton = document.querySelectorAll(".js-removeTaskButton");
        removeTaskButton.forEach((removeButton, removeTaskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(removeTaskIndex);
            });
        });
    };

    const renderTasks = () => {
        let htmlStringOfTaskListItem = "";
        for (const task of tasks) {
            htmlStringOfTaskListItem += ` 
            <li class="js-taskListItem taskList__listItem ${hideDoneTasks && task.done ? 'taskList__listItem--hidden' : ''}"> 
                <button class="tasksList__button tasksList__button--done js-doneButton">${task.done ? "✔" : ""}</button>
                <p class="taskList__taskContent ${task.done ? 'taskList__taskContent--done' : ''}">${task.content}</p>
                <button class="tasksList__button js-removeTaskButton">X</button>
            </li>
            `};
        document.querySelector(".js-tasksList").innerHTML = htmlStringOfTaskListItem;
    };

    const renderButtons = () => {
        let managmentButtonsHtmlString = `
        <button class=" js-toggleDonedTasksVisibility
        ${tasks.length > 0 ? 'taskList__managementTasksButton--visibly' : 'taskList__managementTasksButton'}">
            ${hideDoneTasks ? 'Pokaż' : 'Ukryj'} ukończone
        </button>
        <button ${tasks.every(({ done }) => done) ? 'disabled' : ''} class="js-doneAllTasksButton
        ${tasks.length > 0 ? 'taskList__managementTasksButton--visibly' : 'taskList__managementTasksButton'}">
            Ukończ wszystkie
        </button>
        `;
        document.querySelector(".js-tasksListButtonContainer").innerHTML = managmentButtonsHtmlString;
    };

    const toggleVisibilityOfDonedTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        if (hideDoneTasks && tasks.every(({ done }) => !done)) {
            hideDoneTasks = false;
        };
        render();
    };

    const toggleAllTaskDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true
        }));
        render();
    };

    const callButtonsEvents = () => {
        const toggleVisibilityOfDonedTasksButton = document.querySelector(".js-toggleDonedTasksVisibility");

        const toggleAllTasksButton = document.querySelector(".js-doneAllTasksButton");

        if (tasks.length > 0) {
            toggleAllTasksButton.addEventListener("click", toggleAllTaskDone);
            toggleVisibilityOfDonedTasksButton.addEventListener("click", toggleVisibilityOfDonedTasks);
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();

        callRemoveTaskEvent();
        callToggleDoneEvents();
        callButtonsEvents();
    };

    const updateTasks = newTaskContent => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            },
        ];

        render();
    };

    const onFormSubmit = event => {
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