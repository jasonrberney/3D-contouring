import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { pointGrid, interpolate, randomPoint } from '@turf/turf'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZm9mcTN1bzFjOGwycW1rOHM5Zm5zb2QifQ.qp5KX0tE4TGKh5AHo994IA'

class MapboxInterpolate extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

        var points = randomPoint(30, {bbox: [-107.352450, 25.536178, -92.850497, 36.831726]});

        // add a random property to each point
        points.features.forEach(function(point) {
            point.properties.solRad = Math.random() * 50;
        })

        var options = {gridType: 'points', property: 'solRad', units: 'miles'};
        var grid = interpolate(points, 100, options);
        
        //addToMap
        var addToMap = [grid];

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
              type:"circle",
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

export default MapboxInterpolate