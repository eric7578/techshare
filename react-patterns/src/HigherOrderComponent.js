import React, { PureComponent } from 'react'
import now from './now'
import TimeDisplay from './TimeDisplay'

function connect (WrappedComponent) {
  return class GetTime extends PureComponent {

    state = {
      currentTime: now()
    }

    onSwitchTime = () => {
      this.setState({
        currentTime: now()
      })
    }

    render () {
      return (
        <WrappedComponent
          getTime={this.onSwitchTime}
          currentTime={this.state.currentTime}
        />
      )
    }

  }
}

export default connect(TimeDisplay)