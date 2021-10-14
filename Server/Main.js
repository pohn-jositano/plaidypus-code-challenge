// Port for server to listen on
const PORT = 8081;

// Dependencies
let Express = require( 'express' );

// Routes
let ViewRouter = require( './Routes/ViewRouter' );

// Establish the server
let Server = Express();

// Add Routes
Server.use( ViewRouter ); 

// Start up the server
Server.listen(
  PORT,
  () => {
    console.log( `Plaidypus Code Challenge Server is listening on Port ${PORT}` );
  }
);