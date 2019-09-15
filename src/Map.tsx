import React, { Component } from "react";
import ReactMapGL from "react-map-gl";

export default class Map extends Component{
    state = {
        viewport: {
            latitude: 48.452388799999994,
            longitude: -3.9558419999999996,
            width: "100vw",
            height: "100vh",
            zoom: 10
        }
    }

    render() {
        const { viewport } = this.state
        return (
            <div>
                <ReactMapGL
                    {... this.state}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/outdoors-v11"
                    width={viewport.width}
                    height={viewport.height}
                    latitude={viewport.latitude}
                    longitude={viewport.longitude}
                    zoom={viewport.zoom}
                    onViewportChange={(viewport) => this.setState({viewport})}
                />
            </div>
        );
    }
}
