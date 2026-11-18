
// Load saved data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// HTML elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const goalForm = document.getElementById("goalForm");
const goalInput = document.getElementById("goalInput");
const goalList = document.getElementById("goalList");

// Save data
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("goals", JSON.stringify(goals));
}

// Update statistics
function updateStats() {
    const completed = tasks.filter(task => task.done).length;

    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent = completed;

    const percentage = tasks.length
        ? Math.round((completed / tasks.length) * 100)
        : 0;

    document.getElementById("progress").textContent = percentage + "%";
}

// Display tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        if (task.done) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        span.addEventListener("click", () => {
            task.done = !task.done;
            saveData();
            renderAll();
        });

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete";

        button.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveData();
            renderAll();
        });

        li.append(span, button);
        taskList.appendChild(li);
    });

    updateStats();
}

// Add tasks
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) return;

    tasks.push({
        id: Date.now() + Math.random(),
        text: text,
        done: false
    });

    taskInput.value = "";

    saveData();
    renderAll();
});

// Display goals
function renderGoals() {
    goalList.innerHTML = "";

    goals.forEach(goal => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = goal.text;

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete";

        button.addEventListener("click", () => {
            goals = goals.filter(item => item.id !== goal.id);
            saveData();
            renderAll();
        });

        li.append(span, button);
        goalList.appendChild(li);
    });
}

// Add goals
goalForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = goalInput.value.trim();

    if (!text) return;

    goals.push({
        id: Date.now() + Math.random(),
        text: text
    });

    goalInput.value = "";

    saveData();
    renderAll();
});

// Focus timer
let timeLeft = 25 * 60;
let timerInterval = null;

const display = document.getElementById("timerDisplay");

function showTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    display.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

document.getElementById("startTimer").addEventListener("click", () => {
    if (timerInterval !== null || timeLeft === 0) return;

    timerInterval = setInterval(() => {
        timeLeft--;
        showTime();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Focus session completed!");
        }
    }, 1000);
});

document.getElementById("pauseTimer").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById("resetTimer").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    showTime();
});

// Render everything
function renderAll() {
    renderTasks();
    renderGoals();
}

renderAll();
showTime();
