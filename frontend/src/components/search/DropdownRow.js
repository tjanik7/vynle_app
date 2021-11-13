import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import './css/DropdownRow.css'
import { updateSelection } from '../../actions/spotifySearch'

class DropdownRow extends Component {
    static propTypes = {
        media: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        dataKey: PropTypes.string.isRequired,
        updateSelection: PropTypes.func.isRequired,
    }

    onClickHandler = e => {
        const key = this.props.dataKey
        this.props.updateSelection(key)
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

const mapStateToProps = state => ({})

export default connect(mapStateToProps,
    {
        updateSelection
    }
)(DropdownRow)