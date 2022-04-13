import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import "../css/local.css"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Main extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    center: {
      lat: 19.0760,
      lng: 72.8777
    },
    zoom: 11
  };

  
  render() {
    // console.log(this.props.center);
    return (
      // Important! Always set the container height explicitly
      <div className="my-map" style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCX3_rFzce7sD2gW_RzqVZnkcmKHBmf7kk" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Main;