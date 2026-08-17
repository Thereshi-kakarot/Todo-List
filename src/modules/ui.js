const addProjectBtn = document.getElementById("add-project");
const addTodoBtn = document.getElementById("add-todo");
const delProjectBtn = document.getElementById("del-project");
const container = document.getElementById("container");
const project = document.getElementById("project");
const projectModal = document.getElementById("project-modal");

addProjectBtn.addEventListener("click", ()=> {
    projectModal.style.display = "block";
});
