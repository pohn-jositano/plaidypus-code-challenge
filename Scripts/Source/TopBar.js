import React from 'react';
import ReactDOM from 'react-dom';

class TopBar extends React.Component {
  constructor ( Properties ) {
    super( Properties );
  }

  GetBreadCrumbs () {
    let BreadCrumbs = [ <span className="breadcrumb">Main Dashboard</span> ];
    let Pieces = location.pathname.split( '/' ).filter( Piece => Piece != '' );

    return BreadCrumbs.concat( 
      Pieces.map( 
        ( Piece ) => {
          let SubPieces = Piece.split( '-' );
          let PieceLength = SubPieces.length;

          return <span className="breadcrumb">{ PieceLength ? SubPieces.map( SubPiece => SubPiece.replace( /[a-z]/, Letter => Letter.toUpperCase() ) ) : Piece }</span>; 
        } 
      ) 
    );
  }

  render () {
    return <div id="top-bar" className="border">
      { this.GetBreadCrumbs() }
    </div>;
  }
}

export { TopBar };