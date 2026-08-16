const createProject = (name) => {

    const todos = [];

    const addTodo = (todo) => {
        todos.push(todo);
    }
    const removeTodo = (todo) => {
        const index = todos.indexOf(todo);
        if(index !== -1){
            todos.splice(index, 1)
        }
    }
    return {
        name,
        todos,
        addTodo,
        removeTodo
    }
}

export default createProject;
