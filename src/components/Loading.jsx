import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { waiter } from '~/libs/tools'

@observer
export default class Loaing extends React.Component {
  @observable showSpin = false

  @action
  async componentWillMount () {
    await waiter(this.props.delay || 300)
    this.showSpin = true
  }

  render () {
    const spin = () => (
      <div className='app-loading'>
        <div className='triangle' />
      </div>
    )

    return this.showSpin ? spin() : null
  }
}
