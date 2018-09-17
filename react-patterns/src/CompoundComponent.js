import React, { PureComponent } from 'react'
import now from './now'
import TimeDisplay from './TimeDisplay'

class GetTime extends PureComponent {

  state = {
    currentTime: now()
  }

  onSwitchTime = () => {
    this.setState({
      currentTime: now()
    })
  }

  render () {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        currentTime: this.state.currentTime,
        getTime: this.onSwitchTime
      })
    )

    return <div>{children}</div>
  }
}

export default class CompoundComponent extends PureComponent {

  render () {
    return (
      <GetTime>
        <TimeDisplay />
      </GetTime>
    )
  }

}