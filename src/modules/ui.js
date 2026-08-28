import createProject from "./project.js";
import { state } from "./state.js";
import { createTodo } from "./todos.js";

document.addEventListener("DOMContentLoaded", () => {
const addProjectBtn = document.getElementById("add-project");
const addTodoBtn = document.querySelector(".add-todo");
const delProjectBtn = document.querySelectorAll(".del-project");
const container = document.getElementById("container");
const project = document.querySelector(".project");
const projectModal = document.getElementById("project-modal");
const closeProjectModalBtn = document.getElementById("close-project-modal-btn");
const addProjectModalBtn = document.getElementById("add-project-modal-btn");
const projectTitle = document.querySelector("#project-title");
const asideContainer = document.getElementById("aside-container");
const todoForm = document.getElementById("todo-form")
const closeTodoFormBtn = document.querySelector(".close-todo-form");

  const renderProjects = () => {
        
    asideContainer.innerHTML = "";
    state.projects.forEach((project, index)=> {
        asideContainer.innerHTML += `
        <div class="project-wrapper">
        <div class="project">
        <h3 class="project-name">${project.name}</h3>
        </div>  
        <button type="button" class="del-project" data-index="${index}">X</button>
        </div>
        `;
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
    }
});

addTodoBtn.addEventListener("click", ()=> {

    todoForm.style.display = "flex";
    todoForm.style.flexDirection = "column";
});

closeTodoFormBtn.addEventListener("click", ()=> {
    todoForm.style.display = "none";
});

});
