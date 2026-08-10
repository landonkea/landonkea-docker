// "module.exports" makes the database connection URL available to other files in the project
module.exports = {
    // "mongoProdURI" stores the MongoDB connection string
    // "mongodb://" means we're connecting to a MongoDB database
    // "todo-database" is the hostname, in Docker, this refers to the "todo-database" container by name
    // ":27017" is the port MongoDB runs on (default MongoDB port)
    // "/todoapp" is the name of the database we want to use inside MongoDB
    mongoProdURI: 'mongodb://todo-database:27017/todoapp',
};
