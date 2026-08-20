// 1. Select Elements 
const addTaskBtn = document.getElementById('add-task-btn');
const modal = document.getElementById('todo-modal');
const submitBtn = document.getElementById('submit-todo');
const cancelBtn = document.getElementById('cancel-todo');
const todoInput = document.getElementById('todo-input');
const todoStatus = document.getElementById('todo-status');
const todoList = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');
const filterSelect = document.getElementById('filter-todo');
const modalTitle = document.getElementById('modal-title');


let editingItem = null;
const STORAGE_KEY = 'todo-items';

// 2. Open Modal 
addTaskBtn.addEventListener('click', () => {
    openModalForCreate();
});


// 3. Close Modal 
cancelBtn.addEventListener('click', () => {
    closeModal();
});


function closeModal() {
    modal.style.display = 'none';
    todoInput.value = ''; // Clear input 
    todoStatus.value = 'incomplete';
    editingItem = null;
    modalTitle.textContent = 'Add TODO';
    submitBtn.textContent = 'Add Task';
}


function openModalForCreate() {
    editingItem = null;
    modalTitle.textContent = 'Add TODO';
    submitBtn.textContent = 'Add Task';
    modal.style.display = 'flex'; todoInput.focus();
}


function openModalForEdit(item) {
    editingItem = item;
    modalTitle.textContent = 'Update TODO';
    submitBtn.textContent = 'Update Task';
    todoInput.value = item.querySelector('.todo-text').textContent;
    todoStatus.value = item.dataset.status || 'incomplete'; modal.style.display = 'flex';
    todoInput.focus();
}


// 4. Add Task Logic 
submitBtn.addEventListener('click', () => {
    const taskValue = todoInput.value.trim();
    if (taskValue !== "") {
        if (editingItem) {
            const statusValue = todoStatus.value;
            const checkbox = editingItem.querySelector('.todo-check');
            editingItem.querySelector('.todo-text').textContent = taskValue;
            editingItem.dataset.status = statusValue;
            editingItem.classList.toggle('completed', statusValue === 'completed');
            checkbox.checked = statusValue === 'completed';
            saveTodos();
        } else {
            const statusValue = todoStatus.value;
            const createdAt = new Date();
            const li = buildTodoItem({
                text: taskValue,
                status: statusValue,
                createdAt: createdAt.toISOString()
            });

            todoList.appendChild(li);

            saveTodos();
        }

        closeModal();
        applyFilter();

    } else {

        alert("Please enter a task name!");
    }
});


// 5. Filtering 
filterSelect.addEventListener('change', () => {
    applyFilter();
});

function applyFilter() {
    const filterValue = filterSelect.value;
    const items = Array.from(todoList.children);
    let visibleCount = 0;

    items.forEach((item) => {
        const status = item.dataset.status || 'incomplete';
        const isVisible = filterValue === 'all' || (filterValue === 'completed' && status === 'completed') || (filterValue === 'incomplete' && status === 'incomplete');

        item.style.display = isVisible ? 'flex' : 'none';

        if (isVisible) visibleCount += 1;
    });

    emptyMessage.style.display = visibleCount === 0 ? 'block' : 'none';
}


function formatTimestamp(date) {
    return date.toLocaleString([], {

        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}


function buildTodoItem({ text, status, createdAt }) {
    const li = document.createElement('li');

    li.className = 'todo-item';
    li.dataset.status = status;
    li.dataset.createdAt = createdAt;
    if (status === 'completed') {
        li.classList.add('completed');

    }
    li.innerHTML = `
    
    <div class="todo-left"> 
    <input class="todo-check" type="checkbox" ${status === 'completed' ? 'checked' : ''}> 
    <div class="todo-info"> 

    <span class="todo-text">
    </span> <div class="todo-meta">
    
    </div> 
    </div> 
    </div> 
    <div class="todo-actions"> 
    <button class="icon-btn edit-btn" title="Edit" aria-label="Edit todo">
     <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/> <path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/> </svg> </button> <button class="icon-btn delete-btn" title="Delete" aria-label="Delete todo"> <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M6 7h12l-1 14H7L6 7z"/> <path d="M9 4h6l1 2H8l1-2z"/>
     
     </svg> 
     </button> 
     </div> `

    li.querySelector('.todo-text').textContent = text;
    li.querySelector('.todo-meta').textContent = formatTimestamp(new Date(createdAt));

    const checkbox = li.querySelector('.todo-check');
    checkbox.addEventListener('change', () => {
        const isCompleted = checkbox.checked;
        li.dataset.status = isCompleted ? 'completed' : 'incomplete';

        li.classList.toggle('completed', isCompleted);

        saveTodos();
        applyFilter();

    });

    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        openModalForEdit(li);
    });
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove(); saveTodos(); applyFilter();

    });

    return li;
}


function saveTodos() {
    const items = Array.from(todoList.children).map((item) => ({
        text: item.querySelector('.todo-text').textContent,
        status: item.dataset.status || 'incomplete',
        createdAt: item.dataset.createdAt || new Date().toISOString()
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

} function loadTodos() {
    const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return; try {
        const items = JSON.parse(raw); if (!Array.isArray(items)) return; items.forEach((item) => {
            if (!item || !item.text) return; const li = buildTodoItem({
                text: item.text, status: item.status || 'incomplete',

                createdAt: item.createdAt || new Date().toISOString()


            });

            todoList.appendChild(li);

        });

    } catch (err) {

        // ignore invalid stored data 
    }
}


loadTodos();
applyFilter();