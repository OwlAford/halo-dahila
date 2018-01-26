import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

export default function WithToast (Component) {
  @observer
  class WithToastHandler extends Component {
    @observable showToast = false
    @observable toastMesg = ''

    @action
    showMessage (msg, delay) {
      this.showToast = true
      this.toastMesg = msg
      clearTimeout(this.msgTimer)
      this.msgTimer = setTimeout(() => {
        this.showToast = false
        clearTimeout(this.msgTimer)
      }, delay || 3000)
    }
  }
  return WithToastHandler
}
