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
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <button class="tasksList__button tasksList__button--done js-doneButton">${task.done ? "✔" : ""}</button> <li class="taskList__listItem ${task.done ? 'taskList__listItem--done' : ''}"> ${task.content}
            </li><button class="tasksList__button js-removeTaskButton">X</button>
            `};

        document.querySelector(".js-tasksList").innerHTML = htmlString;

    };

    const renderButtons = () => {
        let buttonsString = `
        <button class=" js-toggleDonedTasksVisibility
        ${tasks.length > 0 ?
                'taskList__managementTasksButton--visibly' : 'taskList__managementTasksButton'}">
               ${hideDoneTasks === false ?
                'Ukryj ukończone' :
                'Pokaż ukończone'
            }
        </button>

        <button
        ${tasks.every(({ done }) => done) ?
                'disabled' :
                ''}
        class="js-doneAllTasksButton
        ${tasks.length > 0 ?
                'taskList__managementTasksButton--visibly' : 'taskList__managementTasksButton'}">
            Ukończ wszystkie
        </button>
        `;

        document.querySelector(".js-tasksListButtonContainer").innerHTML = buttonsString;
    };

    const toggleVisibilityOfDonedTasks = () => {

        if (tasks.some(({ done }) => done === true)) {
            hideDoneTasks = true;
        } else {
            hideDoneTasks = false;
        };

        if (hideDoneTasks === true) {
            tasks = tasks.filter(({ done }) => done === false);
        } else {
            tasks = tasks.filter(task => task);
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
            toggleVisibilityOfDonedTasksButton.addEventListener("click", toggleVisibilityOfDonedTasks);
            toggleAllTasksButton.addEventListener("click", toggleAllTaskDone);
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