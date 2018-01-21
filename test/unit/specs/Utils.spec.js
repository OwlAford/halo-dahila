import * as Utils from '~/filters'

describe('filters.js', () => {
  it('should be correct string', () => {
    expect(Utils.limitString(6, '这是一段我们预先设置好的测试文本进行模块测试'))
      .to.equal('这是一段我们...')
  })
})
