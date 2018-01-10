import { observable, action } from 'mobx'
import { getData2Array } from '~/constants/connect'

export default class ArticleModel {
  @observable articleList = []

  @action
  getArticleList (cb) {
    getData2Array('article', list => {
      this.articleList = list.reverse()
      cb && cb()
    })
  }
}
