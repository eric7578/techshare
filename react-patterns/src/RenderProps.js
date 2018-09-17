import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import now from './now'
import TimeDisplay from './TimeDisplay'

class GetTime extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired
  }

  state = {
    currentTime: now()
  }

  onSwitchTime = () => {
    this.setState({
      currentTime: now()
    })
  }

  render () {
    return this.props.children({
      currentTime: this.state.currentTime,
      getTime: this.onSwitchTime
    })
  }

}

export default class RenderProps extends PureComponent {
  render () {
    return (
      <GetTime>
        {renderProps =>
          <TimeDisplay
            currentTime={renderProps.currentTime}
            getTime={renderProps.getTime}
          />
        }
      </GetTime>
    )
  }
}