(function () {
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(todo) {
    let item = document.createElement("li");

    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-id", todo.id);

    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    item.textContent = todo.name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function setDateLocalStorage(arrList, key) {
    localStorage.setItem(key, JSON.stringify(arrList));
  }

  function getDateLocalStorage(key) {
    let getCartDate = localStorage.getItem(key);
    let jsonToDate = JSON.parse(getCartDate);
    return jsonToDate;
  }

  function createTodoApp(container, title = "Список дел", listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.input.addEventListener("input", function () {
      if (todoItemForm.input.value !== "") {
        todoItemForm.button.disabled = false;
      } else {
        todoItemForm.button.disabled = true;
      }
    });
    let currentTasks = getDateLocalStorage(listName);

    for (let currentTask of currentTasks) {
      createTodoItem(currentTask);
    }

    let taskList = [];
    let counter = 1;
    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault();

      let task = {
        id: counter++,
        name: todoItemForm.input.value,
        done: false,
      };

      let todoItem = createTodoItem(task);

      taskList.push(task);

      setDateLocalStorage(taskList, listName);

      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");
        if (todoItem.item.classList.contains("list-group-item-success")) {
          task.done = true;
          setDateLocalStorage(taskList, listName);
        } else {
          task.done = false;
          setDateLocalStorage(taskList, listName);
        }
      });

      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          todoItem.item.remove();
          let index = taskList.findIndex((item) => item === task);
          taskList.splice(index, 1);
          setDateLocalStorage(taskList, listName);
        }
      });

      todoList.append(todoItem.item);

      todoItemForm.input.value = "";
      todoItemForm.button.disabled = true;
    });
  }

  window.createTodoApp = createTodoApp;
})();
