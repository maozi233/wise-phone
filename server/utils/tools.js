import _ from "lodash";
import {Message, MessageBox, Notification} from 'element-ui';
import {NotifyType} from "../model/model-types";

class Msg {
  static loading() {
    document.querySelector(".loading-page").style.display = "block";
  }

  static hideLoading() {
    document.querySelector(".loading-page").style.display = "none";
  }

  static alert(title, msg, func = () => {
  }) {
    let params = {
      confirmButtonText: '确定',
      callback: action => {
        func();
      }
    };

    MessageBox.alert(msg, title, params);

  }

  static confirm(title, msg, type = NotifyType.info, sure = () => {
  }, cancel = () => {
  }) {
    MessageBox.confirm(msg, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type
    }).then(() => {
      sure();
    }).catch(() => {
      cancel();
    });
  }

  static notify(title, message, type = NotifyType.info) {
    Notification({
      title,
      message,
      type
    });
  }

  static toast(message, type = NotifyType.info) {
    Message({
      message,
      type,
      center: true
    });
  }
}
class Tools {
  static getPageStart(page = 1, pageSize = ENV.PAGE_SIZE) {
    return page ? (page - 1) * pageSize : 0;
  }

  static getPageCount(totalCount, pageSize = ENV.PAGE_SIZE) {
    let pageCount = 0;
    if (totalCount === 0) {
      pageCount = 0;
    } else {
      if (totalCount < pageSize) {
        pageCount = 1;
      } else {
        pageCount = Math.floor(totalCount / pageSize);
        //console.log(pageCount);
        if (totalCount % pageSize !== 0) {
          pageCount++;
        }
      }
    }
    return pageCount;
  }

  static logout() {
    $ls.remove(ENV.USER_KEY);
  }

  static getUser() {
    return $ls.get(ENV.USER_KEY);
  }

  static setUser(user) {
    return $ls.set(ENV.USER_KEY, user);
  }

  static setLoc(key, val) {
    return $ls.set(key, val);
  }

  static getLoc(key) {
    return $ls.get(key);
  }

  static rangeArr(start, end) {
    return Array(end - start + 1).fill(0).map((v, i) => i + start);
  }


  static strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  static objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  static isIE(ver) {
    let b = document.createElement('b');
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1;
  }

  static reSizeContentWrapper() {
    let diff = 50;
    // $(".content-wrapper").height($(window).height() - diff);
    let height = $(window).height() - diff;
    $('.content-wrapper').height(height).css("min-height", height);

  }


  static reSizeList(el = ".el-main", diff = 50, noForm = false) {
    if (Tools.isIE(9)) {
      if (!noForm) {
        $(el).css("height", $(window).height() - $(".el-form").height() - $(".el-footer").height() - diff);
      } else {
        $(el).css("height", $(window).height() - diff);
      }

    }
  }

  static reSizePanel(mainPanel, diff = 0, ...el) {
    let sum = 0;
    _.each(el, item => {
      sum += $(item).height();
    });
    $(mainPanel).css("height", $(window).height() - sum - diff - 50);
  }
}


function inject(...list) {
  return function (target) {
    _.each(list, (obj) => {
      target.prototype[obj.key] = new obj.val();
    })
    // Object.assign(target.prototype, ...list)
  }
}


export {
  Tools,
  Msg
}
