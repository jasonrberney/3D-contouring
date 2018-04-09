import React, { Component } from 'react'
import MapboxIsolines from '../../components/MapboxMap/MapboxIsolines.jsx'
import MapboxIsobands from '../../components/MapboxMap/MapboxIsobands.jsx'

class MapContainer extends Component {
    render() {
        return (
            <MapboxIsobands />
        )
    }
}

export default MapContainer