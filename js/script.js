{
    let tasks = [];

    let hideDoneTasks = false;

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

        if (toggleVisibilityOfDonedTasksButton) {
            toggleVisibilityOfDonedTasksButton.addEventListener("click", toggleVisibilityOfDonedTasks);
        };

        if (toggleAllTasksButton) {
            toggleAllTasksButton.addEventListener("click", toggleAllTaskDone);
        };
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

    const removeTask = removeTaskIndex => {
        tasks = [
            ...tasks.slice(0, removeTaskIndex),
            ...tasks.slice(removeTaskIndex + 1),
        ];
        render();
    };

    const callRemoveTaskEvent = () => {
        const removeTaskButton = document.querySelectorAll(".js-removeTaskButton");
        removeTaskButton.forEach((removeButton, removeTaskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(removeTaskIndex);
            });
        });
    };

    const renderStats = () => {
        const htmlStringOfStats = `
        <p class="tasksList__statsItem ${tasks.length > 0 ? '' : 'tasksList__statsItem--hidden'}"> 
            Liczba wszystkich zadań: ${tasks.length}</p>
        <p class="tasksList__statsItem tasksList__statsItem--finishedTasks ${tasks.length > 0 ? '' : 'tasksList__statsItem--hidden'}">
            Liczba ukończonych zadań: 
            ${tasks.filter(({ done }) => done).length}
        </p>
        `;
        document.querySelector(".js-statsContainer").innerHTML = htmlStringOfStats;
    };

    const renderButtons = () => {
        let htmlStringOfManagmentButtons = "";
        if (tasks.length > 0) {
            htmlStringOfManagmentButtons += `
            <button class=" js-toggleDonedTasksVisibility
            ${tasks.length > 0 ? 'taskList__managementTasksButton--visibly' : 'taskList__managementTasksButton'}">
                ${hideDoneTasks ? 'Pokaż' : 'Ukryj'} ukończone
            </button>
            <button ${tasks.every(({ done }) => done) ? 'disabled' : ''} class="js-doneAllTasksButton
            ${tasks.length > 0 ? 'taskList__managementTasksButton--visibly' : 'taskList__managementTasksButton'}">
                Ukończ wszystkie
            </button>
            `;
            document.querySelector(".js-tasksListButtonContainer").innerHTML = htmlStringOfManagmentButtons;
        } else {
            document.querySelector(".js-tasksListButtonContainer").innerHTML = "";
        };
    };

    const renderTasks = () => {
        let htmlStringOfTaskListItem = "";
        for (const task of tasks) {
            htmlStringOfTaskListItem += ` 
            <li class="js-taskListItem taskList__listItem ${hideDoneTasks && task.done ? 'taskList__listItem--hidden' : ''}"> 
                <button class="tasksList__button tasksList__button--done js-doneButton">${task.done ? "✔" : ""}</button>
                <p class="taskList__taskContent ${task.done ? 'taskList__taskContent--done' : ''}">${task.content}</p>
                <button class="tasksList__button js-removeTaskButton">🗑️</button>
            </li>
            `};
        document.querySelector(".js-tasksList").innerHTML = htmlStringOfTaskListItem;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        renderStats();

        callRemoveTaskEvent();
        callToggleDoneEvents();
        callButtonsEvents();
    };

    const addNewTask = newTaskContent => {
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
            addNewTask(newTaskContent);
            newTaskField.value = "";
        };

        newTaskField.focus();
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
};