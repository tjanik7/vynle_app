import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import './css/DropdownRow.css'

class DropdownRow extends Component {
    static propTypes = {
        media: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    }

    render() {
        return (
            <Fragment>
                <div className={'card test1'}>
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

export default DropdownRow