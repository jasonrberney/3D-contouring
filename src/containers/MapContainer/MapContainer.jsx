import React, { Component } from 'react'
import MapboxIsolines from '../../components/MapboxMap/MapboxIsolines.jsx'
import MapboxIsobands from '../../components/MapboxMap/MapboxIsobands.jsx'
import MapboxInterpolate from '../../components/MapboxMap/MapboxInterpolate.jsx'
import MapboxInterpolateIsobands from '../../components/MapboxMap/MapboxInterpolateIsobands.jsx'
import MapboxIsochrone from '../../components/MapboxMap/MapboxIsochrone.jsx'

class MapContainer extends Component {
    render() {
        return (
            <MapboxIsochrone />
        )
    }
}

export default MapContainer