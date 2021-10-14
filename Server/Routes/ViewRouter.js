// Dependencies
let Express = require( 'express' );
let Path = require( 'path' );
let ServeStatic = require( 'serve-static' );

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

// Scripts
ViewRouter.use( '/scripts/', ServeStatic( Path.resolve( __dirname, '../../Scripts/Distributable' ) ) );

// Styles
ViewRouter.use( '/styles', ServeStatic( Path.resolve( __dirname, '../../Styles' ) ) );

// Export ViewRouter
module.exports = ViewRouter;