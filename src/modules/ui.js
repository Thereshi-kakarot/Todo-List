import createProject from "./project.js";
import { state } from "./state.js";

document.addEventListener("DOMContentLoaded", () => {
const addProjectBtn = document.getElementById("add-project");
const addTodoBtn = document.getElementById("add-todo");
const delProjectBtn = document.querySelectorAll(".del-project");
const container = document.getElementById("container");
const project = document.querySelector(".project");
const projectModal = document.getElementById("project-modal");
const closeProjectModalBtn = document.getElementById("close-project-modal-btn");
const addProjectModalBtn = document.getElementById("add-project-modal-btn");
const projectTitle = document.querySelector("#project-title");
const asideContainer = document.getElementById("aside-container");



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

    asideContainer.innerHTML = "";
    state.projects.forEach((project, index)=> {
        asideContainer.innerHTML += `
        <div class="project-wrapper">
        <div class="project">
        <h3 class="project-name">${project.name}</h3>
        </div>  
        <button type="button" id="del-project" data-index="${index}">X</button>
        </div>
        `
    });
});
asideContainer.addEventListener("click", (e)=> {
    if(e.target.classList.contains("del-project")){
        const index = Number(e.target.dataset.index);
        state.projects.splice(index, 1);
        asideContainer.innerHTML = "";
    }
});


})
