import HomeModel from '&/HomeModel'
import ListModel from '&/ListModel'
// import LoginModel from '&/LoginModel'
// import TodoListStore from './TodoListStore'

const stores = {
  home: HomeModel.fromJS(false),
  article: new ListModel('article'),
  shoot: new ListModel('photo'),
  design: new ListModel('design')
  // login: new LoginModel(),
  // todos: TodoListStore
}

export default stores
