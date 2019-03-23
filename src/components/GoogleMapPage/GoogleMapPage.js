import React, { Component } from 'react';
import { connect } from 'react-redux';

class googleMap extends Component {

  state = {
    userLocation: {
      lat: 32,
      lng: 32,
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
    });
    this.userCircle !== null && this.userCircle.setMap(null)
    this.userCircle = new window.google.maps.Circle({
      map: this.map,
      radius: 1000,    // 10 miles in metres
      fillColor: '#AA0000'
    });
    this.userCircle.bindTo('center', this.userMarker, 'position');

    //creating the markers on the DOM, base on the Data from our data base.
    //creating the info window.
    //when marker is clicked the info window will show.  
    this.props.reduxState.parkReducer.forEach(park => {
      const newMarker = new window.google.maps.Marker({
        position: { lat: park.latitude, lng: park.longitudes },
        map: this.map,
      });

      let infoWindow = new window.google.maps.InfoWindow({
        content: `<h1>${park.info_window}</h1>
                  <img src=${park.img_url} alt='${park.info_window}' />`
      });

      newMarker.addListener('click', () => {
        infoWindow.open(this.map, newMarker)
        console.log(park.id)
        this.props.dispatch({type:'FETCH_PLAYERS_AROUND_PARK', payload: park.id})
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
          });
          this.userCircle !== null && this.userCircle.setMap(null)
          this.userCircle = new window.google.maps.Circle({
            map: this.map,
            radius: 1000,
            fillColor: '#AA0000'
          });
          this.userCircle.bindTo('center', this.userMarker, 'position');
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
      { timeout: 10000 }
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

    let userNameArray = null;
    this.props.reduxState.userLocationReducer.map(name => {
      return userNameArray = <li><p>{name}</p></li>

    })

    return (
      <main>
        <div id='map'>
        </div>
        <div>
          <h2>player list goes here</h2>
          <ul>
            {userNameArray}
          </ul>
        </div>
      </main>

    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(googleMap);
