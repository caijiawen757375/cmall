import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {  //全局的方法
  [ADD_COUNTER](state,payload){
    payload.count ++
  },
  [ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  }
}
