import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RedColor = styled.p`
  color: red;
`

export default class TimeDisplay extends PureComponent {
  static propTypes = {
    getTime: PropTypes.func.isRequired,
    currentTime: PropTypes.string.isRequired
  }

  render () {
    return <RedColor onClick={this.props.getTime}>Current Time: {this.props.currentTime}</RedColor>
  }
}