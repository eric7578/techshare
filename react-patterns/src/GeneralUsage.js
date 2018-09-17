import React, { PureComponent } from 'react'
import styled from 'styled-components'
import now from './now'

const RedColor = styled.p`
  color: red;
`

export default class GeneralUsage extends PureComponent {

  state = {
    currentTime: now()
  }

  onSwitchTime = e => {
    this.setState({
      currentTime: now()
    })
  }

  render () {
    return (
      <div onClick={this.onSwitchTime}>
        <RedColor>Current Time: {this.state.currentTime}</RedColor>
      </div>
    )
  }

}