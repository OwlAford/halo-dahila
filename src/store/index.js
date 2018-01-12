import HomeModel from '&/HomeModel'
import ArticleModel from '&/ArticleModel'
import ShootModel from '&/ShootModel'
import DesignModel from '&/DesignModel'
// import LoginModel from '&/LoginModel'
// import TodoListStore from './TodoListStore'

const stores = {
  home: HomeModel.fromJS(false),
  article: new ArticleModel(),
  shoot: new ShootModel(),
  design: new DesignModel()
  // login: new LoginModel(),
  // todos: TodoListStore
}

export default stores
