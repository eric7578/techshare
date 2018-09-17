import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import GeneralUsage from './GeneralUsage'
import CompoundComponent from './CompoundComponent'
import HigherOrderComponent from './HigherOrderComponent'
import RenderProps from './RenderProps'
import UsingContext from './UsingContext'

class ReactPatternDemo extends PureComponent {

  render () {
    return (
      <div>
        <h1>React Pattrerns</h1>

        <h2>General usage</h2>
        <GeneralUsage />
        <hr />

        <h2>Compound component</h2>
        <CompoundComponent />
        <hr />

        <h2>Higher order component</h2>
        <HigherOrderComponent />
        <hr />

        <h2>Render props</h2>
        <RenderProps />
        <hr />

        <h2>Using Context</h2>
        <UsingContext />
        <hr />
      </div>
    )
  }

}

ReactDOM.render(<ReactPatternDemo />, document.getElementById('root'))

registerServiceWorker()
