import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import config from '../../../../config/config';
import './Map.scss';

const { GOOGLE_MAPS_API_KEY_GITHUBBER } = config;
const INPUT_STYLE = {
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    border: '1px solid transparent',
    width: '60%',
    height: '28px',
    marginTop: '10px',
    padding: '0 12px',
    borderRadius: '1px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipses',
};

const MapWithASearchBox = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places,geometry,drawing&key=${GOOGLE_MAPS_API_KEY_GITHUBBER}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div />,
        mapElement: <div style={{ height: `70%` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}
            this.setState({
                bounds: null,
                center: {
                    lat: +this.props.lat, lng: +this.props.lng,
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                handleSubmitClick: () => {
                    if(this.state.places) {
                        this.props.submitMap(this.state.places[0].formatted_address);    
                    }
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = nextMarkers.length > 0 ? nextMarkers[0].position : this.state.center;
                    // get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        places,
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <div>
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={12}
            center={props.center}
            onBoundsChanged={props.onBoundsChanged}
        >
            <SearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={props.onPlacesChanged}
            >
                <input
                    type='text'
                    placeholder='search...'
                    style={INPUT_STYLE}
                />
            </SearchBox>
            {props.markers.map((marker, index) =>
                <Marker key={index} position={marker.position} />
            )}
        </GoogleMap>
        <div className='map-submit' onClick={props.handleSubmitClick}>Submit</div>
    </div>
);

export default MapWithASearchBox;
