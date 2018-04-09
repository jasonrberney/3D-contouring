import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { pointGrid, isobands } from '@turf/turf'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25yYmVybmV5IiwiYSI6ImNqZm9mcTN1bzFjOGwycW1rOHM5Zm5zb2QifQ.qp5KX0tE4TGKh5AHo994IA'

class MapboxIsobands extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // Bounding box: [Lower Left (LNG, LAT), Upper Right (LNG, LAT)]
        var extent = [-107.352450, 25.536178, -92.850497, 36.831726];
        var cellSize = 80;
        var grid = pointGrid(extent, cellSize);
        // add a random property to each point between 0 and 60
        for (var i = 0; i < grid.features.length; i++) {
            let elev = (Math.random() * 60);
            grid.features[i].properties.elevation = elev;
        }

        //theMatrix = gridToMatrix(grid);

        var breaks = [0, 10, 20, 30, 40, 50, 60];
        var newIsobands = isobands(grid, breaks, {zProperty: 'elevation', commonProperties: {color: 'color'}});

        //addToMap
        var addToMap = [newIsobands];

        for (var i = 0; i < addToMap[0].features.length; i++) {
            let col = colorSelector(addToMap[0].features[i].properties.elevation);
            addToMap[0].features[i].properties.color = col;
        }

        const mapboxMap = new mapboxgl.Map({
            container: this.mapContainer,
            //maxZoom: 7,
            minZoom: 1,
            zoom: 1,
            //center: [-99.4265, 31.8274],
            style: `mapbox://styles/mapbox/dark-v9`,
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

        function colorSelector(temp) {
            let color = null;
            if (temp == "0-10") {
                color = '#0308fc'
            }
            else if (temp == "10-20") {
                color = '#0038ff'
            }
            else if (temp == "20-30") {
                color = '#0063ff'
            }
            else if (temp == "30-40") {
                color = '#009fff'
            }
            else if (temp == "40-50") {
                color = '#00d6ff'
            }
            else if (temp == "50-60") {
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

export default MapboxIsobands