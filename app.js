let todos = [{ name: "hamda", id: 5 }];

function addTodo(item) {
  const todo = {
    name: item,
    id: Date.now(),
  };
  todos.push(todo);
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
}

function updateTodo(id, name) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.name = name;
    }
    return todo;
  });
}

function selectElement(selector) {
  const element = document.querySelector(`${selector}
`);

  // console.log(element);
  if (!element) return;

  return element;
}

const todoInput = selectElement(".todo-input");
const todoAddBtn = selectElement(".todo-add");
const todoContainer = selectElement(".todo-container");

const deleteTodo = selectElement(".delete-todo");
const deleteAll = selectElement(".clearAll");

function displayTodos(elements) {
  todoContainer.innerHTML = "";
  elements.forEach((item, index) => {
    const html = `
    <tr data-id=${item.id}>
    <th scope="row">${index + 1}</th>
    <td>${item.name}</td>
    <td>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-success update-todo">
          Update
        </button>
        <input
          type="text"
          class="form-control  update-inp isInvisible"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
    </td>
    <td>
      <button class="btn btn-danger delete-todo">Delete</button>
    </td>
  </tr>
    `;

    todoContainer.insertAdjacentHTML("beforeend", html);
  });
}

displayTodos(todos);

if (todos.length) deleteAll.classList.remove("hidding");
todoAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value.trim() === "") return;
  addTodo(todoInput.value);
  todoInput.value = "";
  displayTodos(todos);
  deleteAll.classList.remove("hidding");
  deleteAll.style.display = "inline-block";

});

// event delegation or event bubbling
todoContainer.addEventListener("click", (e) => {
  const element = e.target;
  const id = e.target.closest("tr").dataset.id;
  const inp = selectElement(`[data-id= '${id}'] .update-inp`);

  switch (element) {
    case element.closest(".delete-todo"):
      removeTodo(+id);
      displayTodos(todos);

      if (todos.length < 1) deleteAll.classList.add("hidding");

      break;
    case element.closest(".update-todo"):
      inp.classList.remove("isInvisible");
      element.textContent = "confirm";
      element.classList.add("confirm-todo");
      element.classList.remove("update-todo");
      break;
    case element.closest(".confirm-todo"):
      if (inp.value.trim() === "") break;
    case element.closest(".confirm-todo"):
      updateTodo(+id, inp.value);
      displayTodos(todos);
      break;

    default:
      return;
  }
});

deleteAll.addEventListener("click", (e) => {
  e.preventDefault();
  todos = [];
  displayTodos(todos);
  deleteAll.style.display = "none";
});
