<template>
  <div id="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list class="cart-list"/>
    <!--底部汇总-->
    <cart-buttom-bar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {mapGetters} from "vuex"
  import CartList from "./childComps/CartList";
  import CartButtomBar from "./childComps/CartButtomBar";
  export default {
    name: "Cart",
    components: {CartButtomBar, CartList, NavBar},
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 89px;
    width: 100%;
  }
</style>
