import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { pointGrid, interpolate, randomPoint, isobands } from '@turf/turf'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZm9mcTN1bzFjOGwycW1rOHM5Zm5zb2QifQ.qp5KX0tE4TGKh5AHo994IA'

class MapboxInterpolateIsobands extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const temps = require('../../data/texas_wdt_temps_points.json');

        var options = {gridType: 'point', property: 'temp', units: 'miles'};
        var cellsize = 10;
        var grid = interpolate(temps, cellsize, options);
        
        var breaks = [70, 73, 75, 77, 80, 83, 85, 87, 90, 93, 95, 97, 100];
        var newIsobands = isobands(grid, breaks, {zProperty: 'temp'});

        //addToMap
        var addToMap = [newIsobands];

        for (var i = 0; i < addToMap[0].features.length; i++) {
            let col = colorSelector(addToMap[0].features[i].properties.temp);
            addToMap[0].features[i].properties.color = col;
        }

        const mapboxMap = new mapboxgl.Map({
            container: this.mapContainer,
            minZoom: 1,
            zoom: 1,
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
              },
              layout: {},
              paint: {
                'line-color': ['get', 'color'],
                'line-width': 2,
                'line-opacity': .5,
              }
            })
          }) 
          
        mapboxMap.fitBounds([[
            //-70.823364, -33.553984
            // Lower Left (LNG, LAT)
            -107.076, 24.340
        ], [
            //-70.473175, -33.302986
            // Upper Right (LNG, LAT)
            -91.987, 38.617
        ]]);

        function colorSelector(temp) {
            let color = null;
            if (temp == "77-80") {
                color = '#0308fc'
            }
            else if (temp == "80-83") {
                color = '#0038ff'
            }
            else if (temp == "83-85") {
                color = '#0063ff'
            }
            else if (temp == "85-87") {
                color = '#009fff'
            }
            else if (temp == "87-90") {
                color = '#00d6ff'
            }
            else if (temp == "90-93") {
                color = '#00fffe'
            }
            else {
                color = '#00ffc8'
            }
            return color;
        }
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

export default MapboxInterpolateIsobands