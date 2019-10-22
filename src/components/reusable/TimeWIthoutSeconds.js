import React, {Component} from 'react'

function TimeWithoutSeconds(dateString) {
    const indexColon = dateString.lastIndexOf(":")
    const firstSub = dateString.substring(0, indexColon)
    const secondSub = dateString.substring(indexColon+3)
    return (firstSub+secondSub)

}

export default TimeWithoutSeconds