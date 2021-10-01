//selectors
const todoName = document.querySelector(".todoNameInput");
const todoDescription = document.querySelector(".tododiscriptionInput");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const select = document.querySelector(".filter-todo");

//Functons

let addTodo = (event) => {
  event.preventDefault();

  //making todo div
  let data = `<div class="todo">
  <div class="text">
    <h2 id="name">${todoName.value}<h2>
    <li id="description">${todoDescription.value}</li>
  </div>
  <div class="todo-buttons">
  <button class="completed-btn">complete</button>
  <button class="trash-btn">delete</button>
  </div>
  </div>`;

  if (todoName.value != "") {
    todoList.insertAdjacentHTML("afterbegin", data);
    document.querySelector("#form").style.borderRadius = "50px 50px 0 0";

    // to make select.value = all;
    select.value = "all";

    // geting buttons
    const checkBtn = document.querySelector(".completed-btn");
    const trashBtn = document.querySelector(".trash-btn");
    const todo = document.querySelector(".todo");

    // for complete the todo Event Listner
    checkBtn.addEventListener("click", () => {
      todo.classList.toggle("completed");

      // To change innertext of checked button
      if (todo.classList.contains("completed")) {
        checkBtn.innerText = "Uncompleted";
      } else {
        checkBtn.innerText = "Completed";
      }
    });

    // for trash Event Listner
    trashBtn.addEventListener("click", () => {
      todo.classList.add("fall");

      setTimeout(() => {
        todo.remove();

        if (todoList.children.length == 0) {
          // to rounding the corners of form div if todo are zero
          document.querySelector("#form").style.borderRadius = "50px";
        } else {
          //for rounding corners to todo
          todoList.children[todoList.children.length - 1].classList.add(
            "curve"
          );
        }
      }, 500);
    });

    //for rounding corners to todo
    todoList.children[todoList.children.length - 1].classList.add("curve");
  }

  //clear todo-input value
  todoName.value = "";
  todoDescription.value = "";
  todoName.focus();
};

//flter Todo
function filterTodo() {
  // geting all todo list
  const todo = document.querySelectorAll(".todo");

  switch (select.value) {
    case "completed":
      todo.forEach((element) => {
        if (!element.classList.contains("completed")) {
          element.style.display = "none";
        } else {
          element.style.display = "flex";

          // //for rounding corners to todo
          // element.lastChild.classList.add("curve")
        }
      });

      break;

    case "uncompleted":
      todo.forEach((element) => {
        if (element.classList.contains("completed")) {
          element.style.display = "none";
        } else {
          element.style.display = "flex";
        }
      });

      break;

    default:
      todo.forEach((element) => {
        element.style.display = "flex";
      });

      break;
  }
}

//Event Listners
todoButton.addEventListener("click", addTodo);
todoButton.addEventListener("click", filterTodo);
select.addEventListener("change", filterTodo);

// for media-query
function myFunction(x) {
  if (x.matches) {
    // If media query matches
    todoButton.innerHTML = "&#43;";
  } else {
    todoButton.innerText = "Add Todo";
  }
}

let x = window.matchMedia("(max-width: 800px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes
