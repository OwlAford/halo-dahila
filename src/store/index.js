import HomeModel from '&/HomeModel'
import ListModel from '&/ListModel'

const stores = {
  home: HomeModel.fromJS(true),
  article: new ListModel('article'),
  shoot: new ListModel('photo'),
  design: new ListModel('design')
}

export default stores
