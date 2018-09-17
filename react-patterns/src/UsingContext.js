import React, { PureComponent } from 'react'
import now from './now'
import TimeDisplay from './TimeDisplay'

const TimerContext = React.createContext({
  currentTime: now()
})

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
    const data = {
      currentTime: this.state.currentTime,
      getTime: this.onSwitchTime
    }
    return <TimerContext.Provider {...this.props} value={data} />
  }
}

class StillAnotherComponent extends PureComponent {
  render () {
    return (
      <div>
        <TimerContext.Consumer>
          {renderProps =>
            <TimeDisplay
              currentTime={renderProps.currentTime}
              getTime={renderProps.getTime}
            />
          }
        </TimerContext.Consumer>
      </div>
    )
  }
}

class AnotherComponent extends PureComponent {
  render () {
    return (
      <div>
        <StillAnotherComponent />
      </div>
    )
  }
}

export default class UsingContext extends PureComponent {
  render () {
    return (
      <GetTime>
        <AnotherComponent />
      </GetTime>
    )
  }
}