// "require" is like an import — it loads the mongoose library which lets us talk to MongoDB databases
const mongoose = require('mongoose');
// "body-parser" reads data submitted through web forms (like when you type a todo and click "Add")
const bodyParse = require('body-parser');
// "livereload" automatically refreshes the browser when you change code — saves you from manually hitting reload
const livereload = require('livereload');
// "connect-livereload" connects the livereload server to Express so it knows when to trigger a refresh
const connectLiveReload = require('connect-livereload');
// This creates an Express app — Express is a web framework that handles incoming requests and sends responses
const app = require('express')();
// "moment" makes it easy to format dates in a human-readable way (like "5 minutes ago")
const moment = require('moment');

// Live Reload configuration — this sets up a server that watches for file changes and tells the browser to refresh
// Live Reload configuration
// "livereload.createServer()" starts a small server that listens for code changes
const liveReloadServer = livereload.createServer();
// When a browser connects to the live reload server, wait a moment then refresh the page
liveReloadServer.server.once("connection", () => {
    // "setTimeout" waits 100 milliseconds before refreshing — gives the file time to finish saving
    setTimeout(() => {
        // "/" means refresh the entire page
        liveReloadServer.refresh("/");
    }, 100);
});

// Load the router file that handles all the page routes (like home page, add task, delete task)
// Fontend route
const FrontRouter = require('./routes/front');

// "view engine: ejs" tells Express to use EJS as its template engine — EJS lets you embed JavaScript inside HTML
app.set('view engine', 'ejs');

// This middleware intercepts responses from the server and injects the live-reload script into HTML pages
app.use(connectLiveReload())

// "bodyParse.urlencoded" reads form data from POST requests — so when someone submits the todo form, this parses it
app.use(bodyParse.urlencoded({ extended: false }));
// "app.locals.moment = moment" makes the moment library available inside EJS templates (for showing "5 minutes ago")
app.locals.moment = moment;

// Database connection
// "db" stores the MongoDB connection URL from our keys.js config file
const db = require('./config/keys').mongoProdURI;
// "mongoose.connect()" connects to the MongoDB database using the URL we provided
mongoose
    // "db" is the connection string pointing to the "todo-database" container
    .connect(db, { useNewUrlParser: true })
    // ".then()" runs when the connection succeeds — logs "Mongodb Connected" to the console
    .then(() => console.log(`Mongodb Connected`))
    // ".catch()" runs if there's an error connecting — logs the error so you can debug it
    .catch(error => console.log(error));


// "app.use(FrontRouter)" tells Express to use our router for handling all incoming requests
app.use(FrontRouter);


// "process.env.PORT || 3000" uses the PORT environment variable if set, otherwise defaults to port 3000
const PORT = process.env.PORT || 3000;
// "app.listen()" starts the server and waits for incoming web requests on the specified port
app.listen(PORT, () => {
    // This message prints when the server starts successfully, so you know it's running
    console.log(`Server listening on port ${PORT}`);
});
