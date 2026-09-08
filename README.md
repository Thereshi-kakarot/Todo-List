# Todo-List

A responsive, modular Todo List application built with **HTML, CSS, and JavaScript**. The project allows users to organize tasks into projects, manage individual todos, set priorities and due dates, and edit or delete tasks.

This project was built as part of my journey to strengthen my JavaScript skills, particularly **DOM manipulation, modules, state management, event delegation, and object-oriented programming concepts**.

## Features

* Create and manage multiple projects
* Select projects to view their todos
* Create todos with:

  * Title
  * Description
  * Due date
  * Priority level
* Three priority levels:

  *  Low
  *  Medium
  *  High
* Priority-based todo styling
* Edit existing todos
* Delete todos
* Delete projects
* Display the currently selected project
* Form validation for required todo information
* Persistent application data using `localStorage`
* Modular JavaScript architecture
* Dynamic rendering of projects and todos
* Event delegation for dynamically generated todo and project buttons

## Technologies Used

* **HTML5** — Application structure
* **CSS3** — Styling and layout
* **JavaScript (ES6+)** — Application logic and DOM manipulation
* **Webpack** — Module bundling
* **Git & GitHub** — Version control
* **localStorage** — Persistent client-side data storage

## Project Structure

```text
todo-list/
│
├── src/
│   ├── modules/
│   │   ├── project.js
│   │   ├── todos.js
│   │   ├── state.js
│   │   ├── ui.js
│   │   └── localStorage.js
│   │
│   ├── index.js
│   └── template.html
│
├── package.json
├── package-lock.json
├── webpack.config.js
├── .gitignore
└── README.md
```

## How It Works

### Projects

Projects are created using a project factory function. Each project contains its own collection of todos.

```js
const createProject = (name) => {
    const todos = [];

    const addTodo = (todo) => {
        todos.push(todo);
    };

    const removeTodo = (todo) => {
        const index = todos.indexOf(todo);

        if (index !== -1) {
            todos.splice(index, 1);
        }
    };

    return {
        name,
        todos,
        addTodo,
        removeTodo
    };
};
```

### Todos

Each todo contains the information required to display and manage a task.

```js
export const createTodo = (
    title,
    description,
    dueDate,
    priority
) => {
    return {
        title,
        description,
        dueDate,
        priority,
        complete: false
    };
};
```

### Application State

The application uses a centralized state object to keep track of projects and the currently selected project.

```js
export const state = {
    projects: [],
    selectedProject: null,
    editingTodo: null
};
```

This makes it easier for different parts of the application to work with the same data.

## Priority System

Todos can have one of three priority levels:

```text
Low
Medium
High
```

The priority value is used to dynamically add a CSS class to each todo:

```js
<div class="todo ${todo.priority}">
```

This allows CSS to control the visual appearance:

```css
.todo.low {
    background-color: green;
}

.todo.medium {
    background-color: orange;
}

.todo.high {
    background-color: red;
}
```

This approach keeps the **JavaScript responsible for the data** and **CSS responsible for presentation**.

## Editing Todos

When a user clicks the edit button, the selected todo is stored in the application state:

```js
state.editingTodo = todo;
```

The existing values are then loaded into the form.

When the form is submitted, the application checks whether a todo is currently being edited.

If one exists, its properties are updated rather than creating a new todo.

```js
if (state.editingTodo) {
    state.editingTodo.title = todoTitle.value.trim();
    state.editingTodo.description = todoDescription.value.trim();
    state.editingTodo.dueDate = todoDueDate.value.trim();
    state.editingTodo.priority = prioritySelect.value;

    state.editingTodo = null;
}
```

Otherwise, a new todo is created and added to the selected project.

## Event Delegation

The application uses event delegation for dynamically generated elements.

Instead of adding an event listener to every todo button individually, the application listens for clicks on the todo list:

```js
todoList.addEventListener("click", (e) => {
    // Handle todo actions
});
```

This allows newly created todos to automatically work with the existing event listener.

## Data Persistence

The application uses the browser's `localStorage` API to persist project and todo data.

This means users can close or refresh the browser without immediately losing their projects and tasks.

Because JavaScript methods such as `addTodo()` cannot be stored in JSON, projects are recreated using the project factory when the saved data is loaded.

```js
const project = createProject(projectData.name);

projectData.todos.forEach(todo => {
    project.addTodo(todo);
});
```

This restores the project's functionality after loading.

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd todo-list
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local development URL provided by Webpack.

## Building for Production

To create a production build:

```bash
npm run build
```

The compiled files will be generated in the project's distribution directory.

## What I Learned

This project helped me practice and understand several important JavaScript concepts:

* JavaScript modules
* ES6 `import` and `export`
* Factory functions
* Objects and methods
* Arrays and array manipulation
* DOM manipulation
* Dynamic HTML generation
* Event listeners
* Event delegation
* Application state
* Conditional rendering
* Form handling and validation
* Data attributes
* `localStorage`
* JSON serialization and parsing
* Webpack
* Git and GitHub
* Separating application logic from UI rendering

One of the biggest lessons from this project was understanding the relationship between **state, data, and the DOM**.

The application keeps the data in JavaScript state and uses rendering functions to reflect that state in the user interface.

```text
User interaction
       ↓
Update state
       ↓
Save state
       ↓
Render UI
       ↓
User sees updated application
```

## Future Improvements

Some features I may add in future versions include:

* [ ] Mark todos as complete
* [ ] Add a completed/unfinished visual state
* [ ] Improve responsive design for mobile devices
* [ ] Add project editing
* [ ] Add todo search and filtering
* [ ] Sort todos by due date or priority
* [ ] Add confirmation before deleting projects or todos
* [ ] Improve accessibility
* [ ] Add animations and transitions
* [ ] Improve form UX
* [ ] Add a dark mode
* [ ] Improve error handling
* [ ] Deploy the application online

## Challenges

Some of the more challenging parts of the project included managing the relationship between projects and their todos, keeping the selected project synchronized with the UI, and making dynamically generated buttons work correctly.

Another challenge was implementing editing without accidentally creating a new todo. This required distinguishing between **creating a new todo** and **updating an existing todo** through application state.

Working through these problems helped me better understand how larger JavaScript applications manage data and user interactions.

## Author

**Johnny Ngoepe**

This project was created as a learning project while developing my JavaScript and front-end development skills.

---

## License

This project is open source and available for learning and personal use.
