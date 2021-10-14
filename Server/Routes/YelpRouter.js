// Dependencies
let Express = require( 'express' );
let Path = require( 'path' );
let ServeStatic = require( 'serve-static' );

let HTTPS = require( 'https' );

async function GetCityData ( City, Offset ) {
  return new Promise(
    ( Succ, Fail ) => {
      let Chunks = [];
      let _Request = HTTPS
        .request(
          {
            hostname: 'api.yelp.com',
            port: 443,
            path: `/v3/businesses/search?location=${ City }` + ( Offset ? `&offset=${ Offset }` : '' ),
            method: 'GET',
            headers: {
              'Authorization': 'Bearer AmfsMdWYyn5MBfB3MzcLotC5JK9NYuOMz_NCyajJUSvt-pMX8cBFt27PMxq7Q9riKRF1wgaGsQOz12M6iTEBtqAByvqpkN5XLYInVmNra2raWDB7_D-Ff2E9d4ZoYXYx'
            }
          },
          ( Response ) => {
            Response.on( 'data', ( Chunk ) => { Chunks.push( Chunk.toString() ); } );
            Response.on( 'end', () => { Succ( Chunks.join(  '' ) ); } );
            Response.on( 'error', Fail );          
          }  
        );

      _Request.end()
      ;
    }    
  );  
}

async function GetBusinessDetailData ( BusinessID ) {
  return new Promise(
    ( Succ, Fail ) => {
      let Chunks = [];
      let _Request = HTTPS
        .request(
          {
            hostname: 'api.yelp.com',
            port: 443,
            path: `/v3/businesses/${ BusinessID }`,
            method: 'GET',
            headers: {
              'Authorization': 'Bearer AmfsMdWYyn5MBfB3MzcLotC5JK9NYuOMz_NCyajJUSvt-pMX8cBFt27PMxq7Q9riKRF1wgaGsQOz12M6iTEBtqAByvqpkN5XLYInVmNra2raWDB7_D-Ff2E9d4ZoYXYx'
            }
          },
          ( Response ) => {
            Response.on( 'data', ( Chunk ) => { Chunks.push( Chunk.toString() ); } );
            Response.on( 'end', () => { Succ( Chunks.join(  '' ) ); } );
            Response.on( 'error', Fail );          
          }  
        );

      _Request.end()
      ;
    }    
  );  
}

// Establish YelpRouter
let YelpRouter = Express.Router();

// Get Data for Businesses in the City
YelpRouter.get( 
  [
    '/yelp-data/city/:city',
    '/yelp-data/city/:city/:offset'
  ],
  async ( Req, Res, Next ) => {
    let CityData = await GetCityData( Req.params.city, Req.params.offset );
    Res.setHeader( 'Content-Type', 'application/json' );
    Res.send( CityData );
  }
);

// Get Data for Specific Businesses
YelpRouter.get(
  '/yelp-data/business/:businessId',
  async ( Req, Res, Next ) => {
    let BusinessData = await GetBusinessDetailData( Req.params.businessId );
    Res.setHeader( 'Content-Type', 'application/json' );
    Res.send( BusinessData );
  }
);

// Export YelpRouter
module.exports = YelpRouter;