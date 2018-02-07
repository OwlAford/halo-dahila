import HomeModel from '&/HomeModel'
import ListModel from '&/ListModel'
import ChatModel from '&/ChatModel'

const stores = {
  home: HomeModel.fromJS(false),
  article: new ListModel('article'),
  shoot: new ListModel('photo'),
  design: new ListModel('design'),
  chat: new ChatModel()
}

export default stores
