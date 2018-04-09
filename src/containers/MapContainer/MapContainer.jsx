import React, { Component } from 'react'
import MapboxIsolines from '../../components/MapboxMap/MapboxIsolines.jsx'
import MapboxIsobands from '../../components/MapboxMap/MapboxIsobands.jsx'
import MapboxInterpolate from '../../components/MapboxMap/MapboxInterpolate.jsx'

class MapContainer extends Component {
    render() {
        return (
            <MapboxInterpolate />
        )
    }
}

export default MapContainer