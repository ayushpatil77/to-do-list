let tasks = [];
const motivationalQuotes = [
    "The best way to get started is to quit talking and begin doing.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The future depends on what you do today.",
    "Push yourself, because no one else is going to do it for you.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you’re halfway there.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "Act as if what you do makes a difference. It does.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don’t be afraid to give up the good to go for the great.",
    "It’s not whether you get knocked down, it’s whether you get up.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Good things come to those who hustle.",
    "Everything you’ve ever wanted is on the other side of fear.",
    "Opportunities don’t happen, you create them.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "It’s going to be hard, but hard does not mean impossible.",
    "Don’t wait for opportunity. Create it.",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
    "The key to success is to focus on goals, not obstacles.",
    "Dream it. Believe it. Build it.",
    "Everything you can imagine is real.",
    "The only way to achieve the impossible is to believe it is possible.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "You don’t have to be great to start, but you have to start to be great."
];

// Set theme mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Display a random motivational quote
function displayQuote() {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById('quote-box').innerText = randomQuote;
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;

    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        value: taskValue,
        category: category,
        priority: priority,
        starred: false,
        recurring: false
    };

    tasks.push(task);
    taskInput.value = "";

    renderTasks();
}

// Render tasks with correct star button class
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    // First render starred tasks
    const starredTasks = tasks.filter(task => task.starred);
    starredTasks.forEach(task => createTaskElement(task, taskList));

    // Then render all other tasks
    const nonStarredTasks = tasks.filter(task => !task.starred);
    nonStarredTasks.forEach(task => createTaskElement(task, taskList));
}

// Create task element
function createTaskElement(task, taskList) {
    const li = document.createElement('li');
    li.classList.add(`${task.priority.toLowerCase()}-priority`);
    li.setAttribute("data-id", task.id); // Add data-id for task reference
    li.innerHTML = `
        <span>${task.value} <strong>(${task.category})</strong></span>
        <button class="starring-btn ${task.starred ? 'starred' : 'not-starred'}" onclick="starTask(${task.id})">⭐</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
}

// Delete task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Star task
function starTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.starred = !task.starred;

    // Toggle the star button class
    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    const starButton = taskElement.querySelector('.starring-btn');
    if (task.starred) {
        starButton.classList.add('starred');
        starButton.classList.remove('not-starred');
    } else {
        starButton.classList.add('not-starred');
        starButton.classList.remove('starred');
    }

    renderTasks();
}

// Run initially
displayQuote();
