import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { pointGrid, isolines } from '@turf/turf'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZm9mcTN1bzFjOGwycW1rOHM5Zm5zb2QifQ.qp5KX0tE4TGKh5AHo994IA'

class MapboxIsolines extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // create a grid of points with random z-values in their properties
        var extent = [0, 30, 20, 50];
        var cellWidth = 100;
        var newPointGrid = pointGrid(extent, cellWidth, {units: 'miles'});
        for (var i = 0; i < newPointGrid.features.length; i++) {
            newPointGrid.features[i].properties.temperature = Math.random() * 10;
        }
        var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        var newIsolines = isolines(newPointGrid, breaks, {zProperty: 'temperature'});
        
        //addToMap
        var addToMap = [newIsolines];

        const mapboxMap = new mapboxgl.Map({
            container: this.mapContainer,
            maxZoom: 7,
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

export default MapboxIsolines