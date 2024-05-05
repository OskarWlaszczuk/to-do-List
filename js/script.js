{
    const tasks = [];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
                ${task.content}
            </li>
            `
        };
        document.querySelector(".js-tasksList").innerHTML = htmlString;
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