import './styles/main.scss';


// import form input and list div

const form = document.getElementById("todo-form");
const input = document.getElementById('todo-input');
const todolist = document.getElementById('todo-list');


// create a indexDB
let db;
const request = window.indexedDB.open('todoDB', 1);
// request is event based which gonna return 3 thing success, error, upgradeneeded

// if error occur
request.addEventListener('error', function (event) {
    console.error('Error opening database:', event.target.errorCode);
})

// if success 
request.addEventListener('success', function (event) {
    // Now, assuming that the user allowed your request to create a database, and you've received a success event to trigger the success callback; What's next? The request here was generated with a call to indexedDB.open(), so request.result is an instance of IDBDatabase, and you definitely want to save that for later.  You can do that by assigning it to a variable, like db.  You can then use db to create transactions, which are the way you interact with the database.
    db = event.target.result; 
    console.log('success database:');
})

// if upgradeneeded 
request.addEventListener('upgradeneeded', function (event) {
    console.log('success database upg:');
    db = event.target.result;


    // create a object store for the databse;
    const objectStore = db.createObjectStore('todos', {keyPath: 'id', autoIncrement: true})
    objectStore.createIndex('task','task', {unique: false});
    objectStore.createIndex('complete','complete', {unique: false});

    
})




// form handler

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = { task: input.value, completed: false };
    addTodoToDB(newTodo);
    input.value = '';
})


// add todo function
function addTodoToDB(todo) {
    const transaction = db.transaction(['todos'], 'readwrite');
    const objectStore = transaction.objectStore('todos');
    const request = objectStore.add(todo);

    request.onsuccess = function() {
        console.log('addead todo')
        displayTodos();
    };

    request.onerror = function(event) {
        console.error('Add todo error:', event.target.errorCode);
    };
}


// get data to show
function displayTodos () {
    const transaction = db.transaction(['todos'], 'readonly');
    const objectStore = transaction.objectStore('todos');
    const request = objectStore.openCursor();

    request.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor){
            const li = document.createElement('li');
            li.textContent = cursor.value.task;
            todolist.appendChild(li);
            cursor.continue();
        }
    }

}