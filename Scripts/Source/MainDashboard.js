import React from 'react';
import ReactDOM from 'react-dom';
import { TopBar } from './TopBar.js';
import { jXHR } from './Helpers.js';

class MainDashboard extends React.Component {
  constructor ( Properties ) {
    super( Properties );
  
    this.state = {
      CityData: []
    };
  
    setTimeout( this.GetCityData.bind( this ) );

    window._MainDashboard = this;
  }

  GetCityData () {
    jXHR( 'GET', '/yelp-data/city/Orlando' ).then( this.ProcessCityData.bind( this ) );
  }

  ProcessCityData ( CityData ) {
    this.setState( { CityData: CityData.businesses } );
  }

  GetRows () {
    return this.state.CityData.map(
      ( Business ) => {
        return <div className="row border">
          <table className="business">
            <tr>
              <th className="business-name" colspan="3">{ Business.name }</th>
              <td className="business-detail">
                <button className="business-detail-button" onClick={ this.GoToDetail.bind( this, Business ) }>View Detail</button>
              </td>
            </tr>
            <tr>
              <td rowspan="4" className="business-image-holder border">
                <img src={ Business.image_url } className="business-image" />
              </td>
              <td rowspan="2" className="business-column-1 border">Location: { Business.location.display_address.join( ' ' ) }</td>
              <td rowspan="2" className="business-column-2 border">Categories: { Business.categories.map( Category => Category.title ).join( ', ' ) }</td>
              <td rowspan="4" className="business-column-3 border">Rating: { Business.rating }</td>
            </tr>
            <tr>                         
            </tr>
            <tr>
              <td>Price: { Business.price }</td>
              <td></td>                        
            </tr>
            <tr>
              <td>{ Business.is_closed ? 'Closed' : 'Now Open' }</td>
              <td></td>                          
            </tr>                        
          </table>
        </div>;
      }
    );
  }

  GoToDetail ( Business ) {
    window.open( `/detail-page/${ Business.id }` );
  }

  render () {
    return [
      <TopBar />,
      this.GetRows()
    ];
  }
}

ReactDOM.render( <MainDashboard />, document.querySelector( '#main-dashboard' ) );