import React from 'react'
// import { observable, action } from 'mobx'
// import { observer, inject } from 'mobx-react'

// @inject(stores => {
//   const {todos: { todos, unfinishedTodoCount }} = stores
//   return {
//     myTodos: todos,
//     unTodos: unfinishedTodoCount,
//     addTodo: title => stores.todos.addTodo(title)
//   }
// })

// @observer
class Header extends React.Component {
  // @observable newTodoTitle = ''

  render () {
    return (
      <header className='app-global'>
        <div className='app-header'>
          <div className='center'>
            <div className='title'>
              <i className='app-logo' />
              <span>HALO TEAM</span>
            </div>
            <div className='now-time'>当前时间 2017/06/17 12:00</div>
            <div className='work-record'>
              <span>工作日报</span>
              <span>工作周报</span>
            </div>
          </div>
        </div>
      </header>
    )
  }

  // @action
  // handleInputChange = e => {
  //   this.newTodoTitle = e.target.value
  // }

  // @action
  // handleFormSubmit = e => {
  //   this.props.addTodo(this.newTodoTitle)
  //   this.newTodoTitle = ''
  //   e.preventDefault()
  // }
}

export default Header
