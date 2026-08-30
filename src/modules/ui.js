import createProject from "./project.js";
import { state } from "./state.js";
import { createTodo } from "./todos.js";

document.addEventListener("DOMContentLoaded", () => {
const addProjectBtn = document.getElementById("add-project");
const addTodoBtn = document.querySelector(".add-todo");
const delProjectBtn = document.querySelectorAll(".del-project");
const todoList = document.getElementById("todo-list");
const project = document.querySelector(".project");
const projectModal = document.getElementById("project-modal");
const closeProjectModalBtn = document.getElementById("close-project-modal-btn");
const addProjectModalBtn = document.getElementById("add-project-modal-btn");
const projectTitle = document.querySelector("#project-title");
const asideContainer = document.getElementById("aside-container");
const todoForm = document.getElementById("todo-form")
const closeTodoFormBtn = document.querySelector(".close-todo-form");
const todoTitle = document.getElementById("todo-title");
const todoDescription = document.getElementById("todo-description");
const todoDueDate = document.getElementById("todo-due-date");
const submitTodoBtn = document.getElementById("submit-todo");
const prioritySelect = document.getElementById("priority-select");

  const renderProjects = () => {
        
    asideContainer.innerHTML = "";

    state.projects.forEach((project, index)=> {

        const selectedClass = state.selectedProject === project ? "selected" : "";
        asideContainer.innerHTML += `
        <div class="project-wrapper">
        <div class="project ${selectedClass}" data-index="${index}">
        <h3 class="project-name">${project.name}</h3>
        </div>  
        <button type="button" class="del-project" data-index="${index}">X</button>
        </div>
        `;
    });
    }

    const renderTodos = ()=> {
        todoList.innerHTML = "";

        if(!state.selectedProject) {
            return;
        }
        state.selectedProject.todos.forEach((todo, index) => {
            todoList.innerHTML += `
            <div class="todo">
            <h4>${todo.title}</h4>
            <p>${todo.description}</p>
            <p>Due: ${todo.dueDate}</p>
            <p>Priority: ${todo.priority}</p>
            <div class="todo-buttons">
            <button type="button" class="del-todo" data-index="${index}">Delete Todo</button>
            <button type="button" class="edit-todo" data-index="${index}">Edit Todo</button>
            </div>
            </div>
            `
        });
    }

addProjectBtn.addEventListener("click", ()=> {
    projectModal.style.display = "block";
});

closeProjectModalBtn.addEventListener("click", ()=> {
    projectModal.style.display = "none";
});

addProjectModalBtn.addEventListener("click", ()=> {

    
    if(projectTitle.value.trim() === ""){
        alert("Please enter a project title");
        return;
    }
    
    const newProject = createProject(projectTitle.value.trim());
    state.projects.push(newProject);

    projectModal.style.display = "none";
    projectTitle.value = "";

    renderProjects();

});
asideContainer.addEventListener("click", (e)=> {
    if(e.target.classList.contains("del-project")){
        const index = Number(e.target.dataset.index);
        state.projects.splice(index, 1);
        renderProjects();
        return;
    }

    const projectElement = e.target.closest(".project");

    if(projectElement){
        const index = Number(projectElement.dataset.index);
        state.selectedProject = state.projects[index];
        renderTodos();
    }
});

addTodoBtn.addEventListener("click", ()=> {

    todoForm.style.display = "flex";
    todoForm.style.flexDirection = "column";
});

closeTodoFormBtn.addEventListener("click", ()=> {
    todoForm.style.display = "none";
});

submitTodoBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    if(todoTitle.value.trim()=== ""){
        alert("Please enter a todo title");
        return;
    }
    if(todoDueDate.value.trim()=== ""){
        alert("Please enter a due date");
        return;
    }

    if(!state.selectedProject) {
        alert("Please select a project first");
        return;
    }
    const newTodo = createTodo(
        todoTitle.value.trim(),
        todoDescription.value.trim(),
        todoDueDate.value.trim(),
        prioritySelect.value
    );
    state.selectedProject.addTodo(newTodo);
    renderTodos();
});

});
