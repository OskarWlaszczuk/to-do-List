{
    const tasks = [];


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
        const newTaskContent = newTaskField.value;

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