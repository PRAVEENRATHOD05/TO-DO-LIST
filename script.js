document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from local storage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => addTodoToList(todo));

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTodoText = todoInput.value.trim();
        if (newTodoText) {
            const newTodo = { text: newTodoText, completed: false };
            addTodoToList(newTodo);
            saveTodoToLocalStorage(newTodo);
            todoInput.value = '';
        }
    });

    function addTodoToList(todo) {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${todo.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="complete-btn">${todo.completed ? 'Uncomplete' : 'Complete'}</button>
            <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(li);

        li.querySelector('.edit-btn').addEventListener('click', () => {
            const newTodoText = prompt('Edit your task:', todo.text);
            if (newTodoText) {
                todo.text = newTodoText;
                li.querySelector('span').textContent = newTodoText;
                updateLocalStorage();
            }
        });

        li.querySelector('.complete-btn').addEventListener('click', () => {
            todo.completed = !todo.completed;
            li.classList.toggle('completed');
            li.querySelector('.complete-btn').textContent = todo.completed ? 'Uncomplete' : 'Complete';
            updateLocalStorage();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            todoList.removeChild(li);
            removeTodoFromLocalStorage(todo);
        });
    }

    function saveTodoToLocalStorage(todo) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateLocalStorage() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            const text = li.querySelector('span').textContent;
            const completed = li.classList.contains('completed');
            todos.push({ text, completed });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeTodoFromLocalStorage(todoToRemove) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.text !== todoToRemove.text);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
