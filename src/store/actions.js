import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {   //异步调用或复杂逻辑
  addCart(context,payload){
    return new Promise((resolve, reject) => {
      //1.获取购物车之前是否有此商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2.判断是新添加还是加数量
      if (oldProduct){
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加一件新的商品')
      }
    })

  }
}
