import { Toast } from 'mint-ui'

export class PageModel {
  curPage = 0
  pageSize = 0
  total = 0

  constructor (pageSize = 10) {
    this.pageSize = pageSize
  }

  loadMore () {
    this.curPage += this.pageSize
    this.curPage = Math.min(this.curPage, this.total)
    if (this.curPage === this.total) {
      Toast('没有更多了')
    }
    return this.curPage !== this.total
  }

  setTotal (total) {
    this.total = total
  }

  reset () {
    this.curPage = 0
    this.total = 0
  }
}
