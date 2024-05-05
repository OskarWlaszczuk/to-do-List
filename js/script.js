{
    const tasks = [];

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const callEvents = () => {
        const toggleDoneStatusButton = document.querySelectorAll(".js-doneButton");
        toggleDoneStatusButton.forEach((toggleButton, taskIndex) => {
            toggleButton.addEventListener("click", () => {
                toggleDone(taskIndex);
            });
        });

        const removeTaskButton = document.querySelectorAll(".js-removeTaskButton");
        removeTaskButton.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="taskList__listItem ${task.done ? 'taskList__listItem--done' : ''}">
               <button class="tasksList__button tasksList__button--done js-doneButton">✔</button> ${task.content}<button class="tasksList__button js-removeTaskButton">X</button>
            </li>
            `};

        document.querySelector(".js-tasksList").innerHTML = htmlString;
        callEvents();
    };

    const pushNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent,
            },
        );

        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskField = document.querySelector(".js-inputNewTask");
        const newTaskContent = newTaskField.value.trim();

        if (newTaskContent !== "") {
            pushNewTask(newTaskContent);
        } else {
            newTaskField.focus();
        };
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("click", onFormSubmit);
    };

    init();
};