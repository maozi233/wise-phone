const Mode = {
  list: 'list',
  edit: 'edit',
  show: 'show',
  add: 'add',
  detail: 'detail'
}
const ColorMap = new Map().set(300, 'success-row').set(100, 'warn-row').set(200, 'danger-row')
const StatusMap = new Map().set(300, '审核通过').set(100, '审核中').set(200, '审核失败')

const OrderStatus = {
  allOrder: '-1000',
  waitPay: '0',
  paying: '100',
  orderFailed: '200',
  waitSend: '400',
  waitReceive: '500',
  waitComment: '600',
  complete: '700',
  canceled: '-1'
}
const AllOrderStatus =
  [{name: '全部', val: OrderStatus.allOrder}, {name: '待支付', val: OrderStatus.waitPay}, {
    name: '待发货',
    val: OrderStatus.waitSend
  }, {
    name: '待收货',
    val: OrderStatus.waitReceive
  }, {name: '已完成', val: OrderStatus.complete}, {name: '已取消', val: OrderStatus.canceled}]
const OrderMap = new Map().set(1, '集中采购').set(2, '配方订单').set(3, '公开课订单').set(4, '采购预测订单').set(5, '库存调剂')

const OrderTypes = {
  adjust: {
    key: 5,
    title: '库存调剂'
  },
  recipe: {
    key: 2,
    title: '配方'
  },
  groupBuyer: {
    key: 1,
    title: '集中采购'
  },
  lesson: {
    key: 3,
    title: '公开课'
  },
  preOrder: {
    key: 4,
    title: '采购预测单'
  }
}
const personType = {
  Buyer: 2, // 采购商
  Supplier: 3, // 供应商
  Formulators: 4 // 配方师
}
const OrderStatusMap = {
  [OrderTypes.adjust.key]: {
    '-1': {[personType.Buyer]: '已取消', [personType.Supplier]: '已取消'},
    '0': {[personType.Buyer]: '待支付', [personType.Supplier]: '待买家支付'},
    '100': {[personType.Buyer]: '待发货', [personType.Supplier]: '待发货'},
    '200': {[personType.Buyer]: '待供应商取消', [personType.Supplier]: '待确认取消'},
    '300': {[personType.Buyer]: '待收货', [personType.Supplier]: '待买家收货'},
    '400': {[personType.Buyer]: '已完成', [personType.Supplier]: '已完成'},
    '501': {[personType.Buyer]: '已评价', [personType.Supplier]: '已评价'}
  },
  [OrderTypes.recipe.key]: {
    '-1': {[personType.Buyer]: '已取消', [personType.Formulators]: '已取消'},
    '0': {[personType.Buyer]: '待支付', [personType.Formulators]: '待买家支付'},
    '100': {[personType.Buyer]: '待卖家确认', [personType.Formulators]: '待确认'},
    '200': {[personType.Buyer]: '待卖家取消', [personType.Formulators]: '待取消'},
    '300': {[personType.Buyer]: '待收货', [personType.Formulators]: '待买家收货'},
    '301': {[personType.Buyer]: '进行中', [personType.Formulators]: '进行中'},
    '302': {[personType.Buyer]: '进行中', [personType.Formulators]: '进行中'},
    '400': {[personType.Buyer]: '已完成', [personType.Formulators]: '已完成'},
    '501': {[personType.Buyer]: '已评价', [personType.Formulators]: '已评价'}
  },
  [OrderTypes.groupBuyer.key]: {
    '-1': {[personType.Buyer]: '已取消', [personType.Supplier]: '已取消'},
    '0': {[personType.Buyer]: '草稿', [personType.Supplier]: '草稿'},
    '100': {[personType.Buyer]: '待供应商确认', [personType.Supplier]: '待确认'},
    '200': {[personType.Buyer]: '待供应商发货', [personType.Supplier]: '待发货'},
    '300': {[personType.Buyer]: '已取消', [personType.Supplier]: '采购商取消'},
    '400': {[personType.Buyer]: '待收货', [personType.Supplier]: '待收货'},
    '500': {[personType.Buyer]: '已收货', [personType.Supplier]: '已收货'},
    '501': {[personType.Buyer]: '已评价', [personType.Supplier]: '已评价'},
    '600': {[personType.Buyer]: '申请售后退货', [personType.Supplier]: '申请售后退货'},
    '700': {[personType.Buyer]: '同意退货', [personType.Supplier]: '同意退货'},
    '701': {[personType.Buyer]: '拒绝退货', [personType.Supplier]: '拒绝退货'},
    '800': {[personType.Buyer]: '已完成', [personType.Supplier]: '已完成'}
  },
  [OrderTypes.preOrder.key]: {'100': '待确认', '200': '已拒绝', '300': '审核通过', '400': '已完成'}
}

// const OrderStatusMap = new Map()
//   .set(0, "待支付")
//   .set(100, "付款中")
//   .set(200, "下单失败")
//   .set(400, "待发货")
//   .set(500, "待收货")
//   .set(600, "待评价")
//   .set(700, "已完成")
//   .set(-1, "已取消");
const AuditStatus = [{name: '全部', val: '0'}, {name: '发起审核', val: '1'}, {
  name: '审核通过',
  val: '2'
}, {
  name: '审核拒绝',
  val: '3'
}]
const StockAdjustOrderStatus = [{name: '全部', val: '-1,0,100,200,300,400,501'}, {name: '待支付', val: '0'}, {
  name: '待发货',
  val: '100'
}, {name: '待供应商确认', val: '200'}, {name: '待收货', val: '300'}, {name: '已完成', val: '400'}, {
  name: '已取消',
  val: '-1'
}, {name: '已评价', val: '501'}]

