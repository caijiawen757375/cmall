<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="Goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad()"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import {getDetailData, Goods, GoodsParam, Shop} from "../../network/detail";
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";

  export default {
    name: "Detail",
    components: {DetailParamInfo, DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
    data() {
      return {
        iid: null,
        topImages: [],
        Goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
        }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //console.log(this.iid);
      //2.根据iid请求详情数据
      this.getDetailData(this.iid)
    },
    methods:{
      //请求详情页数据
      getDetailData(iid){
        getDetailData(iid).then(res => {
          const data = res.data.result
          //1.获取顶部图片轮播数据
          this.topImages = data.itemInfo.topImages
          //2.获取商品信息
          this.Goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //3.创建店铺信息对象
          this.shop = new Shop(data.shopInfo)
          //4.保存商品详情数据
          this.detailInfo = data.detailInfo
          console.log(res);
          //5.获取商品参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        })
      },
      imageLoad(){
          this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
