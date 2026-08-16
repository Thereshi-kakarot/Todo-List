import './style.css'
import createProject from "./modules/project.js";
import { createTodo } from "./modules/todos.js";
import { state } from "./modules/state.js";

const projects = [];

const myProject = createProject('Default Project');
projects.push(myProject);

const todo = createTodo('Task 1', 'Description 1', '2023-12-31', 'High');

myProject.add(todo);
projects.push(myProject);
console.log(projects);