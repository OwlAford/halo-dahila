import HomeModel from '&/HomeModel'
import ArticleModel from '&/ArticleModel'
import ShootModel from '&/ShootModel'
// import LoginModel from '&/LoginModel'
// import TodoListStore from './TodoListStore'

const stores = {
  home: HomeModel.fromJS(true),
  article: new ArticleModel(),
  shoot: new ShootModel()
  // login: new LoginModel(),
  // todos: TodoListStore
}

export default stores
