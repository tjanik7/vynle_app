import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import './css/DropdownRow.css'
import { updateSelection, setSearchVisibility } from '../../actions/spotifySearch'

class DropdownRow extends Component {
    static propTypes = {
        media: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        updateSelection: PropTypes.func.isRequired,
        setSearchVisibility: PropTypes.func.isRequired,
        selectedIndex: PropTypes.number.isRequired,
    }

    onClickHandler = e => {
        this.props.updateSelection(this.props.dataKey)
        this.props.setSearchVisibility(false)
        this.props.clickFunction() // Arguments already configured in parent component
    }

    render() {
        return (
            <Fragment>
                <div className={'card media-card'} onClick={this.onClickHandler}>
                    <div className={'card-body'}>
                        <Row>
                            <Col className={'col-md-2'}>
                                <img src={this.props.img} alt={'Album art'} height={'50'} width={'auto'}/>
                            </Col>
                            <Col>
                                <h5 className={'card-title'}>{this.props.media}</h5>
                                <p className={'card-text'}>{this.props.artist}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    selectedIndex: state.spotifySearch.selectedIndex,
})

export default connect(mapStateToProps,
    {
        updateSelection,
        setSearchVisibility,
    }
)(DropdownRow)