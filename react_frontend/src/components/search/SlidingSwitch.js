// NO LONGER USING THIS COMPONENT

import React, { Component } from 'react'
import './css/SlidingSwitch.css'
import PropTypes from 'prop-types'

class SlidingSwitch extends Component {
    static propTypes = {
        onCheckboxChange: PropTypes.func.isRequired,
        isChecked: PropTypes.bool.isRequired,
    }

    render() {
        return (
            <div className="switch-container">
                <input type="checkbox" id="switch" name={'tracksSelected'} checked={this.props.isChecked}
                       onChange={this.props.onCheckboxChange}/>
                <label htmlFor="switch" id="clickable-area"/>
                <div id="switch-handle"/>
                <div id="switch-color">
                    <p id="tracks" className="switch-text">Tracks</p>
                    <p id="albums" className="switch-text">Albums</p>
                </div>
            </div>
        )
    }
}

export default SlidingSwitch