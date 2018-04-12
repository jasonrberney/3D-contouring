import React, { Component } from 'react'
import MapboxIsolines from '../../components/MapboxMap/MapboxIsolines.jsx'
import MapboxIsobands from '../../components/MapboxMap/MapboxIsobands.jsx'
import MapboxInterpolate from '../../components/MapboxMap/MapboxInterpolate.jsx'
import MapboxInterpolateIsobands from '../../components/MapboxMap/MapboxInterpolateIsobands.jsx'

class MapContainer extends Component {
    render() {
        return (
            <MapboxInterpolateIsobands />
        )
    }
}

export default MapContainer