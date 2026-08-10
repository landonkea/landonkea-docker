// Load Express, we need it to create a router
const express = require('express');
// Load the Todo model, this lets us create, find, and delete tasks in the database
const Todo = require('./../models/Todo');

// "express.Router()" creates a router object, think of it as a mini-app that handles specific routes
const router = express.Router();

// Home page route
// "router.get('/')" handles GET requests to the home page (what happens when you visit localhost:3000/)
router.get('/', async (req, res) => {

    // "async/await" lets us wait for the database query to finish, "Todo.find()" fetches ALL tasks from MongoDB
    const todos = await Todo.find()
    // "res.render('todos')" tells Express to render the todos.ejs template file and send it to the browser
    res.render("todos", {
        // "tasks:" passes the list of todos to the template so it can display them on the page
        // If there are no todos, pass an empty object instead of undefined
        tasks: (Object.keys(todos).length > 0 ? todos : {})
    });
});

// POST - Submit Task
// "router.post('/')" handles POST requests, this runs when the user submits the "Add Task" form
router.post('/', (req, res) => {
    // Create a new Todo document with the task text from the form input named "task"
    const newTask = new Todo({
        // "req.body.task" gets the text the user typed into the form input field named "task"
        task: req.body.task
    });

    // ".save()" writes the new task to the MongoDB database
    newTask.save()
    // After saving successfully, redirect the user back to the home page to see their new task
    .then(task => res.redirect('/'))
    // If there's an error saving, log it to the console so you can see what went wrong
    .catch(err => console.log(err));
});

// POST - Destroy todo item
// "router.post('/todo/destroy')" handles POST requests to delete a specific task
router.post('/todo/destroy', async (req, res) => {
    // "req.body._key" gets the task's unique ID from the hidden form field
    const taskKey = req.body._key;
    // "findOneAndRemove" finds one task by its ID and deletes it from the database
    const err = await Todo.findOneAndRemove({_id: taskKey})
    // Redirect back to the home page so the deleted task disappears from the list
    res.redirect('/');
});


// "module.exports" makes this router available to other files, server.js imports it to use these routes
module.exports = router;
