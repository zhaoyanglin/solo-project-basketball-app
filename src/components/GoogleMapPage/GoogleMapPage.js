import React, { Component } from 'react';
import { connect } from 'react-redux';

class GoogleMap extends Component {

  state = {
    userLocation: {
      lat: 44.9780,
      lng: -93.2635,
    },
    loading: true,
  };

  map = null;
  userMarker = null;
  userCircle = null;
  componentDidMount() {

    this.props.dispatch({ type: 'FETCH_PARK' })
    this.getCurrentLocation()

  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loading && (prevState.loading !== this.state.loading)) {

      this.renderMap()
    }
  }

  renderMap = () => {
    this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDfpXkveXzoJrMUFvinLBBY9-D0s6sh_64&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    //creating the map on the DOM.
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: this.state.userLocation.lat, lng: this.state.userLocation.lng },
      zoom: 16
    });
    //when map loads, sets the inital user marker(current location) with 3000 radius.
    this.userMarker !== null && this.userMarker.setMap(null)
    this.userMarker = new window.google.maps.Marker({
      position: { lat: this.state.userLocation.lat, lng: this.state.userLocation.lng },
      map: this.map,
      animation: window.google.maps.Animation.BOUNCE,
      icon:'./icons/userIcon.png'
    });
    // this.userCircle !== null && this.userCircle.setMap(null)
    // this.userCircle = new window.google.maps.Circle({
    //   map: this.map,
    //   radius: 1000,
    //   fillColor: '#AA0000'
    // });
    // this.userCircle.bindTo('center', this.userMarker, 'position');

    //creating the markers on the DOM, base on the Data from our data base.
    //creating the info window.
    //when marker is clicked the info window will show.  
    this.props.reduxState.parkReducer.forEach(park => {
      const newMarker = new window.google.maps.Marker({
        position: { lat: park.latitude, lng: park.longitudes },
        map: this.map,
        icon: './icons/parkIcon.png'
      });

      let infoWindow = new window.google.maps.InfoWindow({
        content: `<h1>${park.park_name}</h1>
                  <p>${park.info_window}</p>
                  <img src=${park.img_url} alt='${park.info_window}' />
                  `
      });

      newMarker.addListener('click', () => {
        infoWindow.open(this.map, newMarker)
        console.log(park.id)
        this.props.dispatch({ type: 'FETCH_PLAYERS_AROUND_PARK', payload: park.id })
      });
    });
  }

  //Geolocation function, it gets my position and sets marker with a 3000 radius.
  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        if (window.google !== undefined) {
          this.userMarker !== null && this.userMarker.setMap(null)
          this.userMarker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: this.map,
            animation: window.google.maps.Animation.BOUNCE,
            icon: './icons/userIcon.png'
          });
          // this.userCircle !== null && this.userCircle.setMap(null)
          // this.userCircle = new window.google.maps.Circle({
          //   map: this.map,
          //   radius: 1000,
          //   fillColor: '#AA0000'
          // });
          // this.userCircle.bindTo('center', this.userMarker, 'position');
        }
        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false,
        }, () => {
          this.props.dispatch({ type: "UPDATE_USER_LOCATION", payload: this.state.userLocation })
        });
      },
      (er) => {
        console.log('this is the error', er);

        this.setState({ loading: false });
      },
      { timeout: 100000 }
    );
  }

  loadScript = (url) => {
    let index = window.document.getElementsByTagName("script")[0]
    let script = window.document.createElement('script')
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
  }

  // interval = setInterval(this.getCurrentLocation, 10000)

  render() {

    return (
      <main id='mainDiv'>
        <div id='map'>
        </div>
        <div id='playerList'>
          <h2>This park has this many players:</h2>
          <ul>
            {this.props.reduxState.userLocationReducer.map((name,i) => {
              return <li key={i}>{name}</li>
            })}
          </ul>
        </div>
      </main>

    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(GoogleMap);
