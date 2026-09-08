import createProject from "./project.js";
import { state } from "./state.js";

const saveState = () => {
    localStorage.setItem("todoState", JSON.stringify(state));
};

const loadState = () => {
    const savedState = localStorage.getItem("todoState");

    if(!savedState) {
        return;
    }

    const parsedState = JSON.parse(savedState);

    state.projects = parsedState.projects.map(projectData => {
        const project = createProject(projectData.name);

        projectData.todos.forEach(todo => {
            project.addTodo(todo);
        });
        return project;
    });
    state.selectedProject = null;
};

export { saveState, loadState };