const PreOrderStatus = [{name: '全部', val: '100,200,300,400'}, {name: '待确认', val: '100'}, {name: '审核通过', val: '300'}, {
  name: '已拒绝', val: '200'
}, {name: '已完成', val: '400'}]
// const PreOrderMap = new Map().set(100, '审核中').set(200, '审核失败').set(300, '审核通过').set(400, '已完成');

const FormulationOrderStatus = [{name: '全部', val: '-1,0,100,200,300,301,302,400,501'}, {name: '待支付', val: '0'}, {
  name: '待确认',
  val: '100'
}, {name: '进行中', val: '200,300,301,302'}, {
  name: '已完成',
  val: '400'
}, {name: '已取消', val: '-1'}, {name: '已评价', val: '501'}]

let NotifyType = {
  'success': 'success',
  'info': 'info',
  'warning': 'warning',
  'error': 'error'
}
const DealBuyerColorMap = new Map().set(2, 'warn-row').set(4, 'danger-row').set(3, 'success-row').set(5, 'finish-row')
const PreOrderColorMap = new Map().set(100, 'warn-row').set(200, 'danger-row').set(300, 'success-row').set(400, 'finish-row')
let ResType = {
  'all': '',
  'img': '1',
  'media': '2',
  'file': '3'
}

const DecorateAddCompType = {
  pdtGroup: 'pdtGroup'
}
const DecorateType = {
  index: {
    type: 1,
    module: 'mall'
  },
  list: {
    type: 2,
    module: 'list'
  },
  detail: {
    type: 3,
    module: 'detail'
  },
  banner: {
    type: 4,
    module: 'banner'
  },
  subject: {
    type: 5,
    module: 'subject'
  },
  user: {
    type: 6,
    module: 'user'
  },
  footer: {
    type: 7,
    module: 'footer'
  },
  floatNav: {
    type: 8,
    module: 'floatNav'
  },
  copyright: {
    type: 9,
    module: 'copyright'
  }
}

const DefaultImgs = {
  banner: 'decorate/banner_show.png',
  banner1: 'decorate/banner_show1.png',
  banner2: 'decorate/banner_show2.png',
  navIcon: 'decorate/navMagic_ico.png',
  pageListIcon: 'decorate/pageList_ico.png',
  pdtImg: 'decorate/pdt_img.png',
  userCenterBg: 'decorate/usercenter_bg.png',
  footerLogo: 'logo@2x.png',
  floatNavLogo: 'decorate/ws_menu.png'
}

const interLinkPre = 'internal:'
const InternalLink = {
  productCategory: `${interLinkPre}productCategory`,
  mallCart: `${interLinkPre}mallCart`,
  userCenter: `${interLinkPre}userCenter`
}

const SysProp = {
  menus: 'menus'
}

const UserCert = {
  mainType: {
    1: '采购商',
    2: '供应商',
    3: '配方师'
  },
  identityType: {
    1: {
      300: '库存采购',
      400: '配方采购',
      500: '集中采购'
    },
    2: {
      600: '商品展示',
      700: '集采供应',
      800: '库存供应'
    },
    3: {
      100: '个人',
      200: '公司'
    }
  },
  userType: {
    Buyer: 1, // 采购商
    Supplier: 2, // 供应商
    Formulators: 3 // 配方师
  },
  menus: {
    1: [
      {
        id: 'adjust',
        type: 300
      },
      {
        id: 'recipe',
        type: 400
      },
      {
        id: 'group-buyer',
        type: 500
      }],
    2: [
      {
        id: 'group-buyer',
        type: 700
      },
      {
        id: 'adjust',
        type: 800
      }],
    3: []
  }
}
const TinyMCEConfig = {
  toolbar: 'insertfile undo redo | styleselect | bold italic | link image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media code',
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table contextmenu paste'
  ]
}
const Specs = {
  pack: {
    drum: {
      key: 'drum',
      title: '桶'
    },
    bag: {
      key: 'bag',
      title: '包'
    },
    bottle: {
      key: 'bottle',
      title: '瓶'
    },
    pail: {
      key: 'pail',
      title: '塑料桶'
    },
    box: {
      key: 'box',
      title: '箱'
    },
    tank: {
      key: 'tank',
      title: '槽车'
    },
    ibc: {
      key: 'ibc',
      title: '吨桶'
    },
    pic: {
      key: 'pic',
      title: '件'
    },
    pallet: {
      key: 'pallet',
      title: '托盘'
    },
    container: {
      key: 'container',
      title: '集装箱'
    }
  },
  unit: {
    kg: {
      key: 'kg',
      title: '千克'
    },
    g: {
      key: 'g',
      title: '克'
    },
    l: {
      key: 'l',
      title: '升'
    },
    ml: {
      key: 'ml',
      title: '毫升'
    },
    mt: {
      key: 'mt',
      title: '吨'
    },
    gal: {
      key: 'gal',
      title: '加仑'
    },
    lb: {
      key: 'lb',
      title: '磅'
    }
  }
}
export {
  DecorateType,
  NotifyType,
  Mode,
  ResType,
  OrderTypes,
  OrderStatusMap,
  OrderStatus,
  DecorateAddCompType,
  DefaultImgs,
  SysProp,
  UserCert,
  InternalLink,
  TinyMCEConfig,
  ColorMap,
  StatusMap,
  OrderMap,
  AuditStatus,
  AllOrderStatus,
  PreOrderStatus,
  PreOrderColorMap,
  DealBuyerColorMap,
  StockAdjustOrderStatus,
  FormulationOrderStatus,
  Specs
}
