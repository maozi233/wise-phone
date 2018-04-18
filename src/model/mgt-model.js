export const roleType = {
  Buyer: 2, // 采购商   ( 库存订单 配方订单) 13800000001
  Supplier: 3, // 供应商  ( 库存订单 )  13800000000
  Formulators: 4 // 配方师  ( 配方订单) 13800000003
}

export const StockAdjustOrderStatus = [
  {title: '待支付', val: '0'},
  {title: '待发货', val: '100'},
  {title: '待确认', val: '200'},
  {title: '待收货', val: '300'},
  {title: '全部', val: '-1,0,100,200,300,400,501'},
  {title: '已取消', val: '-1'},
  {title: '已完成', val: '400'},
  {title: '已评价', val: '501'
  }]

export const AdjustDetailStatus = {
  '-1': {[roleType.Buyer]: '已取消', [roleType.Supplier]: '已取消'},
  '0': {[roleType.Buyer]: '待支付', [roleType.Supplier]: '待买家支付'},
  '100': {[roleType.Buyer]: '待发货', [roleType.Supplier]: '待发货'},
  '200': {[roleType.Buyer]: '待供应商取消', [roleType.Supplier]: '待确认取消'},
  '300': {[roleType.Buyer]: '待收货', [roleType.Supplier]: '待买家收货'},
  '400': {[roleType.Buyer]: '已完成', [roleType.Supplier]: '已完成'},
  '501': {[roleType.Buyer]: '已评价', [roleType.Supplier]: '已评价'}
}

// viewpager 按照下标取
export const FormulationOrderStatus = [
  {title: '待支付', val: '0'},
  {title: '待确认', val: '100'},
  {title: '进行中', val: '200,300,301,302'},
  {title: '已完成', val: '400'},
  {title: '全部', val: '-1,0,100,200,300,301,302,400,501'},
  {title: '已取消', val: '-1'},
  {title: '待收货', val: '300'},
  {title: '进行中', val: '301'},
  {title: '进行中', val: '302'},
  {title: '待卖家取消', val: '200'},
  {title: '已评价', val: '501'}
]

export const FormulationDetailStatus = {
  '-1': {[roleType.Buyer]: '已取消', [roleType.Formulators]: '已取消'},
  '0': {[roleType.Buyer]: '待支付', [roleType.Formulators]: '待买家支付'},
  '100': {[roleType.Buyer]: '待卖家确认', [roleType.Formulators]: '待确认'},
  '200': {[roleType.Buyer]: '待卖家取消', [roleType.Formulators]: '待取消'},
  '300': {[roleType.Buyer]: '待收货', [roleType.Formulators]: '待买家收货'},
  '301': {[roleType.Buyer]: '进行中', [roleType.Formulators]: '进行中'},
  '302': {[roleType.Buyer]: '进行中', [roleType.Formulators]: '进行中'},
  '400': {[roleType.Buyer]: '已完成', [roleType.Formulators]: '已完成'},
  '501': {[roleType.Buyer]: '已评价', [roleType.Formulators]: '已评价'}
}
