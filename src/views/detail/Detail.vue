<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="scrollContent" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="Goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad()"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="topClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import {getDetailData, getRecommend, Goods, GoodsParam, Shop} from "../../network/detail";
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "../../components/content/backTop/BackTop";
  import {mapActions} from "vuex"

  export default {
    name: "Detail",
    components: {
      BackTop,
      DetailBottomBar,
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo, DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
    data() {
      return {
        iid: null,
        topImages: [],
        Goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false
        }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //console.log(this.iid);
      //2.根据iid请求详情数据
      this.getDetailData(this.iid)
      //3.请求推荐数据
      this.getRecommend()
    },
    mounted() {
      //监听详情页图片加载完成
      this.$bus.$on('detailItemImageLoad',() => {
        this.$refs.scroll && this.$refs.scroll.refresh()
        //refresh()
      })

    },
    methods:{
      ...mapActions(['addCart']),
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
          //console.log(res);
          //5.获取商品参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          //6.获取评论信息
          if (data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
          //在DOM渲染完成之后执行，但DOM渲染完成不代表图片全部加载完成
          this.$nextTick(() => {

          })
        })
      },
      imageLoad(){
        this.$refs.scroll.refresh()
        //取出各个主题的高度
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      },
      getRecommend(){
        getRecommend().then(res => {
          //console.log(res);
          this.recommends = res.data.data.list
          //console.log(this.recommends);
        })
      },
      titleClick(index){
        //console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      scrollContent(position){
        //1.获取y值
        const positionY = -position.y
        //console.log(positionY);
        //2.positionY和主题中的y值进行对比
        let length = this.themeTopYs.length
        for (let i = 0 ; i < length ; i++){
          if (this.currentIndex !== i
            && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            || (i === length -1 && positionY >= this.themeTopYs[i]))){
            this.currentIndex = i
            //console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //3.下拉超过1000px，出现返回顶部图标
        this.isShowBackTop = (-position.y) > 1000
      },
      topClick(){   //点击返回顶部
        this.$refs.scroll.scrollTo(0,0)
      },
      //添加到购物车
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.Goods.title
        product.desc = this.Goods.desc
        product.price = this.Goods.nowPrice
        //2.将商品添加到购物车中
        //console.log(this.$store);
        //this.$store.commit('addCart',product)
        //this.$store.dispatch('addCart',product)
        this.addCart(product).then(res => {
          console.log(res);
        })
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
    height: calc(100% - 44px - 58px);
  }
</style>
