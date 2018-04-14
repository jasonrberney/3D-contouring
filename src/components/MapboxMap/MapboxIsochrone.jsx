import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { pointGrid, isobands } from '@turf/turf'
import isochrone from '../../mapbox-isochrone/isochrone.js'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZm9mcTN1bzFjOGwycW1rOHM5Zm5zb2QifQ.qp5KX0tE4TGKh5AHo994IA'

class MapboxIsobands extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const isochrone = require('../../mapbox-isochrone/isochrone.js');
        // Bounding box: [Lower Left (LNG, LAT), Upper Right (LNG, LAT)]
        var extent = [-107.352450, 25.536178, -92.850497, 36.831726];
        var cellSize = 80;

        var point = [-97.309341, 32.768799]
        var threshold = [600, 1200, 1800]
        var options = {
            "token":'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZm9mcTN1bzFjOGwycW1rOHM5Zm5zb2QifQ.qp5KX0tE4TGKh5AHo994IA',
            "threshold":threshold
        }

        var mapboxIsochrone = isochrone(point, options);

        const mapboxMap = new mapboxgl.Map({
            container: this.mapContainer,
            //maxZoom: 7,
            minZoom: 1,
            zoom: 1,
            //center: [-99.4265, 31.8274],
            style: `mapbox://styles/mapbox/light-v9`,
            hash: false
        });    

        mapboxMap.on('load', function(){
            mapboxMap.addLayer({
              id: "test",
              type:"line",
              source: {
                type: "geojson",
                data: addToMap[0]
              }
            })
          }) 
          
        mapboxMap.fitBounds([[
            //-70.823364, -33.553984
            // Lower Left (LNG, LAT)
            -107.352450, 25.536178
        ], [
            //-70.473175, -33.302986
            // Upper Right (LNG, LAT)
            -92.850497, 36.831726
        ]]);

    }

    render() {
        const style = {
            position: 'absolute',
            top: '1%',
            bottom: '1%',
            width: '99%',
        };

        return (
            <div>
                <div ref={el => this.mapContainer = el}  style={style}>
                </div>
            </div>
        )
    }
}

export default MapboxIsobands