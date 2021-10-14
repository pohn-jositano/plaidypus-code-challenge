import React from 'react';
import ReactDOM from 'react-dom';
import { TopBar } from './TopBar.js';
import { jXHR } from './Helpers.js';

class DetailPage extends React.Component {
  constructor ( Properties ) {
    super( Properties );
  
    this.state = {
      BusinessData: {}
    };
  
    setTimeout( this.GetBusinessData.bind( this ) );

    window._DetailPage = this;
  }

  GetBusinessData () {
    let BusinessID = location.href.split( '/' ).pop();
    jXHR( 'GET', `/yelp-data/business/${ BusinessID }` ).then( this.ProcessBusinessData.bind( this ) );
  }

  ProcessBusinessData ( BusinessData ) {
    this.setState( { BusinessData } );
  }

  GetDetailPage () {
    let BusinessData = this.state.BusinessData;

    return <div className="detail-row">
      <table className="business-detail-area border">
        <tr>
          <td colspan="4" className="business-detail-area-title border">{ BusinessData.name }</td>
        </tr>
        <tr>
          <td rowspan="3" className="border business-detail-area-images">
            <div className="business-detail-area-image-holder">
              { BusinessData.photos ? BusinessData.photos.map( ImageURL => <img src={ ImageURL } className="business-detail-area-image" /> ) : [] }
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>                        
      </table>
    </div>;
  }

  render () {
    return [
      <TopBar />,
      this.GetDetailPage()
    ];
  }
}

ReactDOM.render( <DetailPage />, document.querySelector( '#detail-page' ) );