import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { pointGrid, isobands } from '@turf/turf'
//import gridToMatrix from '@turf/turf'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZm9mcTN1bzFjOGwycW1rOHM5Zm5zb2QifQ.qp5KX0tE4TGKh5AHo994IA'

class MapboxIsobands extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
        var cellSize = 3;
        var grid = pointGrid(extent, cellSize);
        // add a random property to each point between 0 and 60
        for (var i = 0; i < grid.features.length; i++) {
          grid.features[i].properties.elevation = (Math.random() * 60);
        }

        //theMatrix = gridToMatrix(grid);

        var breaks = [0, 10, 20, 30, 40, 50, 60];
        var newIsobands = isobands(grid, breaks, {zProperty: 'elevation'});
        
        //addToMap
        var addToMap = [newIsobands];

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
              source: {
                type: "geojson",
                data: addToMap[0]
              },
              type:"line"
            })
          }) 
          
        mapboxMap.fitBounds([[
            -70.823364, -33.553984
        ], [
            -70.473175, -33.302986
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