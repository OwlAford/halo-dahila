import React from 'react'
import './scss/index.scss'

export default class Note extends React.Component {
  componentDidMount () {
  }

  render () {
    return (
      <div className='home-note'>
        <div className='note-list'>
          {
            Array(6).fill(0).map((item, i) => (
              <div className='note-item' key={i}>
                <div className='title'>
                  <span>我是你们期望已久的标题君</span>
                  <i className='iconfont more'>&#xe601;</i>
                </div>
                <div className='content'>
                  <div className='thumb'>
                    <img src='http://picur.qiniudn.com/o_1avq9sraqvrq1b0v1d3c178idejh.jpg?imageView2/1/w/200/h/200/interlace/0/q/100' alt='' />
                  </div>
                  <div className='preview'>
                    本文主要是阅读Effective Javascript书籍的读书笔记。编写高质量JS代码目录让自己习惯JavaScript变量作用域使用函数对象和原型数组和字典库和API设计并发内容详解让自己习惯JavaScript了解你使用的js版本决定你的应用程序支持JS的哪些版本
                  </div>
                  <span className='timestamp'>
                    <i className='iconfont'>&#xe619;</i>
                    发布于442天前
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
