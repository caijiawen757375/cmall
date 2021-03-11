<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" @click="checkAll"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import CheckButton from "../../../components/content/checkButton/CheckButton";

  export default {
    name: "CartButtomBar",
    components: {CheckButton},
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      }
    },
    methods: {
      checkAll(){

      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: absolute;
    bottom: 49px;
    width: 100%;

    background-color: #eee;
    height: 40px;
    text-align: center;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .price{
    height: 40px;
    line-height: 40px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
</style>
