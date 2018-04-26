import _ from 'lodash'
import {MessageBox, Toast} from 'mint-ui'
import $ from 'jquery'
const ENV = process.env
const acceptFileTypes = /^image\/(gif|jpe?g|png)$/i
const fileMaxSize = 5000000

export class Tools {
  static getImgPath (item, propName = 'imgs') {
    item[propName] = JSON.parse(item[propName])
    if (_.isObject(item[propName][0])) {
      item.imgPath = item[propName][0].path
    } else {
      item.imgPath = item[propName][0]
    }

    return item
  }

  static setUser (user) {
    localStorage.setItem(ENV.USER_KEY, JSON.stringify(user))
  }

  static getUser () {
    return JSON.parse(localStorage.getItem(ENV.USER_KEY))
  }

  static getRoleType () {
    // Buyer: 2, // 采购商
    //  Supplier: 3, // 供应商
    // Formulators: 4 // 配方师
    if (this.getUser()) {
      return this.getUser().sysRole.roleType
    } else {
      return ''
    }
    // return this.getUser().sysRole ? this.getUser().sysRole.roleType : ''
  }

  static toTop (transition = 0) {
    $('html,body').animate({scrollTop: 0}, transition)
  }

  static checkUploadImg (data, reg = acceptFileTypes) {
    if (data.originalFiles[0]['type'].length && !reg.test(data.originalFiles[0]['type'])) {
      if (reg === acceptFileTypes) {
        Toast('图片格式仅支持JPG,PNG')
      } else {
        Toast('仅支持word、txt、pdf、excel文件类型')
      }
      return false
    }
    if (data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > fileMaxSize) {
      return false
    }

    return true
  }
}

export class Msg {
  static loading () {
    document.querySelector('.loading-page').style.display = 'block'
  }

  static hideLoading () {
    document.querySelector('.loading-page').style.display = 'none'
  }

  static showMask (callback) {
    let mask = document.querySelector('.overlay')
    mask.style.display = 'block'
    callback && callback(mask)
  }

  static hideMask (callback) {
    let mask = document.querySelector('.overlay')
    mask.style.display = 'none'
    callback && callback(mask)
  }

  static alert (title, msg, fn) {
    MessageBox(title, msg).then(action => {
      fn && fn()
    })
  }
}
