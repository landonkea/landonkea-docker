// Load mongoose, we need it to define a database schema/model
const mongoose = require('mongoose');
// "Schema" is a shortcut, instead of typing "mongoose.Schema" every time, we can just type "Schema"
const Schema = mongoose.Schema;

// "new Schema" defines the structure of a Todo document, what fields it has and what data types they are
const TodoSchema = new Schema({
    // "task" is the field name for the task description text
    task: {
        // "type: String" means this field stores text (a string of characters)
        type: String,
        // "required: true" means every task MUST have a task description, it can't be empty
        required: true
    },
    // "created_at" stores the date and time when the task was created
    created_at: {
        // "type: Date" means this field stores a date/time value
        type: Date,
        // "default: Date.now()" automatically sets the creation time to the current moment when a new task is made
        default: Date.now()
    }
});

// "mongoose.model('todos', TodoSchema)" creates a model called "Todo" that maps to the "todos" collection in MongoDB
// "module.exports" makes this model available to other files, routes use it to interact with the database
module.exports = Todo = mongoose.model('todos', TodoSchema);
