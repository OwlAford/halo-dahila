import HomeModel from '&/HomeModel'
import ListModel from '&/ListModel'
import WallModel from '&/WallModel'
import ChatModel from '&/ChatModel'

const stores = {
  home: HomeModel.fromJS(false),
  article: new ListModel('article'),
  shoot: new ListModel('photo'),
  design: new ListModel('design'),
  wall: new WallModel(),
  chat: new ChatModel()
}

export default stores
