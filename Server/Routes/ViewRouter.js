// Dependencies
let Express = require( 'express' );
let Path = require( 'path' );

// Establish ViewRouter
let ViewRouter = Express.Router();

// Main Dashboard
ViewRouter.get( 
  '/',  
  ( Req, Res, Next ) => {
    Res.sendFile( Path.resolve( __dirname, '../../Views/MainDashboard.html' ) );
  }
);

// Detail Page
ViewRouter.get( 
  '/detail-page/:business',  
  ( Req, Res, Next ) => {
    Res.sendFile( Path.resolve( __dirname, '../../Views/DetailPage.html' ) );
  }
);

// Export ViewRouter
module.exports = ViewRouter;